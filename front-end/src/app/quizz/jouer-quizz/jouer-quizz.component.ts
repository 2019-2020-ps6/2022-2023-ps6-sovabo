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


  public valueTime: number[] = [];
  public startTime: number = -1; // Nouvelle variable startTime
  public endTime: number = 0; // Nouvelle variable endTime
  public firstTime: boolean = true;
  
  constructor(private route: ActivatedRoute, private quizService: QuizService, private statistiquesService: StatistiqueService,private router: Router, private animateurService: AnimateurService, private animationService: AnimationsService) {}

  ngOnInit(): void {
    this.quiz = this.quizService.getQuizCourant();
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.questionCorrectIndex = this.getCorrectAnswerIndex(this.currentQuestion);

    //Gérer la moyenne de temps des réponses
    this.startTime = Date.now();
    this.valueTime = [];
    this.animations = this.animationService.getAnimations();
    this.animationDuration = this.animationService.duration;
    console.log(this.animations);
    console.log(this.animationService.duration);

  }

  checkWin(){
    if (this.currentQuestionIndex === this.quiz.questions.length - 1) {

      this.statistiquesService.ajouterMoyenneTimeResponseAuQuizCourant(this.calculerMoyenne());
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

    //gestion du temps
    this.endTime = Date.now();
    const timeTaken = (this.endTime - this.startTime) / 1000;
    this.valueTime.push(timeTaken);

    //check win
    this.checkWin();
  }



  goToNextQuestion() {
    //gestion du temps, si c'est pas la première question alors on reset le timer quand on va a la prochaine question
    if(!this.firstTime){
      this.endTime = Date.now();
      const timeTaken = (this.endTime - this.startTime) / 1000;
      this.valueTime.push(timeTaken);
      this.startTime = Date.now();
    }else{//si c'est la première question alors il faut commencer le timer quand on va a la prochaine question car quand le component se charge le timer commence
      this.firstTime = false;
      this.startTime = Date.now();

    }
  
    this.currentQuestionIndex++;
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
}
