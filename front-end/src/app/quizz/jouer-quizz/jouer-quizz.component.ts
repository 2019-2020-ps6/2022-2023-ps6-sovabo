import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {parse} from "@fortawesome/fontawesome-svg-core";
import {UserService} from "../../../service/user.service";


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
  static timeTimer : number = 150;

  public timeRemaining: number = JouerQuizzComponent.timeTimer;
  private timerId: any | undefined;
  private currentFont: string = this.jeuxCouleursService.getFontSelectedString();
  public contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  private isAnswerValidated: boolean = false; // Nouvelle variable
  userCourant: any;
  private clickListener: ((event: Event) => void) | undefined;
  public clicksOutsideButtons: number = 0;
  public quizStartTime: number = 0;
  public quizEndTime: number = 0;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private statistiquesService: StatistiqueService,
    private router: Router,
    private animateurService: AnimateurService,
    private animationService: AnimationsService,
    private jeuxCouleursService: JeuxCouleursService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadConfig();
    this.quizStartTime = Date.now();
    this.timerId = undefined;
  this.quiz = this.quizService.getQuizCourant();
  try {
    this.quiz.questions = await this.quizService.loadQuestionsFromQuiz(this.quiz.id);
  } catch (error) {
    console.error('Erreur lors du chargement des questions', error);
    return;
  }
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.questionCorrectIndex = this.getCorrectAnswerIndex(this.currentQuestion);
    this.startTime = Date.now();
    this.valueTime = [];
    this.startTimer();

    this.clickListener = (event: Event) => {
      const targetElement = event.target as HTMLElement;
      if (targetElement.tagName.toLowerCase() !== 'button') {
        this.clicksOutsideButtons++;
      }
    };
    document.addEventListener('click', this.clickListener);

    this.userCourant = this.userService.getUserCourant();
    this.jeuxCouleursService.setUpdateDocument(true);
  }

  loadConfig() {
    this.animations = this.userService.getUserCourant()?.configuration.animation;
    this.animationDuration = this.userService.getUserCourant()?.configuration.animationSpeed;
  }

  ngAfterViewInit(){
    if (this.jeuxCouleursService.isDefaultActive) {this.jeuxCouleursService.collectDefaultStyles();}
    else {this.jeuxCouleursService.changeFont(document);}
    this.jeuxCouleursService.changeFontSize(document);
  }

  ngAfterContentChecked(){
    this.jeuxCouleursService.changeColor(document);
  }

  getFontString() {
    return this.currentFont;
  }

  checkWin() {

    if (this.currentQuestionIndex === this.quiz.questions.length - 1) {

      this.statistiquesService.ajouterMoyenneTimeResponseAuUserCournat(this.calculerMoyenne(), this.quiz.id);
      this.isQuizFinished = true;
      this.statistiquesService.ajouterScoreAuUserCourant( this.quizService.getScore(),this.quiz.id);
      this.statistiquesService.ajouterNbMissCliqueAuUserCourant(this.clicksOutsideButtons, this.quiz.id);

      this.quizEndTime = Date.now();
      const totalTime = (this.quizEndTime - this.quizStartTime) / 1000; // durée en secondes

      const freqTimeAnim = totalTime/(this.animationService.getDelay()*25)+1;

      let freqTimeAnimNumber = Number(freqTimeAnim.toFixed(2));

      //this.statistiquesService.ajouterTotalTimeAuUserCourant(totalTime, this.quiz.id); // stocker le temps total
    //...
    }
  }

  startTimer() {
    this.timerId = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.timeRemaining = JouerQuizzComponent.timeTimer;
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

      //SI UNE REPONSE A DEJA ETE SELECTIONNEE
      if (this.selectedAnswerObject != null) {
        //SI LE JEU DE COULEUR EST PAS APPELE ->CLASSE ADPATEE
        if(this.jeuxCouleursService.getVisionColorSelected()!=-1){
          this.selectedAnswerObject.classList.remove(this.jeuxCouleursService.getVisionColorSelectedString()+"_SELECTED");
          this.selectedAnswerObject = target;
          this.selectedAnswerObject.classList.add(this.jeuxCouleursService.getVisionColorSelectedString()+"_SELECTED");
        }
        //SINON -> PAS DE COULEUR DONC CLASSE NORMALE
        else{
          this.selectedAnswerObject.classList.remove('selected');
          this.selectedAnswerObject = target;
          this.selectedAnswerObject.classList.add('selected');
        }
      } else {
        this.selectedAnswerObject = target;

        if(this.jeuxCouleursService.getVisionColorSelected()==-1){
          this.selectedAnswerObject.classList.add('selected');
        }
        else{
          this.selectedAnswerObject.classList.add(this.jeuxCouleursService.getVisionColorSelectedString()+"_SELECTED");
        }

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
      this.timeRemaining=JouerQuizzComponent.timeTimer;
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

  getQuestion(){
    return this.decalageQuestion();
  }

  getVisionColorSelected(){
    return this.jeuxCouleursService.getVisionColorSelected();
  }

  decalageQuestion(){
    let questionContainer = document.querySelector('.question-bubble');
    if(questionContainer){

      let htmlLocation = document.querySelector("#question_sentence");
      if(this.animationService.getAnimations().value){
        htmlLocation = document.querySelector("#question-animation");
      }

      if(htmlLocation){
        let initData = "Q"+(this.currentQuestionIndex+1)+" : " + this.currentQuestion.label;

        let largeur = parseFloat(getComputedStyle(questionContainer).width);
        let largeurTxt = parseFloat(getComputedStyle(htmlLocation).width);

        if(largeur>1200){
          let split = initData.split(" ");

          //CONSTRUCTION DE LA NOUVELLE QUESTION
          let indexToCut = Math.round(split.length/2);
          let finalHTML = ""
          let i=0;

          if(this.animationService.getAnimations().value==true){
              finalHTML += "<tspan x=\"50%\" y=\"30%\">";
              for(i;i<indexToCut;i++){finalHTML += split[i]+" ";}
              finalHTML += "</tspan>";
              finalHTML += "<tspan x=\"50%\" y=\"65%\">";
              for(i;i<split.length;i++){finalHTML += split[i]+" ";}
              finalHTML += "</tspan>";
          }
          else{
            for(i;i<indexToCut;i++){finalHTML += split[i]+" ";}
            finalHTML +="<br>";
            for(i;i<split.length;i++){finalHTML += split[i]+" ";}
          }

          initData = finalHTML;
        }
        htmlLocation.innerHTML = initData;
      }
    }
  }


  getAnimateur() {
    return this.animateurService.getAnimateur().value;
  }

  getAnimateurPath() {
    return this.userCourant.imagePath;
  }

  getAnimations() {
    return this.animationService.isAnimated.value;
  }

  getDelay() {
    return this.animationService.delay != undefined ? this.animationService.delay : 0;
  }
}
