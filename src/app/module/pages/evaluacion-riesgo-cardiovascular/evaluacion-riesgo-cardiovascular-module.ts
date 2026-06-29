import { NgModule } from '@angular/core';

import { EvaluacionRiesgoCardiovascularRoutingModule } from './evaluacion-riesgo-cardiovascular-routing-module';
import { Evaluacion } from './evalucion/evalucion';
import { MaterialModule } from '../../../shared/ui/material-module';


@NgModule({
  declarations: [
    Evaluacion
  ],
  imports: [
    MaterialModule,
    EvaluacionRiesgoCardiovascularRoutingModule
  ]
})
export class EvaluacionRiesgoCardiovascularModule { }
