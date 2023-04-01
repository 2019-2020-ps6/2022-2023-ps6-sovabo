import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-config-attention',
  templateUrl: './config-attention.component.html',
  styleUrls: ['./config-attention.component.scss']
})
export class ConfigAttentionComponent {
  animations: boolean = false;
  animateur: boolean = false;
  jeuxCouleurs: boolean = false;

  //type de trouble de la vision
  contrasteTroubleEnable: boolean = false;


  constructor(private animationsService: AnimationsService, private animateurService: AnimateurService, private jeuxCouleursService: JeuxCouleursService) {
  }

  ngOnInit(): void {
    this.animations = this.animationsService.isAnimated;
    this.animateur = this.animateurService.getAnimateur();
    this.contrasteTroubleEnable = this.jeuxCouleursService.getVisionAttentionStatus();
    this.changeContrast();
  }
  toggleAnimations() {
    this.animations = !this.animations;
    this.animationsService.setAnimations(this.animations);
  }

  toggleAnimateur() {
    this.animateur = !this.animateur;
    this.animateurService.setAnimateur(this.animateur);
  }

  toggleContrastColor(event: Event | null) {
    this.contrasteTroubleEnable = !this.contrasteTroubleEnable
    console.log('jeu contraste :'+this.contrasteTroubleEnable);
    this.jeuxCouleursService.setAttentionColor(this.contrasteTroubleEnable);
    this.changeContrast();
  }


  changeContrast(){
    console.log('changeContrast');
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
