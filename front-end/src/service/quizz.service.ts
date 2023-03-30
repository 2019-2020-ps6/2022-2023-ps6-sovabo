import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quizz.model';
import { QUIZ_LIST } from '../mocks/quizz-listes.mock';
import { Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../config/server.config'

@Injectable({
  providedIn: 'root'
})
export class QuizService {
    private quizzes: Quiz[] = QUIZ_LIST;
    private quizCourant!: Quiz;
    private score: number = 0;


    getData() {
      return this.quizzes;
    }
    setQuizCourant(quiz : Quiz){
      this.quizCourant = quiz;
    }

    getQuizCourant(): Quiz{
      return this.quizCourant;
    }

    getQuizById(id: string): Quiz {
      const quiz = QUIZ_LIST.find(quiz => quiz.id === id); //Le quiz dans find n'est pas le même que celui de const quiz
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
    



}
