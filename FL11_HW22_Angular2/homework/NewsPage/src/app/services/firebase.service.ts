import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NewsSource } from '../models/newsSource.module';
import { NewsService } from './news.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  dataStream: Observable<NewsSource[]>;
  update(key,data) {
    this.db.list<NewsSource>('/news/news').update(key, data);
  }
  constructor(private db: AngularFireDatabase) {
    this.dataStream = this.db.list<NewsSource>('/news/news').valueChanges();
  }
}
