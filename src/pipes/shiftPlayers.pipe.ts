import { Pipe, PipeTransform } from '@angular/core';
import { Player } from 'src/models/player.class';
@Pipe({
    name: 'shiftPlayers',
    pure: false
})

export class ShiftPlayersPipe implements PipeTransform {
    transform(players: Player[], currentPlayer: number) {
        if (currentPlayer == 0) {
            return players;
        } else {
            return players.slice(currentPlayer).concat(players.slice(0, currentPlayer));
        }
    }
}