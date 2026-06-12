import { Menu } from '../../../core/interface/usuario/menu';
import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../ui/material-module';

@Component({
  selector: 'app-sidnebar',
  imports: [CommonModule, NgClass, RouterLink, MaterialModule],
  templateUrl: './sidnebar.html',
  styleUrl: './sidnebar.scss'
})
export class Sidnebar {
  @Input() isSidebarCollapsed = false;
  @Input() userName = '';
  @Input() tipoUsuario = '';
  @Input() menuItems: Menu[] = [];
  @Output() sidebarToggle = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
