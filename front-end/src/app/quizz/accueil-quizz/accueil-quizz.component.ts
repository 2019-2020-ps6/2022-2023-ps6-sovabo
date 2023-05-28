import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";


@Component({
  selector: 'app-accueil-quizz',
  templateUrl: './accueil-quizz.component.html',
  styleUrls: ['./accueil-quizz.component.scss']

})
export class AccueilQuizzComponent {
  animations: boolean = false;
  public animationDuration: string | undefined;

  public quiz!: Quiz;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  quizStar = faStar;

  constructor(private animateurService: AnimateurService, private route: ActivatedRoute, private quizService: QuizService, private animationsService: AnimationsService,private jeuxCouleursService: JeuxCouleursService) {
    this.animationDuration = this.animationsService.duration;
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.quiz = this.quizService.getQuizById(id);
    this.quizService.setQuizCourant(this.quiz);
    this.animations = this.animationsService.isAnimated;
    this.animationDuration = this.animationsService.duration;
    if (this.jeuxCouleursService.isDefaultActive) {
      this.jeuxCouleursService.collectDefaultStyles();
    }
    else {
      this.jeuxCouleursService.changeFont(document);
    }
  }

  ngAfterViewInit(){
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

  resetScore() {
    this.quizService.resetScore();
  }
}
