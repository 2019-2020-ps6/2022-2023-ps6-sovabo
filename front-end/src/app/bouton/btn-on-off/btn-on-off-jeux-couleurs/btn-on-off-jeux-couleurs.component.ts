import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-on-off-jeux-couleurs',
  templateUrl: './btn-on-off-jeux-couleurs.component.html',
  styleUrls: ['./btn-on-off-jeux-couleurs.component.scss']
})
export class BtnOnOffJeuxCouleursComponent {
  isOn: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  constructor(private jeuxCouleursService: JeuxCouleursService,) {
  }

  ngOnInit() {
    this.isOn = this.jeuxCouleursService.IsAttentionColorActivated();
  }

  toggleState() {
    this.isOn = !this.isOn;
  }

}
