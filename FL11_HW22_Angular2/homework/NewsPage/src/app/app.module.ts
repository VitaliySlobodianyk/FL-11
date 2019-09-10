import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { AddFormComponent } from './components/add-form/add-form.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './services/firebase.service';


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
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [NewsService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
