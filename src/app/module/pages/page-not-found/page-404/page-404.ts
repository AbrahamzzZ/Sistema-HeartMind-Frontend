import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-404',
  standalone: false,
  templateUrl: './page-404.html',
  styleUrl: './page-404.css'
})
export class Page404 {
  private router = inject(Router);

  goHome() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home/tray']);
      console.log(token);
    } else {
      this.router.navigate(['/auth/login']);
        console.log(token);
    }
  }
}
