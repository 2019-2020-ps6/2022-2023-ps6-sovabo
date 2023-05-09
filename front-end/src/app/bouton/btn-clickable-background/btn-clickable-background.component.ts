import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-clickable-background',
  templateUrl: './btn-clickable-background.component.html',
  styleUrls: ['./btn-clickable-background.component.scss']
})
export class BtnClickableBackgroundComponent {

  //PARTIE GESTION DU CONTRASTE
  constructor(private jeuxCouleursService: JeuxCouleursService){}
  contrasteTroubleEnable :boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  fontSelected : string = this.jeuxCouleursService.getFontSelectedString();

  ngOnChanges() {
    this.contrasteTroubleEnable = this.jeuxCouleursService.getVisionAttentionStatus();
  }

  ngOnInit() {
  }

  changeContrast(){
    let tabContainer = document.querySelectorAll('[id=contrastUpContainer]');
    let tabText = document.querySelectorAll('[id=contrastUpText]');

    if(this.contrasteTroubleEnable){
      if(tabContainer != null){
        tabContainer.forEach(element => {
          element.classList.add('contrastUpContainer');
        });
      }
      if(tabText != null){
        tabText.forEach(element => {
          element.classList.add('contrastUpText');
        });
      }
    }
    else{
      if(tabContainer != null){
        tabContainer.forEach(element => {
          element.classList.remove('contrastUpContainer');
        });
      }
      if(tabText != null){
        tabText.forEach(element => {
          element.classList.remove('contrastUpText');
        });
      }
    }
  }

}
