import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quizz.model';
import { QuizService } from '../../service/quizz.service';
import { StatistiqueService } from 'src/service/statistique.service';
import { StatQuizz } from 'src/models/quizz.stat.model';
import { User } from 'src/models/user.model';
import { ConfigurationModel } from 'src/models/configuration.model';
import { UserService } from 'src/service/user.service';

declare function createChart(statQuiz: StatQuizz): any;

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss',"../../assets/css/material-dashboard.css"]
})
export class StatistiqueComponent {
  public statQuiz!: StatQuizz[];
  public quiz!: Quiz;
  public userCourant!: User;

  public moyenneTimeReponse: number = 0;
  constructor(private route: ActivatedRoute, private quizService: QuizService,private statistiquesService: StatistiqueService,
    private UserService: UserService) {
  }

  ngOnInit() {
    const userC = this.UserService.getUserCourant();
    if(userC){
      this.userCourant = userC;
    }
    console.log("user courant");
    console.log(this.userCourant);
    //this.quiz = this.quizService.getQuizCourant();

    this.statQuiz = this.userCourant.listeStatQuizz ? this.userCourant.listeStatQuizz : [];
    for (let statQuiz of this.statQuiz) {
      statQuiz.nameQuizz = this.quizService.getQuizNameById(statQuiz.idQuizz);
    }
    
    //this.moyenneTimeReponse = this.calculerMoyenne();
    //createChart(this.statQuiz);

    const openButton = document.getElementById("openButton");
    if (openButton) {
      openButton.addEventListener("click", this.openPopup);
    }

    const closeButton = document.getElementById("closeButton");
    if (closeButton) {
      closeButton.addEventListener("click", this.closePopup);
    }
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


}
