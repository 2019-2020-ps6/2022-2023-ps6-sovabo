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

}
