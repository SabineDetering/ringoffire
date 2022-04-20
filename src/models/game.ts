export class Game {
    public distribute = true;
    public players: any[] = [];
    public stack: any[] = [];
    public playedCards: string[] = [];
    public playedIndices: number[] = [];
    public allIndices: number[] = [];
    public currentPlayer: number = 0;
    public isTaken: boolean[] = [];
    public currentFace: string = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push({ face: i + '_of_clubs' });
            this.stack.push({ face: i + '_of_diamonds' });
            this.stack.push({ face: i + '_of_hearts' });
            this.stack.push({ face: i + '_of_spades' });
        }
        shuffle(this.stack);

        for (let i = 0; i < this.stack.length; i++) {
            const card = this.stack[i];
            //angle to build circle from all cards
            card.orgDegrees = i * 6.75;
            //angle needed for intermediate step of transition
            card.interDegrees = i < 14 || i > 39 ? -i * 6.75 : 0;
            //parameters for position when card is taken
            card.degrees = this.setAngle(i);
            card.XOffset = this.setOffset();
            card.YOffset = this.setOffset();
        }

        for (let i = 0; i < 52; i++) {
            this.allIndices.push(i);
            this.isTaken.push(false);
        }
    }

    setAngle(index: number) {
        let randomTwist = (Math.random() - 0.5) * 70;
        if (index < 14) {
            return randomTwist;
        } else if (index > 39) {
            return randomTwist + 360;
        } else {
            return randomTwist + 180;
        }
    }


    setOffset() {
        return (Math.random() - 0.5) * 30;
    }


    public toJson() {
        return {
            distribute: this.distribute,
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            playedIndices: this.playedIndices,
            allIndices: this.allIndices,
            currentPlayer: this.currentPlayer,
            isTaken: this.isTaken,
            currentFace: this.currentFace
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
    let randomIndex: number;

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
