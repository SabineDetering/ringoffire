import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html',
  styleUrls: ['./dialog-share.component.scss']
})
export class DialogShareComponent implements OnInit {

  public path:string = window.location.href;

  constructor(){}

  ngOnInit(): void {
  }
}
