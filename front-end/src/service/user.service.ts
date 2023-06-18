import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Quiz } from '../models/quizz.model';
import { Question } from '../models/question.model';
import { ConfigurationModel} from 'src/models/configuration.model';
import { serverUrl, httpOptionsBase, serverBack } from '../config/server.config'
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import { StatQuizz } from 'src/models/quizz.stat.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private users: User[] = [];

  constructor(private httpClient: HttpClient) {
    this.updateAll();
  }


  async loadUsersFromServer(): Promise<User[]> {
    const users = await this.httpClient.get<User[]>(`${serverBack}users`).toPromise();
    if (!users) {
      throw new Error(`No Users found`);
    }
    return users;
  }

  // Ajouter un nouvel utilisateur
  async createUser(newUser: Partial<User>): Promise<User> {
    const user = await this.httpClient.post<User>(`${serverBack}users`, newUser).toPromise();
    if (!user) {
      throw new Error(`Failed to create user`);
    }
    await this.updateAll();
    return user;
  }

  // Supprimer un utilisateur
  async deleteUser(userId: string, configId: string ): Promise<void> {
    await this.httpClient.delete<void>(`${serverBack}users/${userId}`).toPromise().then(() => {
      this.httpClient.delete<void>(`${serverBack}configurations/${configId}`).toPromise();
      this.updateAll();
    });
  }

  async updateStatQuizzForUser(userId : string, statQuizz : Partial<StatQuizz>, quizId: string): Promise<void> {
    await this.httpClient.put<void>(`${serverBack}users/${userId}/statQuizz/${quizId}`, statQuizz).toPromise().then(() => {
      this.updateAll();
    });
  }

  // Modifier un utilisateur
  async updateUser(user: Partial<User>, userId : string): Promise<User> {
    const updatedUser = await this.httpClient.put<User>(`${serverBack}users/${userId}`, user).toPromise()
      .then((user) => {
        this.updateAll();
        return user;
      });
    if (!updatedUser) {
      throw new Error(`Failed to update user with id ${user.id}`);
    }
    return updatedUser;
  }

  setUserCourant(user: any): void {
    this.currentUserSubject.next(user);
  }

  getUserCourant(): User | null {
    return this.currentUserSubject.value;
  }

  async getUserConfiguration(userId: string): Promise<ConfigurationModel> {
    const userConfig = await this.httpClient.get<ConfigurationModel>(`${serverBack}/users/${userId}/configuration`).toPromise();
    if (!userConfig) {
      throw new Error(`Failed to get user configuration for user with id ${userId}`);
    }
    return userConfig;
  }

  async updateConfiguration(configId: string, config: Partial<ConfigurationModel>): Promise<ConfigurationModel> {
    const updatedConfig = await this.httpClient.put<ConfigurationModel>(`${serverBack}/configurations/${configId}`, config).toPromise();
    if (!updatedConfig) {
      throw new Error(`Failed to update configuration with id ${configId}`);
    }
    await this.updateAll();
    return updatedConfig;
  }

  public updateAll(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.setUserCourant(null);
      this.loadUsersFromServer().then(users => {
        this.users = users;
        users.forEach(user => {
          if (user.selected) {
            this.setUserCourant(user);
          }
        });
        resolve();
      })
    });
  }

}
