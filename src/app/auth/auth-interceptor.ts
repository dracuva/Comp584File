import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authservice = inject(AuthService);
  const authToken = authservice.getToken();
  const router = inject(Router);
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next(authReq);
  }
  return next(req).pipe(catchError((error) => {
    if (error.status === 401) {
      router.navigate(['login']);
    }
    return throwError(() => error);
  }));
};
