import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

// import { UserService } from './shared/services/user.service';

import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { UserService } from './services/user.service';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = this.userService.getAuthorizationToken();
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(catchError(event => {
      if (event instanceof HttpErrorResponse) {
        const response = event as HttpErrorResponse;
        if (response.headers.get('content-type') === 'application/json') {
          return throwError(new HttpErrorResponse({
            error: JSON.parse(response.error),
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          }));
        }
      }
      return throwError(event);
    }));
  }
}
