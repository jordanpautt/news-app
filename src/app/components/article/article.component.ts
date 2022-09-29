import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article!: IArticle;
  @Input() index = 0;
  constructor() {}

  ngOnInit() {}
}
