import { NgModule } from '@angular/core';

import { CuestionariosAutoevaluacionRoutingModule } from './cuestionarios-autoevaluacion-routing-module';
import { Cuestionario } from './cuestionario/cuestionario';
import { MaterialModule } from '../../../shared/ui/material-module';


@NgModule({
  declarations: [
    Cuestionario
  ],
  imports: [
    MaterialModule,
    CuestionariosAutoevaluacionRoutingModule
  ]
})
export class CuestionariosAutoevaluacionModule { }
