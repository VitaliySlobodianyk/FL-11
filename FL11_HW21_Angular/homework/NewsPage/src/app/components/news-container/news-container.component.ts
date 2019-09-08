import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewItem } from 'src/app/models/new-item.module';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss']
})
export class NewsContainerComponent implements OnInit {
  @Input() news: NewItem[];
  constructor() { }


  ngOnInit() {
  }

}
