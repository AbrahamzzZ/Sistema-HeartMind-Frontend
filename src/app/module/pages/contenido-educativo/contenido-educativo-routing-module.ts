import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Contenido } from './contenido/contenido';
import { JuegoClasificarHabitos } from './juego-clasificar-habitos/juego-clasificar-habitos';
import { DashboardJuego } from './dashboard-juego/dashboard-juego';
import { ConfigurarClasificaHabitos } from '../../components/forms/configurar-clasifica-habitos/configurar-clasifica-habitos';

const routes: Routes = [
  { 
    path: '', component: Contenido, title: 'Contenido educativo'
  },
  {
     path: 'juegos', component: DashboardJuego, title: 'Juegos educativos'
  },
  { 
    path: 'juegos/clasificar-habitos/configurar', component: ConfigurarClasificaHabitos, title: 'Nuevo juego'
  },
  { 
    path: 'juegos/clasificar-habitos/configurar/:id', component: ConfigurarClasificaHabitos, title: 'Editar juego'
  },

  { 
    path: 'juegos/clasificar-habitos', component: JuegoClasificarHabitos, title: 'Clasificar Habitos'
  },
  { 
    path: 'juegos/clasificar-habitos/:id', component: JuegoClasificarHabitos, title: 'Clasificación Habitos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidoEducativoRoutingModule { }
