import { Component, OnInit, Input } from '@angular/core';
import { NewsSource } from '../../models/newsSource.module';
import { NewsService } from 'src/app/services/news.service';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  titles: string[];

  @Input() getNews: () => void;
  constructor(private news: NewsService, private db: FirebaseService) { }
  ngOnInit() {
    this.db.dataStream.subscribe(
      data => {
      this.titles = this.news.getTitles(data);
    });
  }

}
