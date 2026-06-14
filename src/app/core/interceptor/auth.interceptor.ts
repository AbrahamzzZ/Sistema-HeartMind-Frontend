import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../service/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly loader = inject(LoaderService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    const request = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    // show global loader for every HTTP request
    this.loader.show();

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err?.status === 401) {
          // token expired or unauthorized: clear storage and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => err);
      }),
      finalize(() => {
        // hide loader when request completes (success or error)
        this.loader.hide();
      })
    );
  }
}
