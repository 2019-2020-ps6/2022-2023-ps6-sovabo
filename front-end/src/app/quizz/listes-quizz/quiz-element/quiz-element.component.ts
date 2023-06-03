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

}
