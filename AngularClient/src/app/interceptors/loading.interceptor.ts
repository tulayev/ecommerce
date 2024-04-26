import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from '@app/services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private readonly loaderService: LoaderService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!request.url.includes('emailExists')) {
            this.loaderService.busy();
        }
        
        return next.handle(request).pipe(
            delay(1000),
            finalize(() => this.loaderService.idle())
        );
    }
}
