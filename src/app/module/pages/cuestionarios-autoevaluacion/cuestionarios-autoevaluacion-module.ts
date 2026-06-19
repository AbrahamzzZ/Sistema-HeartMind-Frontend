import { NgModule } from '@angular/core';

import { CuestionariosAutoevaluacionRoutingModule } from './cuestionarios-autoevaluacion-routing-module';
import { Cuestionario } from './cuestionario/cuestionario';
import { MaterialModule } from '../../../shared/ui/material-module';
import { FormsModule } from '@angular/forms';
import { Administracion } from './administracion/administracion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Resolver } from './resolver/resolver';


@NgModule({
  declarations: [
    Cuestionario,
    Administracion,
    Resolver
  ],
  imports: [
    MaterialModule,
    FormsModule,
    DragDropModule,
    CuestionariosAutoevaluacionRoutingModule
  ]
})
export class CuestionariosAutoevaluacionModule { }
