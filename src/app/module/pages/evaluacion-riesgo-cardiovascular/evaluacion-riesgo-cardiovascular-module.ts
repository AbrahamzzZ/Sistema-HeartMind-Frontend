import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionRiesgoCardiovascularRoutingModule } from './evaluacion-riesgo-cardiovascular-routing-module';
import { Evalucion } from './evalucion/evalucion';


@NgModule({
  declarations: [
    Evalucion
  ],
  imports: [
    CommonModule,
    EvaluacionRiesgoCardiovascularRoutingModule
  ]
})
export class EvaluacionRiesgoCardiovascularModule { }
