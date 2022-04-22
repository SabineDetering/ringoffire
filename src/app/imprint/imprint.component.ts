import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {


  constructor(private location: Location) { }


  ngOnInit(): void {
  }


  /**
   * go back to previous page
   */
  goBack() {
    this.location.back();
  }
}
