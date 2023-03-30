import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../../models/quizz.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quiz-element',
  templateUrl: './quiz-element.component.html',
  styleUrls: ['./quiz-element.component.scss']
})

export class QuizElementComponent {
  @Input()
  quiz!: Quiz;

  quizStar = faStar;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.quiz.hovered)
  }

}
