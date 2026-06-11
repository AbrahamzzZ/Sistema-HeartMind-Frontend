import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenidoEducativoRoutingModule } from './contenido-educativo-routing-module';
import { Contenido } from './contenido/contenido';


@NgModule({
  declarations: [
    Contenido
  ],
  imports: [
    CommonModule,
    ContenidoEducativoRoutingModule
  ]
})
export class ContenidoEducativoModule { }
