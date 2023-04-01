import { Component } from '@angular/core';
import {AnimateurService} from "../../service/animateur.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  constructor(private animateurService: AnimateurService) { }

  ngOnInit(): void {
  }

  getAnimateur() {
    return this.animateurService.getAnimateur();
  }
}
