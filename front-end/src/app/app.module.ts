import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import {JouerQuizzComponent} from "./quizz/jouer-quizz/jouer-quizz.component";
import { ConfigurationComponent } from './config/configuration/configuration.component';
import { ConfigAttentionComponent } from './config/config-attention/config-attention.component';
import { ConfigVisionComponent } from "./config/config-vision/config-vision.component";
import { AccueilQuizzComponent} from "./quizz/accueil-quizz/accueil-quizz.component";
import { CreerQuizzComponent} from "./quizz/creer-quizz/creer-quizz.component";
import { ListesQuizzComponent} from "./quizz/listes-quizz/listes-quizz.component";
import { ModifQuizzComponent} from "./quizz/modif-quizz/modif-quizz.component";
import {ResultatQuizzComponent} from "./quizz/resultat-quizz/resultat-quizz.component";
import { QuizElementComponent } from './quizz/listes-quizz/quiz-element/quiz-element.component';
import { BtnClickableBackgroundComponent } from './bouton/btn-clickable-background/btn-clickable-background.component';
import { BtnClickableFrameBackgroundComponent } from './bouton/btn-clickable-frame-background/btn-clickable-frame-background.component';
import { BtnPolyquizTextComponent } from './bouton/btn-polyquiz-text/btn-polyquiz-text.component';
import { SliderComponent } from './slider/slider.component';
import { BtnListQuizComponent } from './bouton/btn-list-quiz/btn-list-quiz.component';
import { BtnOnOffAnimationsComponent } from './bouton/btn-on-off/btn-on-off-animations/btn-on-off-animations.component';
import { BtnOnOffAnimateurComponent } from './bouton/btn-on-off/btn-on-off-animateur/btn-on-off-animateur.component';
import { BtnOnOffJeuxCouleursComponent } from './bouton/btn-on-off/btn-on-off-jeux-couleurs/btn-on-off-jeux-couleurs.component';
import {ImageAnimateurComponent} from "./image-animateur/image-animateur.component"


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
    ResultatQuizzComponent,
    JouerQuizzComponent,
    ImageAnimateurComponent,
   // ModelButtonComponent,
    QuizElementComponent,
    BtnClickableBackgroundComponent,
    BtnClickableFrameBackgroundComponent,
    BtnPolyquizTextComponent,
    SliderComponent,
    BtnListQuizComponent,
    BtnOnOffAnimationsComponent,
    BtnOnOffAnimateurComponent,
    BtnOnOffJeuxCouleursComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
