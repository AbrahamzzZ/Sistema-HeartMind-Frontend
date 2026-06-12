import { NgModule } from '@angular/core';

import { EvaluacionRiesgoCardiovascularRoutingModule } from './evaluacion-riesgo-cardiovascular-routing-module';
import { Evalucion } from './evalucion/evalucion';
import { MaterialModule } from '../../../shared/ui/material-module';


@NgModule({
  declarations: [
    Evalucion
  ],
  imports: [
    MaterialModule,
    EvaluacionRiesgoCardiovascularRoutingModule
  ]
})
export class EvaluacionRiesgoCardiovascularModule { }
