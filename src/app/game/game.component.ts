import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { trigger, state, style, animate, transition, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('takingCardAnimation', [

      state('false', style('*')),

      state('true', style({
        zIndex: '{{ level }}',
        transform: ' translate(6vh) rotateY(180deg) rotate({{ degrees }}deg) '
      }), { params: {  degrees: 0, level: 0 } }),
      transition('* => true', [
        animate('1s',
          // keyframes([
          //   style({ transform: 'rotate({{ orgDegrees }}deg) translateY(-35vh)' }) 
          // ])
        )
      ]),
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

