import { Component } from '@angular/core';
import { JeuxCouleursService } from 'src/service/jeux-couleurs.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  AttentionColorStatus: boolean = false;

  ngInit() {
  }

  constructor(private jeuxCouleursService: JeuxCouleursService) {}

  ngOnInit(): void {
    console.log('ConfigVisionComponent');
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    this.changeContrast();
  }
  
  changeContrast(){
    console.log('changeContrast Vision');
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
