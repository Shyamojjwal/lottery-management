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

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
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
    return error
  }
}
