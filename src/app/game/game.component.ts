import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { trigger, state, style, animate, transition, keyframes, query, stagger, useAnimation } from '@angular/animations';
import { takeCardAnimation } from 'src/models/animation';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('takingCard', [
      state('false', style('*')),
      state('true', style({
        zIndex: '{{ level }}',
        transform: '  rotateX(-180deg)  translateX({{ XOffset }}vh) translateY({{ YOffset }}px) rotate({{ degrees }}deg)'
      }), {
        params: {
          degrees: 0,
          level: 0,
          XOffset: 0,
          YOffset: 0
        }
      }),
      transition('* => true', [
        useAnimation(takeCardAnimation)
      ], {
        params: {
          interDegrees: 0,
          orgDegrees: 0,
          XOffset: -6,
          YOffset: 0
        }
      }),
      // transition('void => true', [
      //   useAnimation(takeCardAnimation)
      // ], {
      //   params: {
      //     interDegrees: 0,
      //     orgDegrees: 0,
      //     XOffset: -6,
      // YOffset: 0
      //   }
      // })
    ])
  ]
})

export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  // startFirstGame = false;
  distribute = true;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('page loaded');
    this.newGame();
    // console.log('game directly after loading ',this.game);
    this.route.params.subscribe((params) => {
      console.log('game id ', params['id']);
      this.gameId = params['id'];

      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .pipe(throttle(val=>interval(1000)))
        .subscribe((game: any) => {
          console.log('game update from firestore', game);
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

    setTimeout(() => { this.distribute = false }, 4000);
  }


  newGame() {
    this.game = new Game();
    // console.log(this.game);
  }
  reset() {
    this.game = new Game();
    this.saveGame();
  }


  takeCard(index: number) {
    if (!this.game.isTaken[index]) {
      this.game.currentFace = this.game.stack[index].face;
      this.game.playedIndices.push(index);
      this.game.isTaken[index] = true;
      console.log('index: ', index, 'card: ', this.game.currentFace);
      //shifts the list of players to position current player on top
      this.game.players.push( this.game.players.shift());
      this.saveGame();
      console.log('player', this.game.currentPlayer);
    }
  }


  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }



  addDialog(): void {
    const addPlayerDialogRef = this.dialog.open(DialogAddPlayerComponent);

    addPlayerDialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data.playerName) {
        this.game.players.push({ 'playerName': data.playerName, 'avatar': data.selectedAvatar
});
        this.saveGame();
      }
    });
  }


  editDialog(): void { }
}