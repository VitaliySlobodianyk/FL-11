import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NewItem } from '../../models/new-item.module';
import { NewsService } from 'src/app/services/news.service';
import { NewsSource } from 'src/app/models/newsSource.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  newsTheme: string;
  news: NewItem[];
  linkToSource: NewsSource;
  buttonDisabled = true;
  loadNews(event) {
    if (event.target.value === this.newsService.allSourcesTitle) {
      this.linkToSource = this.newsService.getAllSources();
    } else {
      this.linkToSource = this.newsService.searchByTitle(event.target.value);
      this.buttonDisabled = this.linkToSource.isWebResource;
    }
    this.news = this.linkToSource.source;
    this.newsTheme = event.target.value;
  }
  filterNews(event) {
    if (event.value && this.linkToSource) {
      this.news = this.newsService.filterByTitle(event.value, this.linkToSource);
    } else if (this.linkToSource) {
      this.news = this.linkToSource.source;
    }
  }
  switchAddPage() {
    console.log('Navigaate');
    this.router.navigate(['/create', { theme: this.newsTheme }]);
  }

  constructor(private newsService: NewsService, private router: Router) { }
  ngOnInit() {
  }
}
