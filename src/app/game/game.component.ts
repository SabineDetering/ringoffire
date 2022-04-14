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
  degrees: number = 0;
  counter: number = 0;

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


  // takeCard(index: number) {
  //   if (!this.takeCardAnimation) {
  //     //take the last card of the stack
  //     this.currentCard = this.game.stack.pop();
  //     this.game.playedIndices.push(index);
  //     console.log(this.game);
  //     this.takeCardAnimation = true;

  //     setTimeout(() => {
  //       this.takeCardAnimation = false;
  //       this.game.playedCards.push(this.currentCard);
  //     }, 1000);
  //   }
  // }

  takeCard(index: number) {
    this.currentCard = this.game.stack[index];
    this.game.playedIndices.push(index);
    this.isTaken[index] = true;
    console.log('index: ', index, 'card: ', this.currentCard);
    this.counter++;
    console.log('counter', this.counter);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

