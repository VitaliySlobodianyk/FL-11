import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NewItem } from 'src/app/models/new-item.module';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnChanges {
  @Input() newsItem: NewItem;
  title: string;
  description: string;
  urlToImage: string;
  date: Date;
  url: string;
  theme: string;
  author: string;
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if (this.newsItem) {
      this.title = this.newsItem.title;
      this.description = this.newsItem.description;
      this.urlToImage = this.newsItem.urlToImage;
      this.date = this.newsItem.publishedAt;
      this.url = this.newsItem.url;
      this.theme = this.newsItem.theme;
      this.author = this.newsItem.author;
    }
  }
}
