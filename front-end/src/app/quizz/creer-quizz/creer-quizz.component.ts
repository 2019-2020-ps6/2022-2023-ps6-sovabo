import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-creer-quizz',
  templateUrl: './creer-quizz.component.html',
  styleUrls: ['./creer-quizz.component.scss']
})
export class CreerQuizzComponent {

  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  constructor(private jeuxCouleursService: JeuxCouleursService) {
  }

  questions: string[] = ['', ''];
  reponses: string[][] = [['', ''], ['', '']];

  ajouterQuestion() {
    this.questions.push('');
    this.reponses.push(['', ''])
  }

  ajouterReponse(index: number) {
    this.reponses[index].push('');
  }

  /*selectionnerBonneReponse(questionIndex: number, reponseIndex: number) {
    // Réinitialiser les réponses
    for (let i = 0; i < this.reponses.length; i++) {
      for (let j = 0; j < this.reponses[i].length; j++) {
        this.reponses[i][j] = '';
      }
    }

    // Sélectionner la réponse cliquée comme la bonne réponse
    this.reponses[questionIndex][reponseIndex] = 'correct';

    console.log(this.reponses[questionIndex][reponseIndex] == 'correct');

    // Réinitialiser les classes 'checked' des réponses
    const reponsesElements = document.getElementsByClassName('reponse');
    console.log(reponsesElements);
    for(let i = 0; i < reponsesElements.length; i++) {
      reponsesElements[i].classList.remove('checked');
    }

    for (let i = 0; i < reponsesElements.length; i++) {
      if(reponsesElements[i].textContent === 'm') {
        reponsesElements[i].classList.add('checked');
      }
    }
  }*/

  selectionnerBonneReponse(questionIndex: number, reponseIndex: number) {

    //On détermine l'indice de la bonne réponse si on met toutes les réponses de toutes les questions dans une même liste
    //On détermine l'indice de la quesion de la réponse sélectionnée
    //On détermine l'indice de la réponse sélectionnée au sein de la question dont elle fait partie
    let positionReponse = 0;
    let indiceQuestionBonneReponse = 0;
    let indiceReponse = 0;
    for(let qIndex = 0; qIndex < this.questions.length; qIndex++) {
      for(let rIndex = 0; rIndex < this.reponses[qIndex].length; rIndex++) {
        if(questionIndex > qIndex) {
          positionReponse++;
        }
        else if(questionIndex >= qIndex) {
          if(reponseIndex > rIndex) {
            positionReponse++;
            indiceReponse = rIndex + 1;
            indiceQuestionBonneReponse = qIndex;
          }
        }
      }
    }

    //On détermine la longueur de la question à laquelle appartient la réponse sélectionnée
    let longueurQuestionBonneReponse = this.reponses[indiceQuestionBonneReponse].length;
    
    const reponsesElements = document.getElementsByClassName('reponse');
    console.log(reponsesElements);
    for(let i = 0; i < longueurQuestionBonneReponse; i++) {
      reponsesElements[positionReponse - indiceReponse + i].classList.remove('checked');
    }
    reponsesElements[positionReponse].classList.add('checked');
  }


}
