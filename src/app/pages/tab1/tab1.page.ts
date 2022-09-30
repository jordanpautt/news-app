import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infinteSroll: IonInfiniteScroll;
  articleData: IArticle[] = [];
  constructor(private newsServices: NewsService) {}

  ngOnInit(): void {
   this.newsServices.readTopHeadlines().subscribe((data) => {
    this.articleData = data;
   });
  }


  loadData() {
    this.newsServices
      .readTopHeadlinesByCategory('business', true)
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
