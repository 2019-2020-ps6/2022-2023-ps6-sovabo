import {Component, ViewEncapsulation} from '@angular/core';
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";

import {Subscription} from 'rxjs';
import {CommonService} from '../../../../service/updateMessenger.service';

@Component({
  selector: 'app-btn-on-off-colors',
  templateUrl: './btn-on-off-colors.component.html',
  styleUrls: ['./btn-on-off-colors.component.scss']
})

export class BtnOnOffColorsComponent {

  //GESTION TROUBLES
  isOn: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();


  //GESTION DE NOTIFICATION
  messageReceived: any;
  private subscriptionName: Subscription; //important to create a subscription
  constructor(private jeuxCouleursService: JeuxCouleursService,
              private Service: CommonService) {

    // subscribe to sender component messages
    this.subscriptionName= this.Service.getUpdate().subscribe
    ((message: any) => { //message contains the data sent from service
      this.messageReceived = message;
      //console.log(message);
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

  getVisionColorSelected(){
    return this.jeuxCouleursService.getVisionColorSelected();
  }

}
