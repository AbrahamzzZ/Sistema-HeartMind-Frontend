import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Menu } from '../../../../../core/interface/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Main implements OnInit{
 @ViewChild('sidenav') sidenav!: MatSidenav;
  private readonly router = inject(Router);
  isCollapsed = true;
  userName = "";
  tipoUsuario: string = '';
  menuItems: Menu[] = [];

  private readonly menusRol: { [key: string]: Menu[] } = {

    Administrador: [
      {label: 'Contenido Educativo', icon: 'contenido.png', url: '/home/contenido'},
      {label: 'Evaluación de Riesgo', icon: 'evaluacion.png', url: '/home/evaluacion'},
      {label: 'Cuestionarios', icon: 'cuestionario.png', url: '/home/cuestionario'}
    ],

    Usuario: [
      {label: 'Contenido Educativo', icon: 'contenido.png', url: '/home/contenido'},
      {label: 'Evaluación de Riesgo', icon: 'evaluacion.png', url: '/home/evaluacion'},
      {label: 'Cuestionarios', icon: 'cuestionario.png', url: '/home/cuestionario'}
    ]
  };

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      this.userName = parsed.nombre;
      this.tipoUsuario = parsed.tipo_usuario;
      const idTipoUsuario = parsed.id_tipo_usuario;
      this.menuItems = this.menusRol[idTipoUsuario] || [];
    }
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
