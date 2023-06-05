import * as $ from 'jquery';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../../service/quizz.service';
import { Quiz } from '../../../../models/quizz.model';
import {AnimationsService} from "../../../../service/animations.service";
import { faStar } from '@fortawesome/free-solid-svg-icons';

declare function carousel(): any;

@Component({
  selector: 'app-carousel-quiz',
  templateUrl: './carousel-quiz.component.html',
  styleUrls: ['./carousel-quiz.component.scss']
})


export class CarouselQuizComponent {

  public quizList: Quiz[] = [];
  quizStar = faStar;


  constructor(private quizService: QuizService, public animationsService: AnimationsService) { }



  ngOnInit(): void {
    this.quizList = this.quizService.getData();

    carousel();
  }



  isAnotherHovered(quiz: Quiz): boolean {
    for (let q of this.quizList) {
      if (q !== quiz && q.hovered) {
        return true;
      }
    }
    return false;
  }

  getDifficultyColor(difficulty: number): string {
    if (difficulty <= 0) {
      return 'rgba(46,49,54,0.6)'; // Gris
    }
    if (difficulty <= 1) {
      return '#00ff00'; // Vert
    } else if (difficulty <= 2) {
      return '#99ff33'; // Vert clair
    } else if (difficulty <= 3) {
      return '#ffff00'; // Jaune
    } else if (difficulty <= 4) {
      return '#ff6600'; // Orange
    } else {
      return '#ff0000'; // Rouge
    }
  }
}
