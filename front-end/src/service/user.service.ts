import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quizz.model';
import { Question } from '../models/question.model';
import { ConfigurationModel} from 'src/models/configuration.model';
import { serverUrl, httpOptionsBase, serverBack } from '../config/server.config'
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSubject.asObservable();
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

  // Ajouter un nouvel utilisateur
  async createUser(newUser: Partial<User>): Promise<User> {
    const user = await this.httpClient.post<User>(`${serverBack}users`, newUser).toPromise();
    if (!user) {
      throw new Error(`Failed to create user`);
    }
    return user;
  }

  // Supprimer un utilisateur
  async deleteUser(userId: string): Promise<void> {
    await this.httpClient.delete<void>(`${serverBack}users/${userId}`).toPromise();
  }

  // Modifier un utilisateur
  async updateUser(user: Partial<User>, userId : string): Promise<User> {
    console.log("ça update")
    const updatedUser = await this.httpClient.put<User>(`${serverBack}users/${userId}`, user).toPromise();
    if (!updatedUser) {
      throw new Error(`Failed to update user with id ${user.id}`);
    }
    return updatedUser;
  }
  

  setUserCourant(user: any): void {
    this.currentUserSubject.next(user);
  }

  getUserCourant(): User | null {
    return this.currentUserSubject.getValue();
  }

  async getUserConfiguration(userId: string): Promise<ConfigurationModel> {
    const userConfig = await this.httpClient.get<ConfigurationModel>(`${serverBack}/users/${userId}/configuration`).toPromise();
    if (!userConfig) {
      throw new Error(`Failed to get user configuration for user with id ${userId}`);
    }
    return userConfig;
  }

  async updateConfiguration(configId: string, config: Partial<ConfigurationModel>): Promise<ConfigurationModel> {
    console.log("ça update")
    console.log("configId", configId)
    const updatedConfig = await this.httpClient.put<ConfigurationModel>(`${serverBack}/configurations/${configId}`, config).toPromise();
    if (!updatedConfig) {
      throw new Error(`Failed to update configuration with id ${configId}`);
    }
    return updatedConfig;
}






}
