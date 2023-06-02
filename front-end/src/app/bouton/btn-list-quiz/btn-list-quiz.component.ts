import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-list-quiz',
  templateUrl: './btn-list-quiz.component.html',
  styleUrls: ['./btn-list-quiz.component.scss']
})
export class BtnListQuizComponent {
  constructor(private jeuxCouleursService: JeuxCouleursService){}

  ngOnInit() {
  }

  contrasteTroubleEnable :boolean = this.jeuxCouleursService.getVisionAttentionStatus();


  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }


}
