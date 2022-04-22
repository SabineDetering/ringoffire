import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  @Input() firestore: AngularFirestore;
  @Input() gameId: string;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  /**
   * calls a dialog to edit a player
   * name and avatar can be changed or player be deleted completely
   * @param index - index of player in players
   */
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
        this.game.players[index].playerName = change.playerName;
        this.game.players[index].avatar = change.avatar;
      }
      this.saveGame();
    })
  }


  /**
   * save game to firestore
   */
  saveGame() {
    console.log('firestore', this.firestore, ' gameId: ', this.gameId, ' players: ', this.game.players)
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}
