import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JeuxCouleursService {

  //option trouble de l'attention
  private attentionColorActivated = true;

  //option torouble de la vision
  private visionColorActivated = false;
  private colorSelected :number = 0;

  constructor() {}

  IsVisionColorActivated(): boolean {return this.visionColorActivated;}
  IsAttentionColorActivated(): boolean {return this.attentionColorActivated;}

  setAttentionColor(value: boolean){this.attentionColorActivated=value;}

  setVisionColor(value: number) {
    //console.log('setJeuxCouleurs: ' + value);
    if(value<0){} // Do nothing
    else{
      this.colorSelected=value
      if(value == 0){this.visionColorActivated = false;}
      else if(value>0){this.visionColorActivated = true;}
    }
  }

  getVisionColorSelected(): number {return this.colorSelected;}

  getVisionAttentionStatus(): boolean{return this.attentionColorActivated;}
}
