import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quizz.model';
import { QuizService } from '../../service/quizz.service';
import { StatistiqueService } from 'src/service/statistique.service';
import { StatQuizz } from 'src/models/quizz.stat.model';
import { User } from 'src/models/user.model';
import { ConfigurationModel } from 'src/models/configuration.model';
import { UserService } from 'src/service/user.service';
import {AuthService} from "../../service/authentification.service";

declare function createChart(statQuiz: StatQuizz, stat: String): any;

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss',"../../assets/css/material-dashboard.css"]
})
export class StatistiqueComponent implements OnInit{
  public statQuiz!: StatQuizz[];
  public quiz!: Quiz;
  public myLineChart: any;
  public userCourant!: User;
  showModalAuth: boolean | undefined;
  correctAccessCode: string | undefined;
  isAccessing: boolean | undefined;
  selectedStatIndex: number = -1;
  selectedTdIndex: number = -1;

  public statTypes: { name: string, param: string }[] = [ // Ajout de statTypes
    { name: 'Statistique 1', param: 'param1' },
    { name: 'Statistique 2', param: 'param2' },
    { name: 'Statistique 3', param: 'param3' },
    { name: 'Statistique 4', param: 'param4' },
    { name: 'Statistique 5', param: 'param5' },
    { name: 'Statistique 6', param: 'param6' },
    
    // Ajoutez autant de types de stats que nécessaire
  ];

  public moyenneTimeReponse: number = 0;
  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private statistiquesService: StatistiqueService,
              private authService: AuthService,
              private UserService: UserService) {
  }

  ngOnInit() {
    const userC = this.UserService.getUserCourant();
    if(userC){
      this.userCourant = userC;
    }
    //this.quiz = this.quizService.getQuizCourant();

    this.statQuiz = this.userCourant.listeStatQuizz ? this.userCourant.listeStatQuizz : [];
    for (let statQuiz of this.statQuiz) {
      statQuiz.nameQuizz = this.quizService.getQuizNameById(statQuiz.idQuizz);
    }

    this.showModalAuth = !this.authService.getAuthenticationStatus();
    this.authService.getCorrectAccessCode().subscribe(code => {
      this.correctAccessCode = code;
    });

    this.selectedTdIndex = -1; // Nouveau
    setInterval(() => {
      this.selectedStatIndex = Math.floor(Math.random() * this.statQuiz.length);
      this.selectedTdIndex = Math.floor(Math.random() * 4); // Assumant que vous avez toujours 4 td dans chaque tableau.
    }, 4000);

    //this.moyenneTimeReponse = this.calculerMoyenne();
    //createChart(this.statQuiz);

  }


  // public calculerMoyenne(): number {

  //   for (const timeResponse of this.statQuiz.timeResponses) {
  //   }
  //   const timeResponses = this.statQuiz.timeResponses;
  //   const nbResponses = timeResponses.length;
  //   if (nbResponses === 0) {
  //     return 0;
  //   }
  //   const total = timeResponses.reduce((acc, timeResponse) => acc + timeResponse);
  //   const moyenne = total / nbResponses;
  //   return parseFloat(moyenne.toFixed(2));
  // }

  openPopup(statQuiz: StatQuizz, stat: String): void {
    // Pass statQuiz to your createChart function
    console.log(stat);
    console.log("statQuiz");
    console.log(statQuiz);

    this.myLineChart = createChart(statQuiz, stat);
    console.log(this.myLineChart);

    const popupElement = document.getElementById("popup");
    if (popupElement) {
      popupElement.style.display = "block";
    }
  }
  closePopup(): void {

    if (this.myLineChart) {
      this.myLineChart.destroy();
      this.myLineChart = null;
    }
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

  toggleAuthenticate() {
    this.authService.toggleAuthenticate();
  }

  getNameQuizz(idQuizz: string): string {
    return this.quizService.getQuizNameById(idQuizz);
  }
}
