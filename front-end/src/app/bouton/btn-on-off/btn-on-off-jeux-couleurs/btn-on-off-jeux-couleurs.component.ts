import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-btn-on-off-jeux-couleurs',
  templateUrl: './btn-on-off-jeux-couleurs.component.html',
  styleUrls: ['./btn-on-off-jeux-couleurs.component.scss']
})
export class BtnOnOffJeuxCouleursComponent {
  isOn: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  constructor(private jeuxCouleursService: JeuxCouleursService,private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.contrasteTroubleEnable = user.configuration.contraste;
      }
    });
  }

  ngOnInit() {
    this.isOn = this.jeuxCouleursService.IsAttentionColorActivated();
  }

  toggleState() {
    this.isOn = !this.isOn;
  }

  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }

}
