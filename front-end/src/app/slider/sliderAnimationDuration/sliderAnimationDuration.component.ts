import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";

@Component({
  selector: 'app-sliderAnimationDuration',
  templateUrl: './sliderAnimationDuration.component.html',
  styleUrls: ['./sliderAnimationDuration.component.scss']
})
export class SliderAnimationDurationComponent {
  public position: number;


  constructor(private animationsService: AnimationsService) {
    this.position = this.animationsService.positionCursorSlider;
  }


  onDurationChange() {
    this.animationsService.positionCursorSlider = this.position;
    // @ts-ignore
    this.animationsService.duration = `${(this.position-10)*(-1)}s`;
  }

}
