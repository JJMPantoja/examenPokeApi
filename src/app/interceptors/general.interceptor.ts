import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
  private loaderCounter: number = 0;
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderCounter++;
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderCounter--;
        if (!this.loaderCounter) {
          Swal.close();
        }
      })
    );
  }
}
