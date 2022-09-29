import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  @Input() articles: IArticle[] =[];

  constructor() { }

  ngOnInit() {}

}
