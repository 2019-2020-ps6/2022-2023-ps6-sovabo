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

  selectionnerBonneReponse(event: any) {
    let currentreponses = document.getElementsByClassName("reponse");
    let arr = Array.from(currentreponses);
    if(!arr.includes(event.target)) return;
    for(let i = 0; i < currentreponses.length; i++) {
      currentreponses[i].classList.remove("checked");
    }
    event.target.classList.add("checked");
    event.stopPropagation();
  }


}
