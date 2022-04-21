import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../player/player.component';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent implements OnInit {
  player: {
    playerName?: string,
    avatar?: string
  };

  avatars: string[] = [
    'girl-long-hair.png',
    'boy-orange.png',
    'girl-orange.png',
    'girl.png',
    'man-beard.png',
    'man-bold.png'
  ]
  constructor(public dialogRef: MatDialogRef<DialogEditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.player = data;
  }

  ngOnInit(): void {
  }

  
  savePlayer(value: any) {
    console.log(value);
    this.player = value;
    console.log(value);
  }
}
