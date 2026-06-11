import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Contenido } from './contenido/contenido';

const routes: Routes = [
  {
    path: '',component: Contenido, title: 'Contenido educativo'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidoEducativoRoutingModule { }
