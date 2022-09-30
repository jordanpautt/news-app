import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  INewsResponse,
  IArticle,
  IArticlesByCategoryAndPage,
} from '../interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private articlesByCategory: IArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) {}

  readTopHeadlines(): Observable<IArticle[]> {
    return this.readArticlesByCategory('business');
  }

  readTopHeadlinesByCategory(
    category: string,
    loadMore: boolean = false
  ): Observable<IArticle[]> {
    if (loadMore) {
      return this.readArticlesByCategory(category);
    }

    if (this.articlesByCategory[category]) {
      return of(this.articlesByCategory[category].articles);
    }

    return this.readArticlesByCategory(category);
  }

  private readArticlesByCategory(category: string): Observable<IArticle[]> {
    if (!Object.keys(this.articlesByCategory).includes(category)) {
      this.articlesByCategory[category] = {
        page: 0,
        articles: [],
      };
    }
    const page = this.articlesByCategory[category].page + 1;

    const optionParams = {
      apiKey: environment.apiKey,
      country: 'us',
      category,
      page,
    };

    const url = `${environment.hostname}top-headlines`;

    return this.executeQuery<INewsResponse>(url, optionParams).pipe(
      map(({ articles }) => {
        if (!articles.length) {
          return this.articlesByCategory[category].articles;
        }
        this.articlesByCategory[category] = {
          page,
          articles: [
            ...this.articlesByCategory[category].articles,
            ...articles,
          ],
        };

        return this.articlesByCategory[category].articles;
      })
    );
  }

  private executeQuery<T>(url: string, query: any) {
    return this.http.get<T>(url, { params: { ...query } });
  }
}
