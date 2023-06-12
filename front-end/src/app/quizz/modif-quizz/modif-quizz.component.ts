import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {QuizService} from "../../../service/quizz.service";
import {Answer, Question} from "../../../models/question.model";
import {Quiz} from "../../../models/quizz.model";
import { Router } from '@angular/router';
import {AuthService} from "../../../service/authentification.service";

@Component({
  selector: 'app-modif-quizz',
  templateUrl: './modif-quizz.component.html',
  styleUrls: ['./modif-quizz.component.scss']
})
export class ModifQuizzComponent {

  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  showModalAuth: boolean | undefined;
  correctAccessCode: string | undefined;
  isAccessing: boolean | undefined;
  isAppearing: boolean | undefined;
  constructor(private jeuxCouleursService: JeuxCouleursService, public quizService: QuizService,private authService: AuthService, private router: Router) {

  }
  quizCourant: Quiz = this.quizService.getQuizCourant();

  questionsQuiz: string[] = [];     // Cette variable sert uniquement à représenter le nombre de div nécessires pour les questions, elle ne contient pas de données
  reponsesQuiz: string[][] = [];    // Idem, mais pour les réponses

  correctArray: boolean[] = [];
  titreQuiz: string = '';
  descriptionQuiz: string = '';
  difficultyQuiz: number = 0;
  questions: string[] = [];         // Tableau contenant à la suite le titre de toutes les questions
  reponses: string[][] = [];        // Tableau de tableau contenant à la suite toutes les réponses de chaque question, avec un tableau par question
  listeObjetsQuestion: any;
  imageURL: string = '';

  currentColor: string = '';
  selectedIndex: number = 0;

  ngOnInit() {
    this.loadData().then();
    this.showModalAuth = !this.authService.getAuthenticationStatus();
    this.isAppearing = true;
    this.authService.getCorrectAccessCode().subscribe(code => {
      this.correctAccessCode = code;
    });

    if (this.showModalAuth) {
      setTimeout(() => {
        this.isAppearing = false;
      }, 600);
    }
    this.jeuxCouleursService.setUpdateDocument(true);
  }

  async loadData() {
    this.titreQuiz = this.quizCourant.name;
    this.descriptionQuiz = this.quizCourant.desc;
    this.difficultyQuiz = this.quizCourant.difficulty;
    this.imageURL = this.quizCourant.image;
    this.listeObjetsQuestion = await this.quizService.loadQuestionsFromQuiz(this.quizCourant.id);
    console.log(this.listeObjetsQuestion)
    for(let i = 0; i < this.listeObjetsQuestion.length; i++) {
      this.questions.push(this.listeObjetsQuestion[i].label);
      let temporaryListeQuestions: string[] = [];
      for(let j = 0; j < this.listeObjetsQuestion[i].answers.length; j++) {
        temporaryListeQuestions.push(this.listeObjetsQuestion[i].answers[j].value);
        this.correctArray.push(this.listeObjetsQuestion[i].answers[j].isCorrect)
      }
      this.reponses.push(temporaryListeQuestions);
    }

    for(let i = 0; i < this.questions.length; i++) {
      this.questionsQuiz.push('')
      this.reponsesQuiz.push([])
      for(let j = 0; j < this.reponses[i].length; j++) {
        this.reponsesQuiz[i].push('')
      }
    }

    this.currentColor = this.getDifficultyFromColor(this.difficultyQuiz);
    this.selectedIndex = this.difficultyQuiz;

    setTimeout(() => {
      const reponsesElementsInitialization = document.getElementsByClassName('reponse-bubble')
      for(let i = 0; i < reponsesElementsInitialization.length; i++) {
        if(this.correctArray[i] == true) {
          reponsesElementsInitialization[i].classList.add('checked');
        }
      }
    });
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

// Ajoutez une méthode pour gérer le clic et la mise à jour de la couleur
  onClickChangeColor(i: number) {
    this.selectedIndex = i;
    this.currentColor = this.getDifficultyFromColor(i);
    this.difficultyQuiz = i;
  }

  getDifficultyFromColor(index: number): string {
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

  convertReponsesToAnswer(index: number) {
    let nombreReponses: number = 0;
    for(let i = 0; i < index; i++) {
      nombreReponses += this.reponsesQuiz[i].length;
    }
    let listeReponses: Answer[] = [];
    for (let j = 0; j < this.reponses[index].length; j++) {
      if(typeof this.listeObjetsQuestion[index]?.answers[j]?.id === 'undefined') {
        const answer: Answer = {
          value: this.reponses[index][j],
          isCorrect: this.correctArray[nombreReponses]
        };
        nombreReponses++;
        listeReponses.push(answer);
      } else {
        const answer: Answer = {
          value: this.reponses[index][j],
          isCorrect: this.correctArray[nombreReponses],
          id: this.listeObjetsQuestion[index].answers[j].id
        };
        nombreReponses++;
        listeReponses.push(answer);
      }
    }
    return listeReponses;
  }
  associateAnswersToQuestions() {
    let listeQuestions: Question[] = [];
    for(let i = 0; i < this.questions.length; i++) {
      if(typeof this.listeObjetsQuestion[i]?.id === 'undefined') {
        const question: Partial<Question> = {
          label: this.questions[i],
          answers: this.convertReponsesToAnswer(i)
        }
        listeQuestions.push(<Question>question);
      } else {
        console.log("Tout va bien");
        const question: Partial<Question> = {
          label: this.questions[i],
          answers: this.convertReponsesToAnswer(i),
          id: this.listeObjetsQuestion[i].id
        }
        listeQuestions.push(<Question>question);
      }
    }
    console.log(listeQuestions);
    return listeQuestions;
  }

  async updateQuiz(): Promise<void> {
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

      console.log(quizData);
      const quiz = await this.quizService.updateQuiz(quizData, this.quizCourant.id);
    }
  }

  async supprimerQuiz() {
    const quiz = await this.quizService.deleteQuiz((this.quizCourant.id));
    this.toggleAuthenticate();
    await this.router.navigate(['/liste-quizz']);
  }

  async submitAndRedirect() {
    await this.updateQuiz();
    this.toggleAuthenticate();
    await this.router.navigate(['/liste-quizz']);
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
}
