export class Game {
    public players: string[] = ['Petra', 'Susanne', 'Michaela'];
    public stack: any[] = [];
    public playedCards: string[] = [];
    public playedIndices: number[] = [];
    public allIndices: number[] = [];
    public currentPlayer: number = 0;
    public isTaken: boolean[] = [];
    public currentCard: string = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push(i + '_of_clubs');
            this.stack.push(i + '_of_diamonds');
            this.stack.push(i + '_of_hearts');
            this.stack.push(i + '_of_spades');
        }
        shuffle(this.stack);

        for (let i = 0; i < 52; i++) {
            this.allIndices.push(i);
            this.isTaken.push(false);
        }
    }


    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            playedIndices: this.playedIndices,
            allIndices: this.allIndices,
            currentPlayer: this.currentPlayer,
            isTaken: this.isTaken,
            currentCard: this.currentCard
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
