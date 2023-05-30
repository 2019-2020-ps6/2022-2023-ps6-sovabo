import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quizz.model';
import { QuizService } from '../../service/quizz.service';
import { StatistiqueService } from 'src/service/statistique.service';
import { StatQuizz } from 'src/models/quizz.stat.model';
import {AuthService} from "../../service/authentification.service";

declare function createChart(): any;

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss',"../../assets/css/material-dashboard.css"]
})
export class StatistiqueComponent {
  public statQuiz!: StatQuizz;
  public quiz!: Quiz;
  public moyenneTimeReponse: number = 0;
  showModalAuth: boolean | undefined;
  correctAccessCode: string | undefined;
  isAccessing: boolean | undefined;


  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private statistiquesService: StatistiqueService,
              private authService: AuthService) {
    this.statQuiz = { timeResponses: [] };
  }

  async ngOnInit(): Promise<void> {
    this.quiz = this.quizService.getQuizCourant();
    this.statQuiz = this.quiz.statQuiz;
    this.moyenneTimeReponse = this.calculerMoyenne();
    createChart();

    const openButton = document.getElementById("openButton");
    if (openButton) {
      openButton.addEventListener("click", this.openPopup);
    }

    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.addEventListener("click", this.closePopup);
    }

    this.showModalAuth = !this.authService.getAuthenticationStatus();
    this.authService.getCorrectAccessCode().subscribe(code => {
      this.correctAccessCode = code;
    });
  }


  public calculerMoyenne(): number {

    for (const timeResponse of this.statQuiz.timeResponses) {
    }
    const timeResponses = this.statQuiz.timeResponses;
    const nbResponses = timeResponses.length;
    if (nbResponses === 0) {
      return 0;
    }
    const total = timeResponses.reduce((acc, timeResponse) => acc + timeResponse);
    const moyenne = total / nbResponses;
    return parseFloat(moyenne.toFixed(2));
  }

  openPopup(): void {
    const popupElement = document.getElementById("popup");
    if (popupElement) {
      popupElement.style.display = "block";
    }
  }
  closePopup(): void {

    const popupElement = document.getElementById("popup");
    if (popupElement) {
      popupElement.style.display = "none";
    }
  }

  handleAccessCode(accessCode: string): void {
    if (accessCode === this.correctAccessCode) {
      this.authService.toggleAuthenticate();
      this.isAccessing = true;
      setTimeout(() => {
        this.showModalAuth = false;
      }, 600); // The same duration as your animation
    } else {
      alert('Incorrect access code. Please try again.');
    }
  }
}
