import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';

@Component({
  selector: 'app-listes-quizz',
  templateUrl: './listes-quizz.component.html',
  styleUrls: ['./listes-quizz.component.scss']
})
export class ListesQuizzComponent {
  
  public quizList: Quiz[] = [];


  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizList = this.quizService.getData();
  }

}
