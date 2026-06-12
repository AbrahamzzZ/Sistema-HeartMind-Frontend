import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Menu } from '../../../../../core/interface/usuario/menu';
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
      {label: 'Contenido Educativo', icon: 'contenido.png', url: '/home/contenido', description: 'Accede a materiales y recursos'},
      {label: 'Evaluación de Riesgo', icon: 'riesgo.png', url: '/home/evaluacion', description: 'Realiza evaluaciones y análisis'},
      {label: 'Cuestionarios', icon: 'cuestionario.png', url: '/home/cuestionario', description: 'Responde cuestionarios y tests'},
      {label: 'Historial Médico', icon: 'historial.png', url: '/home/historial', description: 'Revisa tus historiales médicos'}
    ],

    Usuario: [
      {label: 'Contenido Educativo', icon: 'contenido.png', url: '/home/contenido', description: 'Accede a materiales y recursos'},
      {label: 'Evaluación de Riesgo', icon: 'riesgo.png', url: '/home/evaluacion', description: 'Realiza evaluaciones y análisis'},
      {label: 'Cuestionarios', icon: 'cuestionario.png', url: '/home/cuestionario', description: 'Responde cuestionarios y tests'},
      {label: 'Historial Médico', icon: 'historial.png', url: '/home/historial', description: 'Revisa tus historiales médicos'}
    ]
  };

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }

    const parsed = JSON.parse(user);
    this.userName = parsed.nombre;
    this.tipoUsuario = parsed.rol;
    this.menuItems = this.menusRol[parsed.rol] || [];
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
