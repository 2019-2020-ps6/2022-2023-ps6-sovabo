import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";


@Component({
  selector: 'app-accueil-quizz',
  templateUrl: './accueil-quizz.component.html',
  styleUrls: ['./accueil-quizz.component.scss']

})
export class AccueilQuizzComponent {
  animations: boolean = false;

  public quiz!: Quiz;

  constructor(private animateurService: AnimateurService, private route: ActivatedRoute, private quizService: QuizService, private animationsService: AnimationsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.quiz = this.quizService.getQuizById(id);
    this.animations = this.animationsService.getAnimations();
    console.log(this.animations)
  }

  getAnimateur() {
    return this.animateurService.getAnimateur();
  }
}
