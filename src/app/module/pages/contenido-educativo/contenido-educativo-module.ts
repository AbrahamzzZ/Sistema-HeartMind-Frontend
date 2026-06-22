import { NgModule } from '@angular/core';

import { ContenidoEducativoRoutingModule } from './contenido-educativo-routing-module';
import { Contenido } from './contenido/contenido';
import { MaterialModule } from '../../../shared/ui/material-module';
import { SanitizarUrl } from '../../../shared/pipe/sanitizarUrl.pipe';
import { JuegoClasificarHabitos } from './juego-clasificar-habitos/juego-clasificar-habitos';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    Contenido,
    JuegoClasificarHabitos,
  ],
  imports: [
    MaterialModule,
    SanitizarUrl,
    DragDropModule,
    ContenidoEducativoRoutingModule
  ]
})
export class ContenidoEducativoModule { }
