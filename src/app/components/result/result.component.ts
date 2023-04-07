import { Component } from '@angular/core';

import { QuestionsService } from 'src/app/services/questions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  points$ = this.questionsService.points$;
  user$ = this.userService.currentUser$;

  constructor(
    private questionsService: QuestionsService,
    private userService: UserService
  ) {}

  onStartAgain() {
    this.questionsService.onQuizRestart();
  }
}
