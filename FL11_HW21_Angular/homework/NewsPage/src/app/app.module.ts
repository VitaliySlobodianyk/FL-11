import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SourcesComponent } from './components/sources/sources.component';
import { ButtonComponent } from './components/common/button/button.component';
import { NewsContainerComponent } from './components/news-container/news-container.component';
import { TitlePipePipe } from './pipes/title-pipe.pipe';
import { NewsService } from './services/news.service';
import {HttpClientModule} from '@angular/common/http';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { AddFormComponent } from './components/add-form/add-form.component';



@NgModule({
  declarations: [
    AppComponent,
    NewsItemComponent,
    SettingsComponent,
    SearchBarComponent,
    SourcesComponent,
    ButtonComponent,
    NewsContainerComponent,
    TitlePipePipe,
    RoutingComponents,
    AppHeaderComponent,
    NewsCardComponent,
    AddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
