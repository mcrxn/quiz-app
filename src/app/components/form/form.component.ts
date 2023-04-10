import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { QuestionsService } from 'src/app/services/questions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  userForm: FormGroup;

  isFormValid = new BehaviorSubject<boolean | null>(null);

  constructor(
    private userService: UserService,
    private questionsService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onFormSubmit() {
    this.userService.setUser(this.userForm.value);
    if (this.userForm.valid) {
      this.isFormValid.next(true);
      this.questionsService.onQuizStart(30);
    } else {
      this.isFormValid.next(false);
    }
  }
}
