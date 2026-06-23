import { NgModule } from '@angular/core';

import { ContenidoEducativoRoutingModule } from './contenido-educativo-routing-module';
import { Contenido } from './contenido/contenido';
import { MaterialModule } from '../../../shared/ui/material-module';
import { SanitizarUrl } from '../../../shared/pipe/sanitizarUrl.pipe';
import { JuegoClasificarHabitos } from './juego-clasificar-habitos/juego-clasificar-habitos';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardJuego } from './dashboard-juego/dashboard-juego';


@NgModule({
  declarations: [
    Contenido,
    JuegoClasificarHabitos,
    DashboardJuego,
  ],
  imports: [
    MaterialModule,
    SanitizarUrl,
    DragDropModule,
    ContenidoEducativoRoutingModule
  ]
})
export class ContenidoEducativoModule { }
