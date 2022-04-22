import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game.class';
import { Player } from 'src/models/player.class';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { trigger, state, style, animate, transition, keyframes, query, stagger, useAnimation } from '@angular/animations';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  })

export class GameComponent implements OnInit {
  game: Game;
  gameId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

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
          this.game.allIndices = game.allIndices;
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.playedIndices = game.playedIndices;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.isTaken = game.isTaken;
          this.game.currentFace = game.currentFace;
        });
      console.log('game in component after subscription', this.game);
    });

    setTimeout(() => { this.game.distribute = false }, 4000);
  }


  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }


  reset() {
    this.game = new Game();
    // this.game.distribute = true;
    this.saveGame();
    setTimeout(() => { this.game.distribute = false }, 4000);
    this.saveGame();
  }


  takeCard(index: number) {
    if (!this.game.isTaken[index]) {
      this.game.currentFace = this.game.stack[index].face;
      this.game.playedIndices.push(index);
      this.game.isTaken[index] = true;
      console.log('index: ', index, 'card: ', this.game.currentFace);
      //shifts the list of players to move current player to top
      if (this.game.players.length > 1) {
        this.game.players.push(this.game.players.shift());
      }
      this.saveGame();
      console.log('player', this.game.currentPlayer);
    }
  }


  addDialog(): void {
    const addPlayerDialogRef = this.dialog.open(DialogAddPlayerComponent);

    addPlayerDialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data.playerName) {
        this.game.players.push({
          'playerName': data.playerName, 'avatar': data.selectedAvatar
        });
        this.saveGame();
      }
    });
  }


  shareDialog(): void { }

}