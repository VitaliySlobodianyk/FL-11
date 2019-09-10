import { Injectable } from '@angular/core';
import { NewsSource } from '../models/newsSource.module';
import { HttpClient } from '@angular/common/http';
import { IResponce } from '../intefaces/responce';
import { element } from 'protractor';
import { IdService } from './id.service';
import { NewItem } from '../models/new-item.module';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class NewsService {

  private API_KEY = '119fe21e2ccf4d80aa33756ca22e7234';

  private news: NewsSource[] = [];

  private allSources = 'All';
  get allSourcesTitle() {
    return this.allSources;
  }

  private localSource = 'Local News';
  get mainLocalSource() {
    return this.localSource;
  }

  getTitles(news) { return news.map(el => el.title); }
  getIndexByElement(item: NewsSource) {
    if (this.news) {
      return this.news.indexOf(item);
    }
    return -1;
  }

  fillNews(item: NewsSource) {
    return this.http.get<IResponce>(`${item.url}${this.API_KEY}`);
  }

  subscribe(data: IResponce, parentSource: NewsSource) {
    parentSource.source = data.articles.map(
      (el => {
        return {
          title: el.title,
          description: el.description,
          urlToImage: el.urlToImage,
          publishedAt: el.publishedAt,
          theme: parentSource.title,
          author: el.source.name,
          url: el.url
        };
      }
      ));
  }

  searchByTitle(title: string) {
    if(this.news.length){  
      const result: NewsSource = this.news.find(element => element.title === title);
      return result ? result : null;
    }
  }

  getAllSources(): NewsSource {
    return {
      title: this.allSources,
      isWebResource: false,
      source: this.concatAllNews()
    };
  }
  private concatAllNews() {
    return this.news.reduce((acc, val: NewsSource) => acc.concat(val.source), []);
  }

  filterByTitle(title: string, sourceElement: NewsSource) {
    return sourceElement.source.filter(element =>
      element.title.toLowerCase().includes(title.toLowerCase()));
  }

  constructor(private http: HttpClient, private db: FirebaseService) {

    this.db.dataStream.subscribe((news) => {
      this.news = news;
      this.news.forEach(el => {
        if (!el.source) {
          el.source = [];
        }
        return el.isWebResource ? this.fillNews(el)
          .subscribe(data => this.subscribe(data, el)) : null
      });
    });
  }

  getThemes() {
    return this.news;
  }

  getSpecialItem(source: string, url: string) {
    const newItem = this.searchByTitle(source);
    if (newItem.source.length === 0 && newItem.isWebResource) {
      return -1;
    }
    return (newItem.source.find(el => el.url === url));
  }
  pushNews(news: NewItem) {
    if (news) {
      const source = this.searchByTitle(news.theme);
      if (source) {
        source.source.unshift(news);
        this.db.update(this.getIndexByElement(source).toString(), source);
      }
    }
  }

}
