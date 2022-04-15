import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { trigger, state, style, animate, transition, keyframes, query, stagger, useAnimation } from '@angular/animations';
import { takeCardAnimation } from 'src/models/animation';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router, private firestore: AngularFirestore) {
    for (let i = 0; i < 52; i++) {
      this.isTaken.push(false);
    }
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params);
    });
    this.firestore.collection('games').valueChanges().subscribe(game => {
      console.log('game update', game)
    });
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
    this.firestore.collection('games').add(this.game.toJson());
  }


  takeCard(index: number) {
    this.currentCard = this.game.stack[index];
    this.game.playedIndices.push(index);
    this.isTaken[index] = true;
    console.log('index: ', index, 'card: ', this.currentCard);
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
    console.log('player', this.game.currentPlayer);
  }
}

