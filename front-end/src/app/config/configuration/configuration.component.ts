import {Component, HostListener} from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  AttentionColorStatus: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  constructor(private jeuxCouleursService: JeuxCouleursService) {}

  ngOnInit(): void {
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();

    console.log("APPEL ONINIT CONFIG");
    this.jeuxCouleursService.changeFont(document);
  }

  ngAfterViewInit(){console.log("afterContent");
    if (this.jeuxCouleursService.isDefaultActive) {this.jeuxCouleursService.collectDefaultStyles();}
    else {this.jeuxCouleursService.changeFont(document);}
    this.jeuxCouleursService.changeFontSize(document);
  }

}
