import { Routes } from '@angular/router';
import { AuthLayout } from './module/components/layout/auth-layout/auth-layout';
import { Main } from './module/components/layout/main-layout/main/main';
import { authGuard } from './core/guard/auth.guard';
import { roleGuard } from './core/guard/rol.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                loadChildren: () =>
                    import('./module/pages/auth/auth-routing-module').then(
                        (m) => m.AuthRoutingModule
                    )
            },
            {
                path: 'registro',
                loadComponent: () =>
                    import('./module/components/modal/registro-usuario/registro-usuario').then(
                        m => m.RegistroUsuario
                    )
            },
            {
                path: '**',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ],
    },
    {
        path: 'home',
        component: Main,
        canActivate: [authGuard],
        children: [
            {
                path: 'contenido',
                canActivate: [roleGuard],
                data: {
                    roles: ['Administrador', 'Usuario']
                },
                loadComponent: () =>
                    import('./module/pages/contenido-educativo/contenido-educativo-module').then(
                        (m) => m.ContenidoEducativoModule
                    ),
            },
            {
                path: 'evaluacion',
                canActivate: [roleGuard],
                data: {
                    roles: ['Administrador', 'Usuario']
                },
                loadComponent: () =>
                    import('./module/pages/evaluacion-riesgo-cardiovascular/evaluacion-riesgo-cardiovascular-module').then(
                        (m) => m.EvaluacionRiesgoCardiovascularModule
                    ), 
            },
            {
                path: 'cuestionario',
                canActivate: [roleGuard],
                data: {
                    roles: ['Administrador', 'Usuario']
                },
                loadComponent: () =>
                    import('./module/pages/cuestionarios-autoevaluacion/cuestionarios-autoevaluacion-module').then(
                        (m) => m.CuestionariosAutoevaluacionModule
                    ), 
            },
            {
                path: '**',
                redirectTo: 'contenido',
                pathMatch: 'full'
            }
        ],
    },
    {
        path: '**',
        loadChildren: () =>
        import('./module/pages/page-not-found/page-not-found-module').then(
            (m) => m.PageNotFoundModule
        ),
    }

];
