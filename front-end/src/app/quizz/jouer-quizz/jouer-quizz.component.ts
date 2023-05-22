import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import { Question, Answer } from '../../../models/question.model';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { StatistiqueService } from 'src/service/statistique.service';
import { StatQuizz } from 'src/models/quizz.stat.model';

import { AnimateurService } from "../../../service/animateur.service";
import { AnimationsService } from "../../../service/animations.service";
import { JeuxCouleursService } from "../../../service/jeux-couleurs.service";


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
  public validateAnswerBool: boolean = false;
  public selectedAnswerIndex: number | null = null;
  public selectedAnswerObject?: HTMLElement;
  public isAnswerCorrect: boolean | null = null;
  public isQuizFinished: boolean = false;
  public animations: boolean | undefined;
  public animationDuration: string | undefined;
  public valueTime: number[] = [];
  public startTime: number = -1;
  public endTime: number = 0;
  public firstTime: boolean = true;
  public delay: number = 5000;
  public timeRemaining: number = 10;
  private timerId: any | undefined;
  private currentFont: string = this.jeuxCouleursService.getFontSelectedString();
  public contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  private isAnswerValidated: boolean = false; // Nouvelle variable

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private statistiquesService: StatistiqueService,
    private router: Router,
    private animateurService: AnimateurService,
    private animationService: AnimationsService,
    private jeuxCouleursService: JeuxCouleursService
  ) {}

  ngOnInit(): void {
    this.timerId = undefined;
    this.quiz = this.quizService.getQuizCourant();
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.questionCorrectIndex = this.getCorrectAnswerIndex(this.currentQuestion);
    this.animations = this.animationService.isAnimated;
    this.startTime = Date.now();
    this.valueTime = [];
    this.animationDuration = this.animationService.duration;
    this.startTimer();

  }

  ngAfterViewInit(){
    if (this.jeuxCouleursService.isDefaultActive) {
      this.jeuxCouleursService.collectDefaultStyles();
    } else {
      this.jeuxCouleursService.changeFont(document);
    }
    this.jeuxCouleursService.changeFontSize(document);
  }

  getFontString() {
    return this.currentFont;
  }

  checkWin() {
    if (this.currentQuestionIndex === this.quiz.questions.length - 1) {
      this.statistiquesService.ajouterMoyenneTimeResponseAuQuizCourant(this.calculerMoyenne());
      this.isQuizFinished = true;
    }
  }

  startTimer() {
    this.timeRemaining = 5;
    this.timerId = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        if (this.timerId !== undefined) {
          clearInterval(this.timerId);
          this.timerId = undefined;
          if (!this.isAnswerValidated) {
            this.validateAnswer();
          }
          if (!this.isLastQuestion && !this.isAnswerValidated) {
            setTimeout(() => {
              this.goToNextQuestion();
            }, 5000);
          }
        }
      }
    }, 1000);
  }

  selectAnswer(event: Event | null) {
    if (event != null) {
      const target = event?.currentTarget as HTMLElement;
      if (this.selectedAnswerObject != null) {
        this.selectedAnswerObject.classList.remove('selected');
        this.selectedAnswerObject = target;
        this.selectedAnswerObject.classList.add('selected');
      } else {
        this.selectedAnswerObject = target;
        this.selectedAnswerObject.classList.add('selected');
      }
    }
  }

  validateAnswer() {
    this.validateAnswerBool = true;
    const selectedAnswer = this.currentQuestion?.answers[this.selectedAnswerIndex ?? -1];
    clearTimeout(this.timerId);
    this.endTime = Date.now();
    const timeTaken = (this.endTime - this.startTime) / 1000;
    this.valueTime.push(timeTaken);
    this.checkWin();
    if (!selectedAnswer) {
      this.isAnswerCorrect = false;
      return;
    }
    if (selectedAnswer.isCorrect) {
      this.isAnswerCorrect = true;
      this.quizService.addScore();
    } else {
      this.isAnswerCorrect = false;
    }
    this.selectedAnswerIndex = null;

    // Vérifier si la question suivante doit être affichée automatiquement
    if (!this.isLastQuestion && !this.isAnswerValidated) {
      this.timerId = setTimeout(() => { // Stocker l'ID du minuteur pour l'annuler si nécessaire
        this.goToNextQuestion();
      }, 5000);
    }

    this.isAnswerValidated = true; // Marquer la réponse comme validée
  }

  goToNextQuestion() {
    this.validateAnswerBool = false;
    clearTimeout(this.timerId); // Annuler le minuteur en cours s'il existe
    if (!this.firstTime) {
      this.endTime = Date.now();
      const timeTaken = (this.endTime - this.startTime) / 1000;
      this.valueTime.push(timeTaken);
      this.startTime = Date.now();
    } else {
      this.firstTime = false;
      this.startTime = Date.now();
    }
    this.currentQuestionIndex++;
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.questionCorrectIndex = this.getCorrectAnswerIndex(this.currentQuestion);
    this.isAnswerCorrect = null;
    if (this.currentQuestionIndex == this.quiz.questions.length - 1) {
      this.isLastQuestion = true;
    }
    this.isAnswerValidated = false; // Réinitialiser le statut de validation

    // Vérifier si la réponse a été validée avant de passer à la question suivante
    if (!this.isAnswerValidated) {
      this.startTimer();
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

  calculerMoyenne(): number {
    const timeResponses = this.valueTime;
    const nbResponses = timeResponses.length;
    if (nbResponses === 0) {
      return 0;
    }
    const total = timeResponses.reduce((acc, timeResponse) => acc + timeResponse);
    const moyenne = total / nbResponses;
    return parseFloat(moyenne.toFixed(2));
  }

  getAnimateur() {
    return this.animateurService.getAnimateur();
  }

  getAnimations() {
    return this.animationService.isAnimated;
  }

  getDelay() {
    return this.animationService.delay != undefined ? this.animationService.delay : 0;
  }
}
