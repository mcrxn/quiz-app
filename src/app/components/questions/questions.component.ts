import { Component } from '@angular/core';

import { Options } from 'src/app/interfaces/options';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  questionTimer$ = this.questionsService.questionTimer$;

  questions$ = this.questionsService.questions$;

  option$ = this.questionsService.option$;

  question$ = this.questionsService.currentQuestion$;

  constructor(private questionsService: QuestionsService) {}

  onAnswer(option: Options | null) {
    this.questionsService.onAnswer(option);
    this.questionsService.changeQuestion();
  }

  onSelect(option: Options) {
    this.questionsService.setOption(option);
  }
}
