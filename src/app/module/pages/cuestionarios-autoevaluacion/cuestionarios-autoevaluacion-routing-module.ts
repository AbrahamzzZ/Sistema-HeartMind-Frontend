import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cuestionario } from './cuestionario/cuestionario';

const routes: Routes = [
  {
    path: '', component: Cuestionario, title: 'Cuestionario autoevaluación'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuestionariosAutoevaluacionRoutingModule { }
