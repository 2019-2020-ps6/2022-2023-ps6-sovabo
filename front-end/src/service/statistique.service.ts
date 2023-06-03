import { Injectable } from '@angular/core';
import { Quiz } from 'src/models/quizz.model';
import { StatQuizz } from 'src/models/quizz.stat.model';
import { QuizService } from './quizz.service';
import { User } from 'src/models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private listQuiz: Quiz[] = [];
  private userS : any;

  constructor(private quizService: QuizService, private userService: UserService) {
    this.listQuiz = this.quizService.getData();
  }

  //Dans cette méthode, on va ajouter au quiz que l'on vient de faire, la moyenne du temps de réponse obtenue dans l'objet StatQuiz du quiz
  public async ajouterMoyenneTimeResponseAuUserCournat(moyenne : number, quizId: string): Promise<void> {

    const userCourant = await this.userService.getUserCourant();
    console.log("ICI");
    if (userCourant) {
      let statCournant
      if(userCourant.listeStatQuizz){
        statCournant = userCourant.listeStatQuizz.find(stat => stat.idQuizz === quizId);
      }
      if(userCourant.id){
        console.log("AVANT");
        console.log(userCourant.listeStatQuizz); 
          this.updateOrCreateStatQuizz(userCourant, quizId, undefined , moyenne, undefined, undefined);
      }
    }
  }

  

  updateQuiz(quiz: Quiz) {
    console.log("updateQuiz");
    console.log(quiz.statQuiz.timeResponses);
    this.quizService.updateQuiz(quiz);
  }



  updateOrCreateStatQuizz(user: User, idQuizz: string, nbMissClicks?: number, timeResponse?: number, resultatQuizz?: number, FreqInteractAnim?: number): void {
    const existingStatQuizz = user.listeStatQuizz?.find(statQuizz => statQuizz.idQuizz === idQuizz);
    console.log("AVANT");
    console.log(user.listeStatQuizz); 
    if (existingStatQuizz) {
      // Ajouter les nouvelles données aux champs du StatQuizz existant si elles sont fournies
      if (nbMissClicks !== undefined) {
        existingStatQuizz.nbMissClicks.push(nbMissClicks);
      }
      if (timeResponse !== undefined) {
        existingStatQuizz.timeResponses.push(timeResponse);
      }
      if (resultatQuizz !== undefined) {
        existingStatQuizz.resultatQuizz.push(resultatQuizz);
      }
      if (FreqInteractAnim !== undefined) {
        existingStatQuizz.FreqInteractAnim.push(FreqInteractAnim);
      }
      const newStatQuizz: StatQuizz = {
        idQuizz: idQuizz,
        nbMissClicks: existingStatQuizz.nbMissClicks,
        timeResponses: existingStatQuizz.timeResponses,
        resultatQuizz: existingStatQuizz.resultatQuizz,
        FreqInteractAnim: existingStatQuizz.FreqInteractAnim,
      };
      if(user.id){
        this.userService.updateStatQuizzForUser(user.id,newStatQuizz , idQuizz)
  
      }
    } else {
      // Créer un nouveau StatQuizz avec les champs obligatoires fournis et les autres champs vides
      const newStatQuizz: StatQuizz = {
        idQuizz: idQuizz,
        nbMissClicks: nbMissClicks !== undefined ? [nbMissClicks] : [],
        timeResponses: timeResponse !== undefined ? [timeResponse] : [],
        resultatQuizz: resultatQuizz !== undefined ? [resultatQuizz] : [],
        FreqInteractAnim: FreqInteractAnim !== undefined ? [FreqInteractAnim] : [],
      };
  
      if (!user.listeStatQuizz) {
        user.listeStatQuizz = [];
      }
  
      user.listeStatQuizz.push(newStatQuizz);
      if(user.id){
        this.userService.updateStatQuizzForUser(user.id,newStatQuizz , idQuizz)
  
      }
    }

  }
  
  
  

}
