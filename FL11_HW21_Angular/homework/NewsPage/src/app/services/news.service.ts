import { Injectable } from '@angular/core';
import { NewsSource } from '../models/newsSource.module';
import { HttpClient } from '@angular/common/http';
import { IResponce } from '../intefaces/responce';
import { element } from 'protractor';
import { IdService } from './id.service';
import { NewItem } from '../models/new-item.module';



@Injectable({
  providedIn: 'root'
})


export class NewsService {

  private API_KEY = '119fe21e2ccf4d80aa33756ca22e7234';
  private news: NewsSource[] = [
    {
      title: 'Technologies',
      isWebResource: true,
      url: 'https://newsapi.org/v2/top-headlines?country=ua&category=technology&apiKey=',
      source: []
    },
    {
      title: 'Science',
      isWebResource: true,
      url: 'https://newsapi.org/v2/top-headlines?country=ua&category=science&apiKey=',
      source: []
    },
    {
      title: 'Local News',
      isWebResource: false,
      source: [

      ]
    }
  ];

  private allSources = 'All';
  get allSourcesTitle() {
    return this.allSources;
  }

  getTitles() {
    return this.news.map(
      (el) => el.title
    );
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
    return this.news.find(element => element.title === title);
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

  constructor(private http: HttpClient) {
    this.news.forEach(news => news.isWebResource ? this.fillNews(news)
      .subscribe(data => this.subscribe(data, news)) : null);
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
  pushNews(news: NewItem, source: NewsSource) {
        
    
  }
}
