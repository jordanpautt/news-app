import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sportst',
    'Technology',
  ];

  selectedCategoty: string = this.categories[0];
  articleData$!: Observable<IArticle[]>;
  constructor(private newsServices: NewsService) {}

  ngOnInit(): void {
   this.readNews();
  }

  readNews(): void{
    this.articleData$ = this.newsServices
    .readTopHeadlines(this.selectedCategoty);
  }

  segmentChanged(category: any): void {
    this.selectedCategoty = category.detail.value;
    this.readNews();
  }
}
