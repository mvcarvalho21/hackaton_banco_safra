import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';
import {environment} from "@environments/environment";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (String(err) === "Access Denied" || err.status === 401 || err.status === 403) {
      this.authenticationService.logout();
      this.router.navigate(['/session/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
      return of(err.message);
    }
    return throwError(err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authenticationService.currentUserValue;

    const url: Array<any> = request.url.split('/');
    const urlBackEnd: Array<any> = environment.apiUrl.split(':');
    // const validateURL = url[2] == urlBackEnd[0];
    const validateURL = true;

    if (currentUser && currentUser.authorization && validateURL) {
      if (url.includes('uploadFile') && request.method == 'POST') {
        request = request.clone({
          setHeaders: {
            // "Content-Type": "multipart/form-data",
            "Content-Disposition": "form-data",
            "Authorization": `Bearer ${currentUser.authorization}`
          }
        });
      } else {
        request = request.clone({
          setHeaders: {
            "Content-Type": "application/json",
            "withCredentials": "true",
            "Authorization": `Bearer ${currentUser.authorization}`
          }
        });
      }
    } else {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
        }
      });
    }

    // console.log('request', request);
    return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));
  }
}
