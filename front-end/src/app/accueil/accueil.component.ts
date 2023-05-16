import { Component } from '@angular/core';
import { JeuxCouleursService } from 'src/service/jeux-couleurs.service';
import {AnimateurService} from "../../service/animateur.service";
import {AnimationsService} from "../../service/animations.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  AttentionColorStatus: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  ngInit() {
  }

  constructor(private jeuxCouleursService: JeuxCouleursService,private animateurService: AnimateurService, private animationsService : AnimationsService) {}

  ngOnInit(): void {
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    this.jeuxCouleursService.changeFont(document);
    this.jeuxCouleursService.changeFontSize(document);
  }


  getAnimateur() {
    return this.animateurService.getAnimateur();
  }

  getAnimations() {
    return this.animationsService.isAnimated;
  }

  getDuration() {
    return this.animationsService.duration;
  }

  getDelay() {
    return this.animationsService.delay != undefined ? this.animationsService.delay : 0;
  }
}
