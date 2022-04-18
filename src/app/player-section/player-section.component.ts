import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-player-section',
  templateUrl: './player-section.component.html',
  styleUrls: ['./player-section.component.scss']
})
export class PlayerSectionComponent implements OnInit {

  @Input() game: Game;

  constructor(private comp:GameComponent) { }

  ngOnInit(): void {
  }

}
