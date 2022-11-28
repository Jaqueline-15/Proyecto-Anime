import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAnimesComponent } from './pages/crear-animes/crear-animes.component';
import { EditarAnimeComponent } from './pages/editar-anime/editar-anime.component';
import { ListarAnimesComponent } from './pages/listar-animes/listar-animes.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';

const routes: Routes = [
  {path: '',pathMatch: 'full', redirectTo: 'crear-animes'},
  {path: 'crear-animes', component: CrearAnimesComponent},
  {path: 'editar-anime/:id', component: EditarAnimeComponent},
  {path: 'listar-animes', component: ListarAnimesComponent},
  {path: 'acerca-de', component: AcercaDeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }