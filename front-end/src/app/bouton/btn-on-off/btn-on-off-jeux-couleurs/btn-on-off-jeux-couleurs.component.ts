import { Component } from '@angular/core';
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";

@Component({
  selector: 'app-btn-on-off-jeux-couleurs',
  templateUrl: './btn-on-off-jeux-couleurs.component.html',
  styleUrls: ['./btn-on-off-jeux-couleurs.component.scss']
})
export class BtnOnOffJeuxCouleursComponent {
  isOn: boolean = false;

  constructor(private jeuxCouleursService: JeuxCouleursService) {
  }

  ngOnInit() {
    this.isOn = this.jeuxCouleursService.getJeuxCouleurs();
  }

  toggleState() {
    this.isOn = !this.isOn;
  }
}
