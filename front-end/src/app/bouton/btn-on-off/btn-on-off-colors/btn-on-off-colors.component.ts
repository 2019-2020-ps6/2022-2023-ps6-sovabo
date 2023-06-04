import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { JeuxCouleursService } from "../../../../service/jeux-couleurs.service";
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../service/updateMessenger.service';
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-btn-on-off-colors',
  templateUrl: './btn-on-off-colors.component.html',
  styleUrls: ['./btn-on-off-colors.component.scss']
})
export class BtnOnOffColorsComponent {
  isOn: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  messageReceived: any;
  private subscriptionName: Subscription;

  constructor(
    private jeuxCouleursService: JeuxCouleursService,
    private Service: CommonService,
    private userService: UserService

  ) {
    this.subscriptionName = this.Service.getUpdate().subscribe((message: any) => {
      this.messageReceived = message;
    });

    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.contrasteTroubleEnable = user.configuration.contraste;
      }
    });
  }

  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }


  toggleState() {
    this.isOn = !this.isOn;
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  getVisionColorSelected() {
    return this.jeuxCouleursService.getVisionColorSelected();
  }
}
