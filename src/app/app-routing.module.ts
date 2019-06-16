import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmsPopulairesComponent } from './films-populaires/films-populaires.component';
import { RechercheComponent } from './recherche/recherche.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path:'',redirectTo:'/films-populaires',pathMatch:'full'},
  {path:'films-populaires',component:FilmsPopulairesComponent},
  {path:'recherche',component:RechercheComponent},
  {path:'details/:id',component:DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
