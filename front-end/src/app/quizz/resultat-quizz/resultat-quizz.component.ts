import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultat-quizz',
  templateUrl: './resultat-quizz.component.html',
  styleUrls: ['./resultat-quizz.component.scss']
})
export class ResultatQuizzComponent {

  score!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //this.score = this.route.snapshot.queryParamMap.get('score');
  }

}
