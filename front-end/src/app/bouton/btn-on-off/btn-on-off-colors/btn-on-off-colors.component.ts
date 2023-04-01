import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-on-off-colors',
  templateUrl: './btn-on-off-colors.component.html',
  styleUrls: ['./btn-on-off-colors.component.scss']
})

export class BtnOnOffColorsComponent {

  isOn: boolean = false;

  constructor(private jeuxCouleursService: JeuxCouleursService) {
  }

  ngOnInit() {
    this.isOn = this.jeuxCouleursService.IsAttentionColorActivated();
  }

  toggleState() {
    this.isOn = !this.isOn;
  }

}
