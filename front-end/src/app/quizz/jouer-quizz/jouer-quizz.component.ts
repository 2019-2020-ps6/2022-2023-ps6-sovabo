import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import { Question, Answer } from '../../../models/question.model';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { StatistiqueService } from 'src/service/statistique.service';
import { StatQuizz } from 'src/models/quizz.stat.model';

import {AnimateurService} from "../../../service/animateur.service";
import {AnimationsService} from "../../../service/animations.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";


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
  public startTime: number = -1; // Nouvelle variable startTime
  public endTime: number = 0; // Nouvelle variable endTime
  public firstTime: boolean = true;

  public delay: number = 5000;

  public timeRemaining: number = 10;

  private timerId: any | undefined;

  private currentFont : string=this.jeuxCouleursService.getFontSelectedString();

  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private statistiquesService: StatistiqueService,
              private router: Router,
              private animateurService: AnimateurService,
              private animationService: AnimationsService,
              private jeuxCouleursService: JeuxCouleursService) {}

  ngOnInit(): void {
    this.timerId = undefined; // ou null
    this.quiz = this.quizService.getQuizCourant();
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.questionCorrectIndex = this.getCorrectAnswerIndex(this.currentQuestion);
    this.animations = this.animationService.isAnimated;

    //Gérer la moyenne de temps des réponses
    this.startTime = Date.now();
    this.valueTime = [];
    this.animationDuration = this.animationService.duration;
    this.startTimer();

    if (this.jeuxCouleursService.isDefaultActive) {
      this.jeuxCouleursService.collectDefaultStyles();
    }
    else {
      this.jeuxCouleursService.changeFont(document);
      this.jeuxCouleursService.changeFontSize(document);
    }

  }

  getFontString(){
    return this.currentFont;
  }

  checkWin(){
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
          this.validateAnswer();
          if (!this.isLastQuestion) {
            setTimeout(() => {
              this.goToNextQuestion();
            }, 5000); // délai de 5 secondes
          }
        }
      }
    }, 1000);
  }






  selectAnswer(event: Event | null) {
    if(event != null){
      const target = event?.currentTarget as HTMLElement;

      if(this.selectedAnswerObject != null){
        this.selectedAnswerObject.classList.remove('selected');
        this.selectedAnswerObject = target;
        this.selectedAnswerObject.classList.add('selected');
      }
      else{
        this.selectedAnswerObject = target;
        this.selectedAnswerObject.classList.add('selected');
      }
    }
  }

  validateAnswer() {
    this.validateAnswerBool = true;
    const selectedAnswer = this.currentQuestion?.answers[this.selectedAnswerIndex ?? -1];


    // Arrêter le timer
    clearTimeout(this.timerId);


    //gestion du temps
    this.endTime = Date.now();
    const timeTaken = (this.endTime - this.startTime) / 1000;
    this.valueTime.push(timeTaken);

    //check win
    this.checkWin();

    if(!selectedAnswer){
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


    if (!this.isLastQuestion) {
    setTimeout(() => {
      this.goToNextQuestion();
    }, 5000); // délai de 5 secondes
  }


  }






  goToNextQuestion() {
    this.validateAnswerBool = false;
    //gestion du temps, si c'est pas la première question alors on reset le timer quand on va a la prochaine question
    if(!this.firstTime){
      this.endTime = Date.now();
      const timeTaken = (this.endTime - this.startTime) / 1000;
      this.valueTime.push(timeTaken);
      this.startTime = Date.now();
    } else { //si c'est la première question alors il faut commencer le timer quand on va a la prochaine question car quand le component se charge le timer commence
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

    this.startTimer();
  }


  getCorrectAnswerIndex(question: Question): number {
    for (let i = 0; i < question.answers.length; i++) {
      if (question.answers[i].isCorrect) {
        return i;
      }
    }
    return 0;
  }

  public calculerMoyenne(): number {
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
