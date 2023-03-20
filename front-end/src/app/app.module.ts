import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { ListesQuizzComponent } from './listes-quizz/listes-quizz.component';
import { ConfigVisionComponent } from './config-vision/config-vision.component';
import { ConfigAttentionComponent } from './config-attention/config-attention.component';
import { CreerQuizzComponent } from './creer-quizz/creer-quizz.component';
import { AccueilQuizzComponent } from './accueil-quizz/accueil-quizz.component';
import { ModifQuizzComponent } from './modif-quizz/modif-quizz.component';
import { ResultatQuizzComponent } from './resultat-quizz/resultat-quizz.component';
import { JouerQuizzComponent } from './jouer-quizz/jouer-quizz.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    StatistiqueComponent,
    ConfigurationComponent,
    MonProfilComponent,
    ListesQuizzComponent,
    ConfigVisionComponent,
    ConfigAttentionComponent,
    CreerQuizzComponent,
    AccueilQuizzComponent,
    ModifQuizzComponent,
    ResultatQuizzComponent,
    JouerQuizzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
