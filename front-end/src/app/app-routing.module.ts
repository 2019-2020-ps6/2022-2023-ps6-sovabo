import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AccueilComponent} from './accueil/accueil.component'
import {ConfigurationComponent} from "./config/configuration/configuration.component";
import {MonProfilComponent} from "./mon-profil/mon-profil.component";
import {ListesQuizzComponent} from "./quizz/listes-quizz/listes-quizz.component";


const routes: Routes = [
  { path: '',redirectTo:'/accueil', pathMatch:'full'},
  { path: 'accueil', component: AccueilComponent },
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'mon-profil', component: MonProfilComponent},
  { path: 'statistiques', component: MonProfilComponent},
  { path: 'liste-quizz', component: ListesQuizzComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
