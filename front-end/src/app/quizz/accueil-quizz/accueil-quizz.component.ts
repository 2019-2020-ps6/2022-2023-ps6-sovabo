import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {UserService} from "../../../service/user.service";
import {User} from "../../../models/user.model";
import {MonProfilComponent} from "../../mon-profil/mon-profil.component";


@Component({
  selector: 'app-accueil-quizz',
  templateUrl: './accueil-quizz.component.html',
  styleUrls: ['./accueil-quizz.component.scss']

})
export class AccueilQuizzComponent {
  userCourant: any;
  animations: boolean | undefined;
  public animationSpeed: string | undefined;


  public quiz!: Quiz;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  quizStar = faStar;

  constructor(private animateurService: AnimateurService,
     private route: ActivatedRoute,
      private quizService: QuizService,
       private animationsService: AnimationsService,
       private jeuxCouleursService: JeuxCouleursService,
        private userService: UserService) {

    this.userCourant = this.userService.getUserCourant();

    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.jeuxCouleursService.setVisionColor(user.configuration.jeuCouleur);
        this.jeuxCouleursService.setAttentionColor(user.configuration.contraste);
        this.jeuxCouleursService.setFontWithString(user.configuration.police);
      }
    });
  }
  async ngOnInit(): Promise<void> {
    await this.userService.updateAll();
    this.userCourant = this.userService.getUserCourant();
    await this.loadConfig();

    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.quiz = this.quizService.getQuizById(id);
    this.quizService.setQuizCourant(this.quiz);
    this.userCourant = this.userService.getUserCourant();
    this.jeuxCouleursService.setUpdateDocument(true);
    this.jeuxCouleursService.updateDoc(document);
  }


  loadConfig(){
    this.animations = this.userService.getUserCourant()?.configuration.animation;
    this.animationSpeed = this.userService.getUserCourant()?.configuration.animationSpeed;
    this.jeuxCouleursService.setFontWithString(this.userService.getUserCourant()?.configuration.police || this.jeuxCouleursService.listTrouble[3]);
    this.jeuxCouleursService.setVisionColor(this.userService.getUserCourant()?.configuration.jeuCouleur || -1);
    this.jeuxCouleursService.setAttentionColor(this.userService.getUserCourant()?.configuration.contraste || false);
  }

  ngAfterViewInit(){

  }


  getAnimateur() {
    return this.animateurService.getAnimateur().value;
}

  getAnimateurPath() {
    return this.userCourant.imagePath;
  }

  getAnimations() {
    return this.animationsService.isAnimated.value;
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
