import { Component } from '@angular/core';
import {AnimateurService} from "../../../../service/animateur.service";

@Component({
  selector: 'app-btn-on-off-animateur',
  templateUrl: './btn-on-off-animateur.component.html',
  styleUrls: ['./btn-on-off-animateur.component.scss']
})
export class BtnOnOffAnimateurComponent {
  isOn: boolean = false;

  constructor(private animateurService: AnimateurService) {
  }

  ngOnInit() {
    this.isOn = this.animateurService.getAnimateur();
  }

  toggleState() {
    this.isOn = !this.isOn;
  }
}
