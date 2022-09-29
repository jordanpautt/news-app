import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INewsResponse, IArticle } from '../interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  readTopHeadlines(category: string = 'business'): Observable<IArticle[]> {
    const optionParams = {
      apiKey: environment.apiKey,
      country: 'us',
      category,
    };

    const url = `${environment.hostname}top-headlines`;

    return this.executeQuery<INewsResponse>(url, optionParams).pipe(
      map((resp) => resp.articles)
    );
  }

  private executeQuery<T>(url: string, query: any) {
    return this.http.get<T>(url, { params: { ...query } });
  }
}
