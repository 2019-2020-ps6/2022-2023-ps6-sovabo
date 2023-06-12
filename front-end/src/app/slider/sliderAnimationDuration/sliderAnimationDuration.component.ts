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

  async onDurationChange() {
    // Votre code existant
    if(this.position){
      this.animationsService.positionCursorSlider.next(this.position);
    }
    // @ts-ignore
    this.animationsService.duration.next(`${(this.position-10)*(-1)}s`);
    if(this.position){
      this.animationsService.delay = (this.position-8)/(-10);
    }

    // Nouveau code pour mettre à jour le backend
    let user = this.userService.getUserCourant();
    if (user) {
      let userId = user.id!;
      let configId = user.configuration.id!;

      const config = await this.userService.getUserConfiguration(userId);
      if (this.position) {
        config.sliderPosition = this.position;
      }

      await this.userService.updateConfiguration(configId, config);
      user.configuration = config;
      await this.userService.updateUser(user, userId);
    }
  }


}
