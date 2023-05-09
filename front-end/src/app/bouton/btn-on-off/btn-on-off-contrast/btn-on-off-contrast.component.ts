import { Component } from '@angular/core';
import {AnimateurService} from "../../../../service/animateur.service";
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-on-off-contrast',
  templateUrl: './btn-on-off-contrast.component.html',
  styleUrls: ['./btn-on-off-contrast.component.scss']
})
export class BtnOnOffContrastComponent {
  isOn: boolean = false;
  contrasteTroubleEnable :boolean = this.jeuxCouleursService.getVisionAttentionStatus();


  constructor(private animateurService: AnimateurService,private jeuxCouleursService: JeuxCouleursService) {
  }

  ngOnInit() {
    this.isOn = this.animateurService.getAnimateur();
  }

  toggleState() {
    this.isOn = !this.isOn;
  }

}
