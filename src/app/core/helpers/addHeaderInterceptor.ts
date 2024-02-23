import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const params = new URLSearchParams(window.location.search)
      , modifiedReq = req.clone({ 
          headers: req.headers.set('Authorization', `Bearer ${params.get('token')}`),
        });
    return next.handle(modifiedReq);
  }
}