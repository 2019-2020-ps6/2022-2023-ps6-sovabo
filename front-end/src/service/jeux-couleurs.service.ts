import { Injectable } from '@angular/core';
import {duotone} from "@fortawesome/fontawesome-svg-core/import.macro";

@Injectable({
  providedIn: 'root'
})
export class JeuxCouleursService {

  //option trouble de l'attention
  private attentionColorActivated = false;

  //option trouble de la vision
  listTrouble = ["TRICHROMATIE","DICHROMATISME"];
  listFont = ["Arial","Andale Mono","Comic Sans MS"];

  private visionColorActivated = false;
  private colorSelected :number = 0;
  private fontSelected: string = this.listFont[0];

  private currentFontSize: number  = 2;
  private oldFontSize: number = 2;

  private fontCheck: boolean = false;

  getFontCheck(){
    return this.fontCheck;
  }

  setFontCheck(state: boolean){
    this.fontCheck=state;
  }
  getCurrentFontSize(){
    return this.currentFontSize;
  }

  setCurrentFontSize(nb: number){
    this.oldFontSize=this.currentFontSize;
    this.currentFontSize=nb;
  }

  constructor() {}

  getListTrouble(){
    return this.listTrouble;
  }

  getListFont(){
    return this.listFont;
  }

  IsVisionColorActivated(): boolean {return this.visionColorActivated;}
  IsAttentionColorActivated(): boolean {return this.attentionColorActivated;}

  setAttentionColor(value: boolean){this.attentionColorActivated=value;}

  setVisionColor(value: number) {
    //console.log('setJeuxCouleurs: ' + value);
    if(value<0){
      this.colorSelected=-1;
      this.visionColorActivated=false;
    } // Do nothing
    else{
      this.colorSelected=value;
      this.visionColorActivated=true;
    }
    //console.log("FIN SETVISION :"+this.visionColorActivated);
  }

  setFont(value: number){
    this.fontSelected=this.listFont[value];
  }

  getVisionColorSelected(): number {return this.colorSelected;}
  getVisionColorSelectedString(): string {
    switch (this.colorSelected){
      case 0:
        return this.listTrouble[0];
        break;
      case 1:
        return this.listTrouble[1];
        break;
      default:
        return "";
    }
  }

  getFontSelectedString(){
      return this.fontSelected;
    }

  getVisionAttentionStatus(): boolean{return this.attentionColorActivated;}

  //UTILS METHODS
  changeSampleFont(document: Document) {
    if(event!=null){
      //on récupère l'élément html ciblé par l'event
      const target = event?.currentTarget as HTMLElement;
      //on recup l'id du boutton (l'id dépends du trouble)
      const value = target.id;

      let exTxt = null;
      if(exTxt = document.getElementById("exampleTxt")){
        switch (value){
          case "btn_fontChanger1":
            exTxt.style.fontFamily=this.listFont[0];
            exTxt.innerHTML=this.listFont[0];
            this.setFont(0);
            break;
          case "btn_fontChanger2":
            exTxt.style.fontFamily=this.listFont[1];
            exTxt.innerHTML=this.listFont[1];
            this.setFont(1);
            break;
          case "btn_fontChanger3":
            exTxt.style.fontFamily=this.listFont[2];
            exTxt.innerHTML=this.listFont[2];
            this.setFont(2);
            break;
        }
        this.fontSelected=this.getFontSelectedString();
      }
    }
  }

  changeFontSize(document: Document) {
    console.log("FONTSIZE CHANGER");

    console.log("currentFontSize :"+this.currentFontSize+" | "+"oldFontSize"+this.oldFontSize);

    let level = this.currentFontSize-this.oldFontSize;
    //let level = 1;
    let coeff = 5;

    if(event!=null) {
      //on récupère l'élément html ciblé par l'event
      const target = event?.currentTarget as HTMLElement;
      //on recup l'id du boutton (l'id dépends du trouble)
      const value = target.id;

      let pList = document.querySelectorAll("p");

      pList.forEach(elem =>{
        let originFontSize = window.getComputedStyle(elem, null).getPropertyValue('font-size');
        var fontSize = parseFloat(originFontSize);
        elem.style.fontSize = (fontSize+(level*coeff))+"px";
      });
    }
  }

  changeFont(document: Document) {
    console.log("changeFont");

    if(this.fontCheck){
      let pElement = document.querySelectorAll("p");

      //CAS DE JOUER QUIZZ
      let answerContainer = document.getElementsByClassName("answers-container");
      let questionContainer = document.getElementsByClassName("question-bubble");

      pElement.forEach(elem => {
        elem.style.fontFamily=this.getFontSelectedString();
        if(elem.classList.contains("titreStyle")){
          elem.style.textShadow="none";
        }
      });

      for(let i=0;i<answerContainer.length;i++){
        let fontToChange=this.getFontSelectedString();
        switch (this.getFontSelectedString()){
          case this.listFont[0]:
            fontToChange = "FONTSELECTED_ARIAL";
            break;
          case this.listFont[1]:
            fontToChange = "FONTSELECTED_ANDALE";
            break;
          case this.listFont[2]:
            fontToChange = "FONTSELECTED_COMIC";
            break;
          default:
            break;
        }
        console.log(answerContainer[i]);
        answerContainer[i].classList.add(fontToChange);
      }

      for(let i=0;i<questionContainer.length;i++){
        let fontToChange=this.getFontSelectedString();
        switch (this.getFontSelectedString()){
          case this.listFont[0]:
            fontToChange = "FONTSELECTED_ARIAL";
            break;
          case this.listFont[1]:
            fontToChange = "FONTSELECTED_ANDALE";
            break;
          case this.listFont[2]:
            fontToChange = "FONTSELECTED_COMIC";
            break;
          default:
            break;
        }
        console.log(questionContainer[i]);
        questionContainer[i].classList.add(fontToChange);
      }
    }
    else{}

  }
}
