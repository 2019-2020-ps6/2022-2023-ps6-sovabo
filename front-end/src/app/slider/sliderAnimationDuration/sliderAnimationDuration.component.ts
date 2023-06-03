import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";
import { UserService } from 'src/service/user.service';


@Component({
  selector: 'app-sliderAnimationDuration',
  templateUrl: './sliderAnimationDuration.component.html',
  styleUrls: ['./sliderAnimationDuration.component.scss']
})
export class SliderAnimationDurationComponent {
  public position: number | undefined;


  constructor(private animationsService: AnimationsService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig(){
    this.position = this.userService.getUserCourant()?.configuration.sliderPosition;

  }

  onDurationChange() {
    if(this.position){
      this.animationsService.positionCursorSlider.next(this.position);
    }
    // @ts-ignore
    this.animationsService.duration = `${(this.position-10)*(-1)}s`;
    if(this.position){
      this.animationsService.delay = (this.position-8)/(-10);
    }
  }

}
