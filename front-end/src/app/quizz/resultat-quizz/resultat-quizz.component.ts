import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../../models/quizz.model';
import { QuizService } from '../../../service/quizz.service';
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

  constructor(private route: ActivatedRoute, private quizService: QuizService,  private jeuxCouleursService: JeuxCouleursService) {
  }

  ngOnInit() {
    this.quiz = this.quizService.getQuizCourant();
    this.score = this.quizService.getScore();
  }

}
