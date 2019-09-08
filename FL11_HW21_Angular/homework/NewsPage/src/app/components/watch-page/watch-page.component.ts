import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { NewItem } from 'src/app/models/new-item.module';
@Component({
  selector: 'app-watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.scss']
})
export class WatchPageComponent implements OnInit {
  private source: string;
  private url: string;
  newsItem: NewItem;
  constructor(private router: ActivatedRoute, private news: NewsService) {

  }

  ngOnInit() {
    this.router.paramMap.subscribe(
      (params: ParamMap) => {
        this.source = params.get('source');
        this.url = params.get('url');
      }
    );

    let serviceResponce: any = this.news.getSpecialItem(this.source, this.url);
    if (serviceResponce === -1) {
      setTimeout(() => {
        serviceResponce = this.news.getSpecialItem(this.source, this.url);
        this.newsItem = serviceResponce;
      }, 1000);
    } else {
      this.newsItem = serviceResponce;
    }
  }

}
