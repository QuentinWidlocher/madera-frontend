import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';

// import { UserService } from './shared/services/user.service';

import { Observable } from 'rxjs';
import { catchError } from "rxjs/operators";
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth token from the service.
        // const authToken = this.user.getAuthorizationToken();

        if (req.headers.has(InterceptorSkipHeader)) {
            const headers = req.headers.delete(InterceptorSkipHeader);
            return next.handle(req.clone({ headers }));
        }
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq).pipe(catchError(event => {
            if (event instanceof HttpErrorResponse) {
                const response = event as HttpErrorResponse;
                if (response.headers.get('content-type') === 'application/json') {
                    return Observable.throw(new HttpErrorResponse({
                        error: JSON.parse(response.error),
                        headers: response.headers,
                        status: response.status,
                        statusText: response.statusText,
                        url: response.url,
                    }));
                }
            }
            return Observable.throw(event);
        }));
  }
}