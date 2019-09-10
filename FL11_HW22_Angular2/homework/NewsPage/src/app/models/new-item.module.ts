import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NewItem {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: Date;
  theme: string;
  author: string;
  url: string;
 }
