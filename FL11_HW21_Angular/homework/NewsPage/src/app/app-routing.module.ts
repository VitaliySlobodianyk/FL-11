import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { WatchPageComponent } from './components/watch-page/watch-page.component';
import { CreatePageComponent } from './components/create-page/create-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainPageComponent
  },
  {
    path: 'watch/:source/:url',
    component: WatchPageComponent
  },
  {
    path: 'create',
    component: CreatePageComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [MainPageComponent, WatchPageComponent, CreatePageComponent];
