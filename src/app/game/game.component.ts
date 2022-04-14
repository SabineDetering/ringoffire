import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { trigger, state, style, animate, transition, keyframes, query, stagger, useAnimation } from '@angular/animations';
import { takeCardAnimation } from 'src/models/animation';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('takingCard', [
      state('false', style('*')),
      state('true', style({
        zIndex: '{{ level }}',
        transform: '  rotateX(-180deg)  translateX({{ XOffset }}vh)  rotate({{ degrees }}deg)'
      }), {
        params: {
          degrees: 0,
          level: 0,
          XOffset: 0
        }
      }),
      transition('* => true', [
        useAnimation(takeCardAnimation)
      ], {
        params: {
          interDegrees: 0,
          orgDegrees: 0,
          XOffset: -6
        }
      }),
    ])
  ]
})

export class GameComponent implements OnInit {
  isTaken: boolean[] = []
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) {
    for (let i = 0; i < 52; i++) {
      this.isTaken.push(false);
    }
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }


  takeCard(index: number) {
    this.currentCard = this.game.stack[index];
    this.game.playedIndices.push(index);
    this.isTaken[index] = true;
    console.log('index: ', index, 'card: ', this.currentCard);
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
    console.log('player', this.game.currentPlayer);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }
}

