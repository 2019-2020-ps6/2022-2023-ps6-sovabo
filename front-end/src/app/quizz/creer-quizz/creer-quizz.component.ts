import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {Quiz} from "../../../models/quizz.model"
import {Question, Answer} from "../../../models/question.model";
import {QuizService} from "../../../service/quizz.service";

@Component({
  selector: 'app-creer-quizz',
  templateUrl: './creer-quizz.component.html',
  styleUrls: ['./creer-quizz.component.scss']
})
export class CreerQuizzComponent {

  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  constructor(private jeuxCouleursService: JeuxCouleursService, public quizService: QuizService) {
  }

  questionsQuiz: string[] = ['', ''];
  reponsesQuiz: string[][] = [['', ''], ['', '']];
  correctArray: boolean[] = [];

  ngOnInit() {
    for (let i = 0; i < 4; i++) {
      this.correctArray.push(false);
    }
    console.log(this.correctArray)

    if (this.jeuxCouleursService.isDefaultActive) {
      this.jeuxCouleursService.collectDefaultStyles();
    }
    else {
      this.jeuxCouleursService.changeFont(document);
    }
  }

  ngAfterViewInit(){
    this.jeuxCouleursService.changeFontSize(document);
  }

  ajouterQuestion() {
    this.questionsQuiz.push('');
    this.reponsesQuiz.push(['', '']);
    this.questions.push('');
    this.reponses.push([]);

    this.correctArray.push(false, false)
    console.log(this.correctArray)
  }

  ajouterReponse(index: number) {
    this.reponsesQuiz[index].push('');
    this.reponses[index].push('');

    let nombreReponses: number = 0;
    for(let i = 0; i < this.questionsQuiz.length; i++) {
      for(let j = 0; j < this.reponsesQuiz[i].length; j++) {
        nombreReponses++;
      }
    }

    this.correctArray.push(false);

    if(index < this.questionsQuiz.length - 1) {   //On regarde si l'on ajoute une réponse à la dernière question, auquel cas on a juste a push un false en fin de tableau comme on vient de le faire
      for(let i = this.questionsQuiz.length - 1; i > index; i--) {    //Dans ce cas, on décale tous les booléen vers la droite pour inclure le false à la bonne place
        for(let j = 0; j < this.reponsesQuiz[i].length; j++) {
          this.correctArray[nombreReponses - j - 1] = this.correctArray[nombreReponses - j - 2];
        }
        if(index == i - 1) {
          this.correctArray[nombreReponses - this.reponsesQuiz[i].length - 1] = false;
        }
        nombreReponses -= this.reponsesQuiz[i].length;
      }
    }

    console.log(this.correctArray);

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

    while(this.correctArray.length < reponsesElements.length) {
      this.correctArray.push(false);
    }

    for(let i = 0; i < longueurQuestionBonneReponse; i++) {
      reponsesElements[positionReponse - indiceReponse + i].classList.remove('checked');
      this.correctArray[positionReponse - indiceReponse + i] = false;
    }
    reponsesElements[positionReponse].classList.add('checked');
    this.correctArray[positionReponse] = true;
    console.log(this.correctArray);
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

  convertReponsesToAnswer(index: number) {
    let nombreReponses: number = 0;
    for(let i = 0; i < index; i++) {
      nombreReponses += this.reponsesQuiz[i].length;
    }
    let listeReponses: Answer[] = [];
    for (let j = 0; j < this.reponses[index].length; j++) {
      const answer: Answer = {
        value: this.reponses[index][j],
        isCorrect: this.correctArray[nombreReponses]
      };
      nombreReponses++;
      listeReponses.push(answer);
    }
    return listeReponses;
  }
  associateAnswersToQuestions() {
    let listeQuestions: Question[] = [];
    for(let i = 0; i < this.questions.length; i++) {
      const question: Partial<Question> = {
        label: this.questions[i],
        answers: this.convertReponsesToAnswer(i)
      }
      listeQuestions.push(<Question>question);
    }
    console.log(listeQuestions);
    return listeQuestions;
  }

  async createQuiz(): Promise<void> {
    // Récupérer les valeurs du formulaire
    if (this.titreQuiz && this.descriptionQuiz && this.difficultyQuiz && this.questions && this.reponses && this.imageURL) {
      const quizData: Partial<Quiz> = {
        name: this.titreQuiz,
        desc: this.descriptionQuiz,
        difficulty: this.difficultyQuiz,
        questions: this.associateAnswersToQuestions(),
        image: this.imageURL
        // Ajoutez d'autres propriétés du quiz ici (photo, difficulté, etc.)
      };

      const quiz = await this.quizService.createQuiz(quizData);

      // Envoyer les données du quiz à votre backend ou effectuer d'autres actions nécessaires
      console.log(quizData);
    }
  }

}
