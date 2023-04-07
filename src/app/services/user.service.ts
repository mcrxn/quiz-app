import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor() {}

  setUser(user: User) {
    this.currentUser$.next(user);
  }
}
