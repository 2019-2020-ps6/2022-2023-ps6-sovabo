import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";
import {CommonService} from "../../../../service/updateMessenger.service";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-btn-font',
  templateUrl: './btn-font.component.html',
  styleUrls: ['./btn-font.component.scss']
})
export class BtnFontComponent {

  //GESTION TROUBLES
  isOn: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  //GESTION DE NOTIFICATION
  messageReceived: any;
  private subscriptionName: Subscription; //important to create a subscription
  constructor(private jeuxCouleursService: JeuxCouleursService,
              private Service: CommonService,
              private userService: UserService) {

    // subscribe to sender component messages
    this.subscriptionName= this.Service.getUpdate().subscribe
    ((message: any) => { //message contains the data sent from service
      this.messageReceived = message;

    });
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

  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.subscriptionName.unsubscribe();
  }
  get buttonClass() {
    const visionColor = this.getVisionColorSelected();
    if (visionColor === 0) {
      return 'DEUTERANOMALIE';
    } else if (visionColor === 1) {
      return 'TRITANOPIE';
    } else {
      return '';
    }

  }
  getVisionColorSelected(){
    return this.jeuxCouleursService.getVisionColorSelected();
  }

}
