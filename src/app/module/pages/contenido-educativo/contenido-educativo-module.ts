import { NgModule } from '@angular/core';

import { ContenidoEducativoRoutingModule } from './contenido-educativo-routing-module';
import { Contenido } from './contenido/contenido';
import { MaterialModule } from '../../../shared/ui/material-module';
import { SanitizarUrl } from '../../../shared/pipe/sanitizarUrl.pipe';


@NgModule({
  declarations: [
    Contenido,
  ],
  imports: [
    MaterialModule,
    SanitizarUrl,
    ContenidoEducativoRoutingModule
  ]
})
export class ContenidoEducativoModule { }
