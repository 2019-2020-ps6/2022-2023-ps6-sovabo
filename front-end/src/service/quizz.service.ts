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

    public loadQuizzesFromServer(): Promise<Quiz[]> {
      return new Promise((resolve, reject) => {
        this.httpClient.get<Quiz[]>(`${serverBack}/quizzes`).subscribe(
          (quizzes) => {
            this.quizzes.push(...quizzes);
            resolve(this.quizzes); // When data is received, the Promise is resolved
          },
          (error) => {
            console.log('Erreur ! : ' + error);
            reject(error); // If there's an error, the Promise is rejected
          }
        );
      });
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

    getQuizNameById(id: string): string {
      const quiz = this.quizzes.find(quiz => quiz.id === id);
      return quiz ? quiz.name : '';
    }



    setQuizCourant(quiz : Quiz){
      this.quizCourant = quiz;
      console.log("dans setQuizCourant");
      console.log(this.quizCourant);
    }

    getQuizCourant(): Quiz{
      console.log("dans getQuizCourant");
      console.log(this.quizCourant);
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
    const quiz = await this.httpClient.post<Quiz>(`${serverBack}quizzes`, newQuiz).toPromise();
    if (!quiz) {
      throw new Error(`Failed to create user`);
    }
    return quiz;
  }

  async updateQuiz(quiz: Quiz): Promise<Quiz> {
    console.log("dans updateQuiz");
    console.log(quiz);
    const updatedQuiz = await this.httpClient.put<Quiz>(`${serverBack}quizzes/${quiz.id}`, quiz).toPromise();
    if (!updatedQuiz) {
      throw new Error(`Failed to update user with id ${quiz.id}`);
    }
    return updatedQuiz;
  }
}
