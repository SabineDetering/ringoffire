import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }
  takeCard() {
    if (!this.takeCardAnimation) {
      //take the last card of the stack
      this.currentCard = this.game.stack.pop();
      console.log(this.game);
      this.takeCardAnimation = true;

      setTimeout(() => {
        this.takeCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

