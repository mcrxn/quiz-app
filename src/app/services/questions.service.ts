import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, interval, map, takeWhile } from 'rxjs';
import { Question } from '../interfaces/question';
import { Router } from '@angular/router';
import { Options } from '../interfaces/options';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  option$ = new BehaviorSubject<Options | null>(null);

  selectedQuestion$ = new BehaviorSubject<number>(0);

  questionTimer$ = new BehaviorSubject<number>(30);

  points$ = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  questions$ = this.http.get<Question[]>('assets/questions.json');

  currentQuestion$ = combineLatest([
    this.questions$,
    this.selectedQuestion$,
  ]).pipe(
    map(([questions, selectedQuestion]) => questions.at(selectedQuestion))
  );

  setOption(option: Options) {
    this.option$.next(option);
  }

  onQuizStart(initialValue: number) {
    this.questionTimer$.next(initialValue);
    this.router.navigate(['quiz']);
    interval(1000)
      .pipe(takeWhile(() => this.questionTimer$.getValue() > 0))
      .subscribe(() => {
        const currentTimerValue = this.questionTimer$.getValue();

        this.questionTimer$.next(currentTimerValue - 1);
        if (this.questionTimer$.value === 0) {
          this.changeQuestion();
        }
      });
  }

  onQuizRestart() {
    this.points$.next(0);
    this.selectedQuestion$.next(0);
    this.userService.currentUser$.next(null);
    this.router.navigate(['']);
  }

  changeQuestion() {
    this.selectedQuestion$.next(this.selectedQuestion$.value + 1);
    this.questionTimer$.next(30);
    if (this.selectedQuestion$.value === 10) {
      this.router.navigate(['result']);
    }
    this.option$.next(null);
  }

  onAnswer(option: Options | null) {
    if (option?.correct) {
      this.points$.next(this.points$.value + 3);
    } else if (option === null) {
      this.points$.next(this.points$.value);
    } else {
      this.points$.next(this.points$.value - 1);
    }
  }
}
