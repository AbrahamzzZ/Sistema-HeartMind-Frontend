import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Historial } from './historial/historial';

const routes: Routes = [
  {
    path: '', component: Historial, title: 'Historial médico'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialMedicoRoutingModule { }
