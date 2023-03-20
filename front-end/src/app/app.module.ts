import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { ConfigurationComponent } from './config/configuration/configuration.component';
import { ConfigAttentionComponent } from './config/config-attention/config-attention.component';
import { ConfigVisionComponent } from "./config/config-vision/config-vision.component";
import { AccueilQuizzComponent} from "./quizz/accueil-quizz/accueil-quizz.component";
import { CreerQuizzComponent} from "./quizz/creer-quizz/creer-quizz.component";
import { ListesQuizzComponent} from "./quizz/listes-quizz/listes-quizz.component";
import { ModifQuizzComponent} from "./quizz/modif-quizz/modif-quizz.component";
import {ResultatQuizzComponent} from "./quizz/resultat-quizz/resultat-quizz.component";

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    StatistiqueComponent,
    ConfigurationComponent,
    MonProfilComponent,
    ConfigAttentionComponent,
    ConfigVisionComponent,
    AccueilQuizzComponent,
    CreerQuizzComponent,
    ListesQuizzComponent,
    ModifQuizzComponent,
    ResultatQuizzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
