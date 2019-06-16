import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FilmsPopulairesComponent } from './films-populaires/films-populaires.component';
import { RechercheComponent } from './recherche/recherche.component';
import { DetailsComponent } from './details/details.component';
import { VignetteComponent } from './vignette/vignette.component';

import { DonneesService } from './donnees.service';

@NgModule({
  declarations: [
    AppComponent,
    FilmsPopulairesComponent,
    RechercheComponent,
    DetailsComponent,
    VignetteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DonneesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
