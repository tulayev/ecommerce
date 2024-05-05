import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Address, User } from '@app/models';
import { environment } from '@src/environments/environment';
import { Observable, ReplaySubject, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private apiUrl = environment.apiUrl;
    private currentUserSource = new ReplaySubject<User | null>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private readonly httpClient: HttpClient, private readonly router: Router) { }

    loadCurrentUser(token: string | null): Observable<User | null> {
        if (token == null) {
            this.currentUserSource.next(null);
            return of(null);
        }
        
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);

        return this.httpClient.get<User>(`${this.apiUrl}/account`, { headers }).pipe(
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

    login(values: any): Observable<void> {
        return this.httpClient.post<User>(`${this.apiUrl}/account/login`, values).pipe(
            map(user => {
                localStorage.setItem('token', user.token);
                this.currentUserSource.next(user);
            })
        );
    }

    register(values: any): Observable<void> {
        return this.httpClient.post<User>(`${this.apiUrl}/account/register`, values).pipe(
            map(user => {
                localStorage.setItem('token', user.token);
                this.currentUserSource.next(user);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUserSource.next(null);
        this.router.navigateByUrl('/');
    }

    checkEmailExists(email: string): Observable<boolean> {
        return this.httpClient.get<boolean>(`${this.apiUrl}/account/emailExists?email=${email}`);
    }

    getUserAddress(): Observable<Address> {
        return this.httpClient.get<Address>(`${this.apiUrl}/account/address`);
    }
    
    updateUserAddress(address: Address): Observable<Address> {
        return this.httpClient.put<Address>(`${this.apiUrl}/account/address`, address);
    }
}
