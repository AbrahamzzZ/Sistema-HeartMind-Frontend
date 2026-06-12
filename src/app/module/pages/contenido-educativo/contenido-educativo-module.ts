import { NgModule } from '@angular/core';

import { ContenidoEducativoRoutingModule } from './contenido-educativo-routing-module';
import { Contenido } from './contenido/contenido';
import { MaterialModule } from '../../../shared/ui/material-module';


@NgModule({
  declarations: [
    Contenido
  ],
  imports: [
    MaterialModule,
    ContenidoEducativoRoutingModule
  ]
})
export class ContenidoEducativoModule { }
