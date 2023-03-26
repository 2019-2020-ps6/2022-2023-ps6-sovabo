import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import { Question, Answer } from '../../../models/question.model';

@Component({
  selector: 'app-jouer-quizz',
  templateUrl: './jouer-quizz.component.html',
  styleUrls: ['./jouer-quizz.component.scss']
})
export class JouerQuizzComponent implements OnInit {
  public quiz!: Quiz;

  public questionCorrectIndex : number = 0;

  public currentQuestionIndex: number = 0;
  public currentQuestion: Question = { id:"0",label: '', answers: [] };
  public selectedAnswerIndex: number | null = null;

  public isAnswerCorrect: boolean | null = null;

  public isQuizFinished: boolean = false;
  public score: number = 0;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.quiz = this.quizService.getQuizById(id);
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.questionCorrectIndex = this.getCorrectAnswerIndex(this.currentQuestion);
    console.log(this.currentQuestion.answers[this.questionCorrectIndex]);
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
      this.score++;
    }

    this.selectedAnswerIndex = null;
  }

  goToNextQuestion() {
    if (this.currentQuestionIndex === this.quiz.questions.length - 1) {
      this.isQuizFinished = true;
    } else {
      this.currentQuestionIndex++;
      console.log(this.currentQuestionIndex);
      this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
      this.questionCorrectIndex = this.getCorrectAnswerIndex(this.currentQuestion);
      this.isAnswerCorrect = null;
    }
  }

  getCorrectAnswerIndex(question: Question): number {
    for (let i = 0; i < question.answers.length; i++) {
      if (question.answers[i].isCorrect) {
        return i;
      }
    }
    return 0;
  }
}
