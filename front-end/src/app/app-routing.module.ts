import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AccueilComponent} from './accueil/accueil.component'
import {ConfigurationComponent} from "./config/configuration/configuration.component";
import {MonProfilComponent} from "./mon-profil/mon-profil.component";
import {ListesQuizzComponent} from "./quizz/listes-quizz/listes-quizz.component";
import {ConfigAttentionComponent} from "./config/config-attention/config-attention.component";
import {ConfigVisionComponent} from "./config/config-vision/config-vision.component";
import {AccueilQuizzComponent} from "./quizz/accueil-quizz/accueil-quizz.component";
import {CreerQuizzComponent} from "./quizz/creer-quizz/creer-quizz.component";
import {JouerQuizzComponent} from "./quizz/jouer-quizz/jouer-quizz.component";
import {ResultatQuizzComponent} from "./quizz/resultat-quizz/resultat-quizz.component";
import {ImageAnimateurComponent} from "./image-animateur/image-animateur.component";
import {StatistiqueComponent} from "./statistique/statistique.component"
import {ModifQuizzComponent} from "./quizz/modif-quizz/modif-quizz.component";

const routes: Routes = [
  { path: '',redirectTo:'/accueil', pathMatch:'full'},
  { path: 'accueil', component: AccueilComponent },
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'mon-profil', component: MonProfilComponent},
  { path: 'statistiques', component: StatistiqueComponent},
  { path: 'resultat-quizz', component: ResultatQuizzComponent},
  { path: 'statistiques-quiz', component: StatistiqueComponent},
  { path: 'liste-quizz', component: ListesQuizzComponent},
  {path: 'accueil-quiz/:id', component: AccueilQuizzComponent},
  {path: 'jouer-quiz/:id', component: JouerQuizzComponent},
  { path: 'configurationAttention', component: ConfigAttentionComponent},
  { path: 'configurationVision', component: ConfigVisionComponent},
  { path: 'creer-quizz', component: CreerQuizzComponent},
  { path: 'modif-quizz', component: ModifQuizzComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
