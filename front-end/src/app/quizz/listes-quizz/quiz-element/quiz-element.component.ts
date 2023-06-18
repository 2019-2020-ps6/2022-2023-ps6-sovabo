import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../../models/quizz.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-quiz-element',
  templateUrl: './quiz-element.component.html',
  styleUrls: ['./quiz-element.component.scss']
})

export class QuizElementComponent {
  @Input()
  quiz!: Quiz;

  quizStar = faStar;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  constructor( private jeuxCouleursService: JeuxCouleursService) {
  }

  ngOnInit(): void {
  }

  getVisionColorSelected(){
    return this.jeuxCouleursService.getVisionColorSelected();
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

  getDifficultyQuiz() {
    return this.quiz.difficulty;
  }

}
