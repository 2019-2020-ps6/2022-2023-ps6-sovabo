import { Component } from '@angular/core';
import {AnimationsService} from "../../../../service/animations.service";

@Component({
  selector: 'app-btn-on-off-animations',
  templateUrl: './btn-on-off-animations.component.html',
  styleUrls: ['./btn-on-off-animations.component.scss']
})
export class BtnOnOffAnimationsComponent {
  isOn: boolean = false;

  constructor(private animationsService: AnimationsService) {
  }

  ngOnInit() {
    this.isOn = this.animationsService.getAnimations();
  }

  toggleState() {
    this.isOn = !this.isOn;
  }
}
