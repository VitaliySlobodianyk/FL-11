import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  get ID() {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
  }
  constructor() { }
}
