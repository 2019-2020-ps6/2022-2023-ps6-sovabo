import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";

@Component({
  selector: 'app-config-attention',
  templateUrl: './config-attention.component.html',
  styleUrls: ['./config-attention.component.scss']
})
export class ConfigAttentionComponent {
  animations: boolean = false;

  constructor(private animationsService: AnimationsService) {
  }

  ngOnInit(): void {
    this.animations = this.animationsService.getAnimations();
  }
  toggleAnimations() {
    this.animations = !this.animations;
    this.animationsService.setAnimations(this.animations);

  }

  getStyleClass() {
    return this.animations ? 'titreStyle-animate' : 'titreStyle';
  }

}
