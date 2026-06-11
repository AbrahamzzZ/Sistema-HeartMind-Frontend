import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuestionariosAutoevaluacionRoutingModule } from './cuestionarios-autoevaluacion-routing-module';
import { Cuestionario } from './cuestionario/cuestionario';


@NgModule({
  declarations: [
    Cuestionario
  ],
  imports: [
    CommonModule,
    CuestionariosAutoevaluacionRoutingModule
  ]
})
export class CuestionariosAutoevaluacionModule { }
