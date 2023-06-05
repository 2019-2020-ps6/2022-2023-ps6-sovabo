import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-btn-clickable-background',
  templateUrl: './btn-clickable-background.component.html',
  styleUrls: ['./btn-clickable-background.component.scss']
})
export class BtnClickableBackgroundComponent {

  //PARTIE GESTION DU CONTRASTE
  constructor(private jeuxCouleursService: JeuxCouleursService, private userService: UserService){
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.contrasteTroubleEnable = user.configuration.contraste;
        this.fontSelected = user.configuration.police;
      }
    });
  }
  contrasteTroubleEnable :boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  fontSelected : string = this.jeuxCouleursService.getFontSelectedString();

  ngOnChanges() {
    this.contrasteTroubleEnable = this.jeuxCouleursService.getVisionAttentionStatus();
  }

  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }

  ngOnInit() {
  }

}
