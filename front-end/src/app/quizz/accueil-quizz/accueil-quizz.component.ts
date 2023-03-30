import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import {AnimationsService} from "../../../service/animations.service";


@Component({
  selector: 'app-accueil-quizz',
  templateUrl: './accueil-quizz.component.html',
  styleUrls: ['./accueil-quizz.component.scss']

})
export class AccueilQuizzComponent {
  animations: boolean = false;

  public quiz!: Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private animationsService: AnimationsService) {
    //this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.quiz = this.quizService.getQuizById(id);
    this.quizService.setQuizCourant(this.quiz);
    this.animations = this.animationsService.getAnimations();
  }





}
