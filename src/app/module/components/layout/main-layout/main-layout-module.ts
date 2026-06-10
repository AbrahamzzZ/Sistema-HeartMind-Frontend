import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing-module';
import { Main } from './main/main';
import { MaterialModule } from '../../../../shared/ui/material-module';
import { RouterOutlet } from '@angular/router';
import { Sidnebar } from '../../../../shared/utility/sidnebar/sidnebar';



@NgModule({
  declarations: [
    Main
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MaterialModule,
    RouterOutlet,
    Sidnebar
]
})
export class MainLayoutModule { }
