import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AccueilComponent} from './accueil/accueil.component'
import { AccueilQuizzComponent } from './quizz/accueil-quizz/accueil-quizz.component';


const routes: Routes = [
  { path: '',redirectTo:'/accueil', pathMatch:'full'},
  { path: 'accueil', component: AccueilComponent },
  { path: 'accueil-quizz', component: AccueilQuizzComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
