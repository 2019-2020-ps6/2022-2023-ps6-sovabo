import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../service/quizz.service';
import { Quiz } from '../../../models/quizz.model';
import {AnimationsService} from "../../../service/animations.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {User} from "../../../models/user.model";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-listes-quizz',
  templateUrl: './listes-quizz.component.html',
  styleUrls: ['./listes-quizz.component.scss']
})
export class ListesQuizzComponent {

  public quizList: Quiz[] = [];
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  private userCourant: any;
  constructor(private quizService: QuizService, public animationsService: AnimationsService, private jeuxCouleursService: JeuxCouleursService,private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.userService.updateAll();
    this.userCourant = this.userService.getUserCourant();
    await this.loadConfig();

    this.quizList = this.quizService.getData();
    this.jeuxCouleursService.setUpdateDocument(true);
  }

  loadConfig(){
    this.jeuxCouleursService.setFontWithString(this.userService.getUserCourant()?.configuration.police || this.jeuxCouleursService.listTrouble[3]);
    this.jeuxCouleursService.setVisionColor(this.userService.getUserCourant()?.configuration.jeuCouleur || -1);
    this.jeuxCouleursService.setAttentionColor(this.userService.getUserCourant()?.configuration.contraste || false);
  }

  ngAfterViewInit(){
  }

  ngAfterContentChecked(){
    this.jeuxCouleursService.updateDoc(document);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  isAnotherHovered(quiz: Quiz): boolean {
    for (let q of this.quizList) {
      if (q !== quiz && q.hovered) {
        return true;
      }
    }
    return false;
  }

}
