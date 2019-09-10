import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  ParamMap } from '@angular/router';
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  title = 'Add Item';
  theme: string;
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const theme = params.get('theme');
      if (theme) {
        this.theme = theme;
      }
    });
  }

}
