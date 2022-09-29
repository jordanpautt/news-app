import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  articleData$!: Observable<IArticle[]>;
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
     this.articleData$ =  this.newsService.readTopHeadlines();
  }
}
