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
  constructor(private jeuxCouleursService: JeuxCouleursService,private location: Location) {}

  lastPage(){
    this.location.back();
  }

  ngOnInit(): void {
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    this.changeContrast();
    this.jeuxCouleursService.changeFont(document);
    this.jeuxCouleursService.changeFontSize(document);
  }


  changeContrast(){
    let tabContainer = document.querySelectorAll('[id=contrastUpContainer]');
    let tabText = document.querySelectorAll('[id=contrastUpText]');

    if(this.AttentionColorStatus){
      if(tabContainer != null){
        tabContainer.forEach(element => {
          element.classList.add('contrastUpContainer');
        });
      }
      if(tabText != null){
        tabText.forEach(element => {
          element.classList.add('contrastUpText');
        });
      }
    }
    else{
      if(tabContainer != null){
        tabContainer.forEach(element => {
          element.classList.remove('contrastUpContainer');
        });
      }
      if(tabText != null){
        tabText.forEach(element => {
          element.classList.remove('contrastUpText');
        });
      }
    }
  }





}
