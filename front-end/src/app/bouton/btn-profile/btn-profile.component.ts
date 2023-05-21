import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-profile',
  templateUrl: './btn-profile.component.html',
  styleUrls: ['./btn-profile.component.scss']
})

export class BtnProfilUserComponent {
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  ngOnInit(){
  }
  constructor(private jeuxCouleursService: JeuxCouleursService) {
  }



}
