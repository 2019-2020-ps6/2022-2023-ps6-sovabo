import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";

@Component({
  selector: 'app-slider-animateur-speed',
  templateUrl: './slider-animateur-speed.component.html',
  styleUrls: ['./slider-animateur-speed.component.scss']
})
export class SliderAnimateurSpeedComponent {
  public position: number ;

  constructor(private animateurService: AnimateurService) {
    this.position = this.animateurService.positionCursorSlider;
  }


  onDurationChange() {
    this.animateurService.positionCursorSlider = this.position;
    // @ts-ignore
    this.animateurService.duration = `${(this.position-10)*(-1)}s`;
  }
}
