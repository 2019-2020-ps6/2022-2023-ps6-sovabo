import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-polyquiz-text',
  templateUrl: './btn-polyquiz-text.component.html',
  styleUrls: ['./btn-polyquiz-text.component.scss']
})
export class BtnPolyquizTextComponent {
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  ngOnInit(){
  }
  constructor(private jeuxCouleursService: JeuxCouleursService) {
  }

  getVisionColorSelected(){
    return this.jeuxCouleursService.getVisionColorSelected();
  }



}
