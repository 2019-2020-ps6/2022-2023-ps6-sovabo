import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-btn-list-quiz',
  templateUrl: './btn-list-quiz.component.html',
  styleUrls: ['./btn-list-quiz.component.scss']
})
export class BtnListQuizComponent {
  contrasteTroubleEnable :boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  constructor(private jeuxCouleursService: JeuxCouleursService, private userService: UserService){
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.contrasteTroubleEnable = user.configuration.contraste;
      }
    });
  }

  ngOnInit() {
  }




  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }


}
