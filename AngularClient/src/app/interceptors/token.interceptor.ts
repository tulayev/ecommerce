import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '@app/pages/account/account.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    token?: string;

    constructor(private readonly accountService: AccountService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.accountService.currentUser$.pipe(take(1))
            .subscribe(user => this.token = user?.token);

        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }
        
        return next.handle(request);
    }
}
