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


    getData() {
      return this.quizzes;
    }

    getQuizById(id: string): Quiz {
      const quiz = QUIZ_LIST.find(quiz => quiz.id === id);
      if (!quiz) {
        throw new Error(`Quiz with id ${id} not found`);
      }
      return quiz;
    }
    
    
    

    
}