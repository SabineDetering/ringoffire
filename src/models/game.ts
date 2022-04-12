export class Game {
    public players: string[] = ['Petra','Susanne','Michaela'];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public playedIndices: number[] = [];
    public allIndices: number[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);

        for (let i = 0; i < 52; i++){
            this.allIndices.push(i);
        }
    }
    
}

/**
 * Fisher-Yates Shuffle for shuffling the card stack in place
 * @param array 
 * @returns array 
 */
function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex:number;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
