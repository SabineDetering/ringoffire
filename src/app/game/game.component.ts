import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { DialogShareComponent } from '../dialog-share/dialog-share.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})

export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  actionTextHidden = false;

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public dialog: MatDialog) { }


  /**
   * initialises game and subscribes updates from firestore
   * timeout to mark when distribution of cards is completed
   */
  ngOnInit(): void {
    console.log('page loaded');
    this.game = new Game();
    this.route.params.subscribe((params) => {
      console.log('game id ', params['id']);
      this.gameId = params['id'];

      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .pipe(throttle(() => interval(500)))
        .subscribe((game: any) => {
          console.log('game update from firestore', game);
          this.game.distribute = game.distribute;
          if (!this.game.currentPlayer == game.currentPlayer) {
            this.game.currentPlayer = game.currentPlayer;
          }
          this.game.playedIndices = game.playedIndices;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.isTaken = game.isTaken;
          this.game.currentFace = game.currentFace;
          this.game.gameOver = game.gameOver;
        });
      console.log('game: ', this.game);
    });
    // distribution of cards is completed
    setTimeout(() => { this.game.distribute = false }, 4000);
  }


  /**
   * save game to firestore
   */
  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }


  /**
   * start new game, players stay
   */
  reset() {
    let players = this.game.players;
    this.game = new Game();
    this.game.players = players;
    this.saveGame();
    setTimeout(() => { this.game.distribute = false }, 4000);
    this.saveGame();
  }


  /**
   * sets currentFace to taken cards face (triggers takeCardAnimation)
   * saves taken index in playedIndices (used to "staple" played cards in correct order)
   * sets isTaken true (after takeCardAnimation animation) (fixes card in the middle and disables onclick)
   * currentPlayer is changed to the next player in the row
   * saves game
   * when all cards are taken: initiates showing gameOver image
   * @param index - index of taken card
   */
  takeCard(index: number) {
    if (this.game.players.length > 1 && !this.game.isTaken[index]) {
      if (this.actionTextHidden) { this.actionTextHidden = false }
      this.game.currentFace = this.game.stack[index].face;
      this.game.playedIndices.push(index);
      console.log('index: ', index, 'card: ', this.game.currentFace);
      this.saveGame();
      setTimeout(() => {
        this.game.isTaken[index] = true;
        this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
        console.log('player', this.game.currentPlayer);
        this.saveGame();
      }, 1000);

      if (this.game.playedIndices.length == 52) {
        setTimeout(() => {
          this.game.currentFace = '';
          this.game.gameOver = true;
          this.saveGame();
        }, 4000);
      }
    }
  }


  /**
   * hides or unhides action text to make bottom cards accessible
   */
  toggleHide() {
    this.actionTextHidden = !this.actionTextHidden;
  }


  /**
   * calls dialog to add a new player
   */
  addDialog(): void {
    const addPlayerDialogRef = this.dialog.open(DialogAddPlayerComponent);

    addPlayerDialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.game.players.push({
          'playerName': data.playerName,
          'avatar': data.avatar
        });
        this.saveGame();
      }
    });
  }


  /**
   * calls a dialog to facilitate copying the url of the game
   */
  shareDialog(): void {
    this.dialog.open(DialogShareComponent);
  }
}