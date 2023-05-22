import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quizz.model';
import { Question } from '../models/question.model';
import { serverUrl, httpOptionsBase, serverBack } from '../config/server.config'
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private users: User[] = [];
  constructor(private httpClient: HttpClient) {
    this.loadUsersFromServer();
  }

  async loadUsersFromServer(): Promise<User[]> {
    const users = await this.httpClient.get<User[]>(`${serverBack}/users`).toPromise();
    if (!users) {
      throw new Error(`No Users found`);
    }
    return users;
  }

  getUsers() {
    return this.users;
  }
}
