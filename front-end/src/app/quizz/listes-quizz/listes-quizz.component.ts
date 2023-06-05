import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import {AnimationsService} from "../../../service/animations.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-listes-quizz',
  templateUrl: './listes-quizz.component.html',
  styleUrls: ['./listes-quizz.component.scss']
})
export class ListesQuizzComponent {

  public quizList: Quiz[] = [];
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  constructor(private quizService: QuizService, public animationsService: AnimationsService, private jeuxCouleursService: JeuxCouleursService) { }

  ngOnInit(): void {
    this.quizList = this.quizService.getData();
    // console.log(this.animationsService.isAnimated);
  }

  ngAfterViewInit(){
    if (this.jeuxCouleursService.isDefaultActive) {this.jeuxCouleursService.collectDefaultStyles();}
    else {this.jeuxCouleursService.changeFont(document);}
    this.jeuxCouleursService.changeFontSize(document);
    this.jeuxCouleursService.changeColor(document);
  }

  ngAfterContentChecked(){

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
