import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {Quiz} from "../../../models/quizz.model"
import {Question, Answer} from "../../../models/question.model";

@Component({
  selector: 'app-creer-quizz',
  templateUrl: './creer-quizz.component.html',
  styleUrls: ['./creer-quizz.component.scss']
})
export class CreerQuizzComponent {

  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  constructor(private jeuxCouleursService: JeuxCouleursService) {
  }

  questionsQuiz: string[] = ['', ''];
  reponsesQuiz: string[][] = [['', ''], ['', '']];

  ajouterQuestion() {
    this.questionsQuiz.push('');
    this.reponsesQuiz.push(['', '']);
    this.questions.push('');
    this.reponses.push([]);
  }

  ajouterReponse(index: number) {
    this.reponsesQuiz[index].push('');
    this.reponses[index].push('');
  }

  selectionnerBonneReponse(questionIndex: number, reponseIndex: number) {

    //On détermine l'indice de la bonne réponse si on met toutes les réponses de toutes les questions dans une même liste
    //On détermine l'indice de la quesion de la réponse sélectionnée
    //On détermine l'indice de la réponse sélectionnée au sein de la question dont elle fait partie
    let positionReponse = 0;
    let indiceQuestionBonneReponse = 0;
    let indiceReponse = 0;
    for(let qIndex = 0; qIndex < this.questionsQuiz.length; qIndex++) {
      for(let rIndex = 0; rIndex < this.reponsesQuiz[qIndex].length; rIndex++) {
        if(questionIndex > qIndex) {
          positionReponse++;
        }
        else if(questionIndex >= qIndex) {
          indiceQuestionBonneReponse = qIndex;
          if(reponseIndex > rIndex) {
            positionReponse++;
            indiceReponse = rIndex + 1;
          }
        }
      }
    }

    //On détermine la longueur de la question à laquelle appartient la réponse sélectionnée
    let longueurQuestionBonneReponse = this.reponsesQuiz[indiceQuestionBonneReponse].length;

    const reponsesElements = document.getElementsByClassName('reponse-bubble');

    for(let i = 0; i < longueurQuestionBonneReponse; i++) {
      reponsesElements[positionReponse - indiceReponse + i].classList.remove('checked');
    }
    reponsesElements[positionReponse].classList.add('checked');
  }

  afficherFichier() {
    const input = document.getElementById("recup-fichier") as HTMLInputElement;
    const file = input.files?.[0];

    const reader = new FileReader();
    reader.onload = () => {
      const stockImage = document.getElementById("image-quiz-id") as HTMLDivElement;
      const imageElement = document.createElement('img');
      imageElement.src = reader.result as string;
      imageElement.style.height = "100%";
      imageElement.style.width = "100%";
      imageElement.style.objectFit = "contain";

      // Supprimer les anciennes images
      for (let i = 0; i < stockImage.children.length; i++) {
        if (stockImage.children[i] !== input) {
          stockImage.children[i].remove();
          i = 0;
        }
      }

      // Ajouter la nouvelle image
      stockImage.prepend(imageElement);
      imageElement.addEventListener('click', function() {
        input.click();
      });
      this.imageURL = imageElement.src;

      // Ajoutez ici d'autres actions nécessaires avec l'image
    };

    reader.readAsDataURL(file as Blob);
  }

  // Déclarez une variable pour stocker la couleur actuelle
  currentColor: string = "rgba(46, 49, 54, 0.6)";
  selectedIndex: number = 0;

// Ajoutez une méthode pour gérer le clic et la mise à jour de la couleur
  onClickChangeColor(i: number) {
    this.selectedIndex = i;
    this.currentColor = this.getDifficultyColor(i);
    this.difficultyQuiz = i;
  }

  getDifficultyColor(index: number): string {
    switch (index) {
      case(1) :
        return '#00ff00'; // Vert
      case(2) :
        return '#99ff33'; // Vert clair
      case(3) :
        return'#ffff00'; // Jaune
      case(4) :
        return '#ff6600'; // Orange
      default :
        return '#ff0000'; // Rouge
    }
  }

  titreQuiz: string = '';
  descriptionQuiz: string = '';
  difficultyQuiz: number = 0;
  questions: string[] = [];
  reponses: string[][] = [[], []];
  imageURL: string = '';

  async createQuiz(): Promise<void> {
    // Récupérer les valeurs du formulaire
    if (this.titreQuiz && this.descriptionQuiz && this.difficultyQuiz && this.questions && this.reponses && this.imageURL) {
      const quizData = {
        titre: this.titreQuiz,
        description: this.descriptionQuiz,
        difficulte: this.difficultyQuiz,
        questions: this.questions,
        reponses: this.reponses,
        imageURL: this.imageURL
        // Ajoutez d'autres propriétés du quiz ici (photo, difficulté, etc.)
      };

      // Envoyer les données du quiz à votre backend ou effectuer d'autres actions nécessaires
      console.log(quizData);
    }
  }

}
