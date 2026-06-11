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

  private readonly menusRol: { [Key: number]: Menu[] } = {
    1: [//ADMINISTRADOR
      { label: 'Bandeja de Solicitudes', icon: 'bandeja-solicitud.png', url: '/home/tray'},
      { label: 'Ingresar Solicitud', icon: 'ingresar-solicitud.png', url: '/home/request'},
      { label: 'Mantenimiento de Usuario', icon: 'mantenimiento-usuario.png', url: '/home/user-maintenance'},
      { label: 'Mantenimiento de Ramos', icon: 'mantenimiento-ramo.png', url: '/home/ramos-maintenance'},
      { label: 'Mantenimiento de Parametros', icon: 'mantenimiento-parametro.png', url: '/home/parameter-maintenance'},
      { label: 'Permisos Tipos de Usuarios', icon: 'permiso-tipo-usuario.png', url: '/home/user-type'},
      { label: 'Ubicación de Usuarios', icon: 'ubicacion-usuario.png', url: '/home/user-location'},
      { label: 'Calendario', icon: 'calendario.png', url: '/home/calendar'},
      { label: 'Log', icon: 'log.png', url: '/home/log'}
    ],
    2: [//Usuario
      { label: 'Bandeja de Solicitudes', icon: 'bandeja-solicitud.png', url: '/home/tray'},
      { label: 'Ingresar Solicitud', icon: 'ingresar-solicitud.png', url: '/home/request'},
      { label: 'Calendario', icon: 'calendario.png', url: '/home/calendar'}
    ]
  }

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
