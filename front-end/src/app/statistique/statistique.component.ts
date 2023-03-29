import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quizz.model';
import { QuizService } from '../../service/quizz.service';


@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss',"../../assets/css/material-dashboard.css"]
})
export class StatistiqueComponent {


  public quiz!: Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
  }

  ngOnInit() {
    this.quiz = this.quizService.getQuizCourant();
  }
}
