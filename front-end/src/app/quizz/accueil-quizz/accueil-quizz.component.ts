import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-accueil-quizz',
  templateUrl: './accueil-quizz.component.html',
  styleUrls: ['./accueil-quizz.component.scss']

})
export class AccueilQuizzComponent {
  animations: boolean = false;
  public animationDuration: string | undefined;

  public quiz!: Quiz;

  quizStar = faStar;

  constructor(private animateurService: AnimateurService, private route: ActivatedRoute, private quizService: QuizService, private animationsService: AnimationsService) {
    this.animationDuration = this.animationsService.duration;
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.quiz = this.quizService.getQuizById(id);
    this.quizService.setQuizCourant(this.quiz);
    this.animations = this.animationsService.isAnimated;
    this.animationDuration = this.animationsService.duration;
    console.log(this.animationsService.duration);
  }

  getAnimateur() {
    return this.animateurService.getAnimateur();
  }

}
