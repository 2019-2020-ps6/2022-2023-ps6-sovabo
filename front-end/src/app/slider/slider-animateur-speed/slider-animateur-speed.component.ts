import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";

@Component({
  selector: 'app-slider-animateur-speed',
  templateUrl: './slider-animateur-speed.component.html',
  styleUrls: ['./slider-animateur-speed.component.scss']
})
export class SliderAnimateurSpeedComponent {
  public duration: string | undefined ;

  constructor(private animateurService: AnimateurService) {
    this.duration = this.animateurService.duration;
  }


  onDurationChange() {
    // @ts-ignore
    this.animateurService.duration = `${(this.duration-10)*(-1)}s`;
  }
}
