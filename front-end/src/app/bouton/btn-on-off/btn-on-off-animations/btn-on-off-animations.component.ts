import { Component } from '@angular/core';
import {AnimationsService} from "../../../../service/animations.service";
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-on-off-animations',
  templateUrl: './btn-on-off-animations.component.html',
  styleUrls: ['./btn-on-off-animations.component.scss']
})
export class BtnOnOffAnimationsComponent {

  isOn: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();


  constructor(private animationsService: AnimationsService,private jeuxCouleursService: JeuxCouleursService) {
  }

  ngOnInit() {
    this.isOn = this.animationsService.isAnimated;
  }

  toggleState() {
    this.isOn = !this.isOn;
  }

  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }
}
