import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models';
import { environment } from '@src/environments/environment';
import { ReplaySubject, map, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    baseUrl = environment.apiUrl;
    private currentUserSource = new ReplaySubject<User | null>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private readonly httpClient: HttpClient, private readonly router: Router) { }

    loadCurrentUser(token: string | null) {
        if (token == null) {
            this.currentUserSource.next(null);
            return of(null);
        }
        
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);

        return this.httpClient.get<User>(`${this.baseUrl}/account`, { headers }).pipe(
            tap(console.log),
            map(user => {
                if (user) {
                    localStorage.setItem('token', user.token);
                    this.currentUserSource.next(user);
                    
                    return user;
                } else {
                    return null;
                }
            })
        );
    }

    login(values: any) {
        return this.httpClient.post<User>(`${this.baseUrl}/account/login`, values).pipe(
            map(user => {
                localStorage.setItem('token', user.token);
                this.currentUserSource.next(user);
            })
        );
    }

    register(values: any) {
        return this.httpClient.post<User>(`${this.baseUrl}/account/register`, values).pipe(
            map(user => {
                localStorage.setItem('token', user.token);
                this.currentUserSource.next(user);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        this.currentUserSource.next(null);
        this.router.navigateByUrl('/');
    }

    checkEmailExists(email: string) {
        return this.httpClient.get<boolean>(`${this.baseUrl}/account/emailExists?email=${email}`);
    }
}
