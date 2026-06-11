import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Evalucion } from './evalucion/evalucion';

const routes: Routes = [
  {
    path: '', component: Evalucion, title: 'Evaluación cardiovascular'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRiesgoCardiovascularRoutingModule { }
