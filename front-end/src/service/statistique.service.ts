import { Injectable } from '@angular/core';
import { Quiz } from 'src/models/quizz.model';
import { StatQuizz } from 'src/models/quizz.stat.model';
import { QuizService } from './quizz.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private idQuizCourant: string = "";
  private listQuiz: Quiz[] = [];

  constructor(private quizService: QuizService) {
    this.listQuiz = this.quizService.getData();
    this.idQuizCourant = this.quizService.getQuizCourant().id;
  }

  //Dans cette méthode, on va ajouter au quiz que l'on vient de faire, la moyenne du temps de réponse obtenue dans l'objet StatQuiz du quiz
  public ajouterMoyenneTimeResponseAuQuizCourant(moyenne : number): void {

    const quizCourant = this.listQuiz.find(quiz => quiz.id === this.idQuizCourant);
    if (quizCourant) {
      const statQuizCourant = quizCourant.statQuiz;
      if (statQuizCourant) {
        console.log("j'ai add la moyenne");
        statQuizCourant.timeResponses.push(moyenne);
        console.log("j'ai add l");

      }
    }
  }

}
