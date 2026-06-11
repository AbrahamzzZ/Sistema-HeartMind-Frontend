import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404 } from './page-404/page-404';

const routes: Routes = [
  {
    path: '', component: Page404, title: 'Sweaden Seguros'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule { }
