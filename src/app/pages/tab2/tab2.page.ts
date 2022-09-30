import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { IArticle } from 'src/app/interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infinteSroll: IonInfiniteScroll;

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
  articleData: IArticle[] = [];
  subcription!: Subscription;
  constructor(private newsServices: NewsService) {}

  ngOnInit(): void {
    this.readNews();
  }

  readNews(): void {
    this.subcription = this.newsServices
      .readTopHeadlinesByCategory(this.selectedCategoty)
      .subscribe((data) => {
        this.articleData = data;
      });
  }

  segmentChanged(category: Event): void {
    this.selectedCategoty = (category as CustomEvent).detail.value;
    this.readNews();
  }

  loadData() {
    this.newsServices
      .readTopHeadlinesByCategory(this.selectedCategoty, true)
      .subscribe((data) => {

        if (data.length === this.articleData.length) {
          this.infinteSroll.disabled = true;
          return;
        }

        this.articleData = data;
        this.infinteSroll.complete();
      });
  }
}
