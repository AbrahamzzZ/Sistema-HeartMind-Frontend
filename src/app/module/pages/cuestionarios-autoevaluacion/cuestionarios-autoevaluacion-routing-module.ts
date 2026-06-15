import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cuestionario } from './cuestionario/cuestionario';
import { Administracion } from './administracion/administracion';

const routes: Routes = [
  {
    path: '', component: Cuestionario, title: 'Cuestionario autoevaluación'
  },
  {
    path: 'administracion', component: Administracion, title: 'Administrar cuestionario'
  },
  { 
    path: 'administracion/:id', component: Administracion, title: 'Editar cuestionario'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuestionariosAutoevaluacionRoutingModule { }
