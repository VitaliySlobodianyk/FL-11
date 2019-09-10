import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlePipe'
})
export class TitlePipePipe implements PipeTransform {
  title = 'News Source';
  transform(value: string): string {
    if (!value) {
      return 'Select source to start';
    } else if (value.toLowerCase() === 'all') {
      return 'All News';
    } else if (value.toLowerCase() === 'add item') {
      return `${value}`;
    } else {
      return `${this.title}: ${value}`;
    }
  }

}
