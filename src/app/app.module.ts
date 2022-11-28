import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearAnimesComponent } from './pages/crear-animes/crear-animes.component';
import { EditarAnimeComponent } from './pages/editar-anime/editar-anime.component';
import { ListarAnimesComponent } from './pages/listar-animes/listar-animes.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { AnimeService } from './services/anime.service';

@NgModule({
  declarations: [
    AppComponent,
    CrearAnimesComponent,
    EditarAnimeComponent,
    ListarAnimesComponent,
    AcercaDeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AnimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
