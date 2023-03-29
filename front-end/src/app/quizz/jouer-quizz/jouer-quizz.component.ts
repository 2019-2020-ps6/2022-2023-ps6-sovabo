import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import { Question, Answer } from '../../../models/question.model';
import {AnimateurService} from "../../../service/animateur.service";
import {AnimationsService} from "../../../service/animations.service";


@Component({
  selector: 'app-jouer-quizz',
  templateUrl: './jouer-quizz.component.html',
  styleUrls: ['./jouer-quizz.component.scss']
})
export class JouerQuizzComponent implements OnInit {
  public quiz!: Quiz;

  public questionCorrectIndex: number = 0;

  public isLastQuestion: boolean = false;

  public currentQuestionIndex: number = 0;
  public currentQuestion: Question = { id: "0", label: '', answers: [] };
  public selectedAnswerIndex: number | null = null;

  public isAnswerCorrect: boolean | null = null;

  public isQuizFinished: boolean = false;
  public animations: boolean | undefined;
  public animationDuration: string | undefined;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router, private animateurService: AnimateurService, private animationService: AnimationsService) {}

  ngOnInit(): void {
    this.quiz = this.quizService.getQuizCourant();
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.questionCorrectIndex = this.getCorrectAnswerIndex(this.currentQuestion);
    this.animations = this.animationService.getAnimations();
    this.animationDuration = this.animationService.duration;
    console.log(this.animations);
    console.log(this.animationService.duration);

  }

  checkWin(){
    if (this.currentQuestionIndex === this.quiz.questions.length - 1) {
      console.log("finishh");
      console.log(this.currentQuestionIndex);
      this.isQuizFinished = true;
    }
  }

  selectAnswer(answerIndex: number) {
    this.selectedAnswerIndex = answerIndex;
  }

  validateAnswer() {
    if (this.selectedAnswerIndex === null) {
      return;
    }

    const selectedAnswer = this.currentQuestion?.answers[this.selectedAnswerIndex];
    if (!selectedAnswer) {
      return;
    }

    this.isAnswerCorrect = selectedAnswer.isCorrect;
    if (selectedAnswer.isCorrect) {
      this.quizService.addScore();
    }

    this.selectedAnswerIndex = null;

    if(this.currentQuestionIndex == this.quiz.questions.length-2){
      this.isLastQuestion = true;
    }

    this.checkWin();
  }



  goToNextQuestion() {

      this.currentQuestionIndex++;
      console.log(this.currentQuestionIndex);
      this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
      this.questionCorrectIndex = this.getCorrectAnswerIndex(this.currentQuestion);
      this.isAnswerCorrect = null;

  }

  getCorrectAnswerIndex(question: Question): number {
    for (let i = 0; i < question.answers.length; i++) {
      if (question.answers[i].isCorrect) {
        return i;
      }
    }
    return 0;
  }

  getAnimateur() {
    return this.animateurService.getAnimateur();
  }
}
