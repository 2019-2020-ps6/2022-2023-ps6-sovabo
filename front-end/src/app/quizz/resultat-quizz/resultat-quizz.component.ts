import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../../models/quizz.model';
import { QuizService } from '../../../service/quizz.service';
import {AnimateurService} from "../../../service/animateur.service";


@Component({
  selector: 'app-resultat-quizz',
  templateUrl: './resultat-quizz.component.html',
  styleUrls: ['./resultat-quizz.component.scss']
})
export class ResultatQuizzComponent {

  score!: number;
  public quiz!: Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private animateurService: AnimateurService) {
  }

  ngOnInit() {
    this.quiz = this.quizService.getQuizCourant();
    this.score = this.quizService.getScore();
  }

  getAnimateur() {
    return this.animateurService.getAnimateur();
  }

}
