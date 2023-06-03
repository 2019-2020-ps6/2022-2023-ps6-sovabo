import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-clickable-frame-background',
  templateUrl: './btn-clickable-frame-background.component.html',
  styleUrls: ['./btn-clickable-frame-background.component.scss']
})
export class BtnClickableFrameBackgroundComponent {

  constructor(private jeuxCouleursService: JeuxCouleursService){}
  contrasteTroubleEnable :boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  ngOnChanges() {
    this.contrasteTroubleEnable = this.jeuxCouleursService.getVisionAttentionStatus();
    this.changeContrast();
  }

  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
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
