import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@app/models';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ReviewService {
    private baseUrl = environment.apiUrl;

    constructor(private readonly httpClient: HttpClient) { }

    postReview(model: any): Observable<Review> {
        return this.httpClient.post<Review>(`${this.baseUrl}/reviews`, model);
    }
}
