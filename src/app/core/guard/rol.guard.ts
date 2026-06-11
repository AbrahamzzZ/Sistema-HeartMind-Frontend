import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {

  const router = inject(Router);

  const user = localStorage.getItem('user');

  if (!user) {
    router.navigate(['/auth/login']);
    return false;
  }

  const usuario = JSON.parse(user);

  const rolesPermitidos = route.data['roles'];

  if (!rolesPermitidos.includes(usuario.rol)) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};