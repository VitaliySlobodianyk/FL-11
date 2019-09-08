import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewItem } from 'src/app/models/new-item.module';
import { Router } from '@angular/router'
@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() newItem: NewItem;

  public readMoreEnabled = false;

  redirect() {
      this.router.navigate(['/watch', this.newItem.theme, this.newItem.url]);
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
