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
      const quiz = QUIZ_LIST.find(quiz => quiz.id === id);
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
    
    

    
}