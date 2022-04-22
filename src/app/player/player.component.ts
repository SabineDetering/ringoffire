import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from 'src/models/game.class';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';

export interface DialogData {
  playerName: string;
  avatar: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: any;
  @Input() playerActive: boolean = false;
  @Input() indexofPlayer: number;
  @Input() game: Game;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editPlayer(index): void {
    let dialogRef = this.dialog.open(DialogEditPlayerComponent,
      {
        data: {
          playerName: this.player.playerName,
          avatar: this.player.avatar
        }
      });
    dialogRef.afterClosed().subscribe(change => {
      if (change == 'DELETE') {
        this.game.players.splice(index, 1);
      } else if (change) {
        this.player = change;
      }
    })
    // this.game.saveGame();
  }

}
