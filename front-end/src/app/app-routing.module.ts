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

const routes: Routes = [
  { path: '',redirectTo:'/accueil', pathMatch:'full'},
  { path: 'accueil', component: AccueilComponent },
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'mon-profil', component: MonProfilComponent},
  { path: 'statistiques', component: MonProfilComponent},
  { path: 'liste-quizz', component: ListesQuizzComponent},
  {path: 'accueil-quiz/:id', component: AccueilQuizzComponent},
  { path: 'configurationAttention', component: ConfigAttentionComponent},
  { path: 'configurationVision', component: ConfigVisionComponent},
  { path: 'creer-quizz', component: CreerQuizzComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
