import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Contenido } from './contenido/contenido';
import { JuegoClasificarHabitos } from './juego-clasificar-habitos/juego-clasificar-habitos';

const routes: Routes = [
  {
    path: '',component: Contenido, title: 'Contenido educativo'
  },
  {
    path: 'juegos/clasificar-habitos', component: JuegoClasificarHabitos, title: 'Clasificar Habitos'
  },
  { 
    path: 'juegos/clasificar-habitos/:id', component: JuegoClasificarHabitos, title: 'Editar juego'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidoEducativoRoutingModule { }
