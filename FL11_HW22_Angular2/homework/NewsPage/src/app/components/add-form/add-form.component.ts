import { Component, OnInit, Input } from '@angular/core';
import { NewItem } from 'src/app/models/new-item.module';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  @Input() theme: string;
  news: NewItem = {
    title: '',
    description: '',
    urlToImage: '',
    publishedAt: new Date(),
    theme: '',
    author: '',
    url: ''
  };
  onSubmit(event) {
    event.preventDefault();
    this.newsService.pushNews(this.news);
    this.router.navigate(['/home', { theme: this.news.theme }]);
  }
  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
    if (this.theme) {
      this.news.theme = this.theme;
    } else {
      this.news.theme = this.newsService.mainLocalSource;
    }
  }
}
