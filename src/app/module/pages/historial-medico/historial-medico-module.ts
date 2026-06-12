import { NgModule } from '@angular/core';

import { HistorialMedicoRoutingModule } from './historial-medico-routing-module';
import { Historial } from './historial/historial';
import { MaterialModule } from '../../../shared/ui/material-module';


@NgModule({
  declarations: [
    Historial
  ],
  imports: [
    MaterialModule,
    HistorialMedicoRoutingModule
  ]
})
export class HistorialMedicoModule { }
