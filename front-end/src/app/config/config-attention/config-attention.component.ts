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


  constructor(private animationsService: AnimationsService, private animateurService: AnimateurService, private jeuxCouleursService: JeuxCouleursService) {
  }

  ngOnInit(): void {
    this.animations = this.animationsService.getAnimations();
    this.animateur = this.animateurService.getAnimateur();
    this.jeuxCouleurs = this.jeuxCouleursService.getJeuxCouleurs();
  }
  toggleAnimations() {
    this.animations = !this.animations;
    this.animationsService.setAnimations(this.animations);
  }

  toggleAnimateur() {
    this.animateur = !this.animateur;
    this.animateurService.setAnimateur(this.animateur);
  }

  toggleJeuxCouleurs() {
    this.jeuxCouleurs = !this.jeuxCouleurs;
    this.jeuxCouleursService.setJeuxCouleurs(this.jeuxCouleurs);
  }

}
