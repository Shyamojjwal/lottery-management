import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from '@app-services/storage.service';
import { AuthenticationService } from '../authentication';

import swal from "sweetalert2";
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
    private storageService: StorageService,
    private _authService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const headersConfig: any = {};

    /**
     * If token found setting it in header
     */
    const token: string = this._authService.getToken();

    if(this._authService.isAuthenticated()) {
      headersConfig['Authorization'] = 'Bearer ' + token;
    }

    const HTTPRequest = request.clone({ setHeaders: headersConfig });

    const reqCloned =  this.handleBodyIn(HTTPRequest);
    const copiedReq = reqCloned;

    return next.handle(copiedReq).pipe(
      catchError( (error: HttpErrorResponse) => {
        return throwError(() => this.errorHandler(request, error))
      })
    );

    // return next.handle(request);
  }

  handleBodyIn(req:HttpRequest<any>) {
    return req;    
  }

  errorHandler = (request:any, error: any) => {
    console.log("errorHandler: ", error);
    if (error.status === 401) {
      swal.fire({
        icon: 'warning',
        html: 'Unable to reach server, please try after some time.',
        confirmButtonColor: '#1B4383'
      }).then(() => {
        this._authService.clearUserInfo();
        this._router.navigate(["/auth"]);
      });
      this.storageService.clear();
    } else if (error.status == 0 || (error.status >= 500 && error.status < 600)) {
      swal.fire({
        icon: 'error',
        html: 'Unable to reach server, please try after some time.',
        confirmButtonColor: '#1B4383'
      });
    }
    return error
  }
}
