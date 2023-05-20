import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { JeuxCouleursService } from "../../../../service/jeux-couleurs.service";
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../service/updateMessenger.service';

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
    private Service: CommonService
  ) {
    this.subscriptionName = this.Service.getUpdate().subscribe((message: any) => {
      this.messageReceived = message;
    });
  }

  get buttonClass() {
    const visionColor = this.getVisionColorSelected();
    if (visionColor === 0) {
      return 'TRICHROMATIE';
    } else if (visionColor === 1) {
      return 'DICHROMATISME';
    } else {
      return '';
    }

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
