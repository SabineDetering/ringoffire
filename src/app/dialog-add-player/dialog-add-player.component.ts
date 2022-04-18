import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  name: string = '';
  selectedAvatar: string;
  avatars: string[] = [
    'assets/img/profile-pics/boy-orange.png',
    'assets/img/profile-pics/girl-long-hair.png',
    'assets/img/profile-pics/girl-orange.png',
    'assets/img/profile-pics/girl.png',
    'assets/img/profile-pics/man-beard.png',
    'assets/img/profile-pics/man-bold.png'    
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
