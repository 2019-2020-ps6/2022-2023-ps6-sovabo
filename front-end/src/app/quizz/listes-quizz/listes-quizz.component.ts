import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import {AnimationsService} from "../../../service/animations.service";

@Component({
  selector: 'app-listes-quizz',
  templateUrl: './listes-quizz.component.html',
  styleUrls: ['./listes-quizz.component.scss']
})
export class ListesQuizzComponent {

  public quizList: Quiz[] = [];

  constructor(private quizService: QuizService, public animationsService: AnimationsService) { }

  ngOnInit(): void {
    this.quizList = this.quizService.getData();
    console.log(this.animationsService.isAnimated);
  }

  isAnotherHovered(quiz: Quiz): boolean {
    for (let q of this.quizList) {
      if (q !== quiz && q.hovered) {
        return true;
      }
    }
    return false;
  }

}
