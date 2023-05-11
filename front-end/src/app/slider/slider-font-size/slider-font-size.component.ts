import { Component } from '@angular/core';
import {AnimateurService} from "../../../service/animateur.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {ConfigVisionComponent} from "../../config/config-vision/config-vision.component";

@Component({
  selector: 'app-slider-font-size',
  templateUrl: './slider-font-size.component.html',
  styleUrls: ['./slider-font-size.component.scss']
})
export class SliderFontSizeComponent {
  public position: number =this.jeuxCouleursService.getCurrentFontSize() ;

  constructor(private jeuxCouleursService: JeuxCouleursService,private configVision: ConfigVisionComponent) {
  }


  onDurationChange() {
    this.configVision.fontSizeUpdate(this.position);
  }
}
