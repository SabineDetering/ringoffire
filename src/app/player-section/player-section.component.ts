import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-player-section',
  templateUrl: './player-section.component.html',
  styleUrls: ['./player-section.component.scss']
})
export class PlayerSectionComponent implements OnInit {

  @Input() game: Game;
  @Input() firestore: AngularFirestore;
  @Input() gameId: string;

  constructor() { }

  ngOnInit(): void {
  }
}
