import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() buttonDisabled: boolean;
  @Output() public sourceSelected = new EventEmitter();
  @Output() public searchInitialized = new EventEmitter();
  @Output() public navigate = new EventEmitter();
  onSourceSelected(event) {

    this.sourceSelected.emit(event);
  }
  onSearch(element) {
    this.searchInitialized.emit(element);
  }
  constructor() {
    this.onSourceSelected = this.onSourceSelected.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  onNavigate() {
    this.navigate.emit();
  }
  ngOnInit() {
  }

}
