import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private readonly router: Router, private readonly toastr: ToastrService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error) {
                    if (error.status === 400) {
                        if (error.error.errors) {
                            throw error.error;
                        } else {
                            this.toastr.error(error.error.message, error.status.toString());
                        }
                    }
                    if (error.status === 401) {
                        this.toastr.error(error.error.message, error.status.toString());
                    }
                    if (error.status === 404) {
                        this.toastr.error(error.error.message, error.status.toString());
                        this.router.navigateByUrl('/not-found');
                    }
                    if (error.status === 500) {
                        this.toastr.error(error.error.message, error.status.toString());
                        this.router.navigateByUrl('/server-error');
                    }
                }

                return throwError(() => new Error(error.message));
            })
        );
    }
}
