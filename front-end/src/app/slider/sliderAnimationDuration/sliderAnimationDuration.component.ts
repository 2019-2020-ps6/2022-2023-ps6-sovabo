import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";

@Component({
  selector: 'app-sliderAnimationDuration',
  templateUrl: './sliderAnimationDuration.component.html',
  styleUrls: ['./sliderAnimationDuration.component.scss']
})
export class SliderAnimationDurationComponent {
  public duration: string | undefined ;

  constructor(private animationsService: AnimationsService) {
    this.duration = this.animationsService.duration;
  }


  onDurationChange() {
    // @ts-ignore
    this.animationsService.duration = `${(this.duration-10)*(-1)}s`;
  }

}
