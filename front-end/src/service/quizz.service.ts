import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quizz.model';
import { Question } from '../models/question.model';
import { serverUrl, httpOptionsBase, serverBack } from '../config/server.config'
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
    private quizzes: Quiz[] = [];
    private quizCourant!: Quiz;
    private score: number = 0;

    constructor(private httpClient: HttpClient) {
      this.loadQuizzesFromServer();
    }

    private loadQuizzesFromServer() {
      this.httpClient.get<Quiz[]>(`${serverBack}/quizzes`).subscribe(
        (quizzes) => {
          this.quizzes.push(...quizzes);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
      console.log(this.quizzes);
    }

    getData() {
      return this.quizzes;
    }
    async loadQuestionsFromQuiz(id: string): Promise<Question[]> {
      const questions = await this.httpClient.get<Question[]>(`${serverBack}/quizzes/${id}/questions`).toPromise();
      if (!questions) {
        throw new Error(`No questions found for quiz with id ${id}`);
      }
      return questions;
    }



    setQuizCourant(quiz : Quiz){
      this.quizCourant = quiz;
    }

    getQuizCourant(): Quiz{
      return this.quizCourant;
    }

    getQuizById(id: string): Quiz {
      const quiz = this.quizzes.find(quiz => quiz.id === id);
      if (!quiz) {
        throw new Error(`Quiz with id ${id} not found`);
      }
      return quiz;
    }

    getScore(): number{
      return this.score;
    }

    addScore(){
      this.score++;
    }

    resetScore(){
      this.score = 0;
    }

    public getTimeResponses(): number[] | undefined {
      return this.quizCourant?.statQuiz?.timeResponses;
    }

  async createQuiz(newQuiz: Partial<Quiz>): Promise<Quiz> {
    const quiz = await this.httpClient.post<Quiz>(`${serverBack}users`, newQuiz).toPromise();
    if (!quiz) {
      throw new Error(`Failed to create user`);
    }
    return quiz;
  }
}
