import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit(): void {
  }


  /**
   * go back to previous page
   */
  goBack() {
    this.location.back();
  }

}
