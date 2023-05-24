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

  afficherFichier() {
    const input = document.getElementById("recup-fichier") as HTMLInputElement;
    const file = input.files?.[0];
    const stockImage = document.getElementById("image-quiz-id") as HTMLDivElement;
    const imageElement = document.createElement('img');
    imageElement.style.height = "100%";
    imageElement.style.width = "100%";
    imageElement.style.objectFit = "contain";

    const reader = new FileReader();
    reader.onload = () => {
      imageElement.src = reader.result as string;
    }
    reader.readAsDataURL(file as Blob);

    for(let i = 0; i < stockImage.children.length; i++) {
      if(stockImage.children[i] != input) {
        stockImage.children[i].remove();
        i = 0;
      }
    }

    stockImage.prepend(imageElement);
    imageElement.addEventListener('click', function() {
      input.click();
    });
  }

}
