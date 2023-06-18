import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../../models/quizz.model';
import { QuizService } from '../../../service/quizz.service';
import {AnimateurService} from "../../../service/animateur.service";
import {AnimationsService} from "../../../service/animations.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {UserService} from "../../../service/user.service";


@Component({
  selector: 'app-resultat-quizz',
  templateUrl: './resultat-quizz.component.html',
  styleUrls: ['./resultat-quizz.component.scss']
})
export class ResultatQuizzComponent {

  score!: number;
  public quiz!: Quiz;
  userCourant: any;

  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  constructor(private route: ActivatedRoute, private quizService: QuizService, private animateurService: AnimateurService, private animationsService: AnimationsService, private jeuxCouleursService: JeuxCouleursService, private userService: UserService) {

  }

  ngOnInit() {
    this.quiz = this.quizService.getQuizCourant();
    this.score = this.quizService.getScore();

    this.jeuxCouleursService.setUpdateDocument(true);
    this.jeuxCouleursService.updateDoc(document);
  }

  ngAfterViewInit(){
    if (this.jeuxCouleursService.isDefaultActive) {this.jeuxCouleursService.collectDefaultStyles();}
    else {this.jeuxCouleursService.changeFont(document);}
    this.jeuxCouleursService.changeFontSize(document);
  }

  getAnimateur() {
    return this.animateurService.getAnimateur().value;
  }

  getAnimateurPath() {
    return `./assets/Images/Animateurs/${this.userService.getUserCourant()?.imagePath}`;
  }

  getAnimations() {
    return this.animationsService.isAnimated.value;
  }

  getDelay() {
    return this.animationsService.delay != undefined ? this.animationsService.delay : 0;
  }

  getAnimationDuration() {
    return this.animationsService.duration;
  }
}
