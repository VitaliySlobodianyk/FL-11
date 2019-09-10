import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewItem } from './new-item.module';
import { url } from 'inspector';
import { stringify } from '@angular/compiler/src/util';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NewsSource {
  title: string;
  isWebResource: boolean;
  url?: string;
  source?: NewItem[];
 }
