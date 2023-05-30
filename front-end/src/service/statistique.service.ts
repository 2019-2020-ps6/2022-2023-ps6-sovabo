import { Injectable } from '@angular/core';
import { Quiz } from 'src/models/quizz.model';
import { StatQuizz } from 'src/models/quizz.stat.model';
import { QuizService } from './quizz.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private listQuiz: Quiz[] = [];

  constructor(private quizService: QuizService){
    this.listQuiz = this.quizService.getData();
  }

  //Dans cette méthode, on va ajouter au quiz que l'on vient de faire, la moyenne du temps de réponse obtenue dans l'objet StatQuiz du quiz
  public async ajouterMoyenneTimeResponseAuQuizCourant(moyenne : number): Promise<void> {
    await this.quizService.loadQuizzesFromServer();
    const quizCourant = this.listQuiz.find(quiz => quiz.id === this.quizService.getQuizCourant().id);
    if (quizCourant) {
      console.log("quizCourant");
      const statQuizCourant = quizCourant.statQuiz;
      console.log(statQuizCourant);
      if (statQuizCourant) {
        console.log("j'ajoute");
        statQuizCourant.timeResponses.push(moyenne);
        this.updateQuiz(quizCourant);
      }
    }
  }
  
  

  updateQuiz(quiz: Quiz) {
    console.log("updateQuiz");
    console.log(quiz.statQuiz.timeResponses);
    this.quizService.updateQuiz(quiz);
  }

}
