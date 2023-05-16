import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../../models/quizz.model';
import { QuizService } from '../../../service/quizz.service';
import {AnimateurService} from "../../../service/animateur.service";
import {AnimationsService} from "../../../service/animations.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";


@Component({
  selector: 'app-resultat-quizz',
  templateUrl: './resultat-quizz.component.html',
  styleUrls: ['./resultat-quizz.component.scss']
})
export class ResultatQuizzComponent {

  score!: number;
  public quiz!: Quiz;

  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  constructor(private route: ActivatedRoute, private quizService: QuizService, private animateurService: AnimateurService, private animationsService: AnimationsService, private jeuxCouleursService: JeuxCouleursService) {

  }

  ngOnInit() {
    this.quiz = this.quizService.getQuizCourant();
    this.score = this.quizService.getScore();
    this.jeuxCouleursService.changeFont(document);
    this.jeuxCouleursService.changeFontSize(document);
  }

  getAnimateur() {
    return this.animateurService.getAnimateur();
  }

  getAnimations() {
    return this.animationsService.isAnimated;
  }

  getDelay() {
    return this.animationsService.delay != undefined ? this.animationsService.delay : 0;
  }

  getAnimationDuration() {
    return this.animationsService.duration;
  }
}
