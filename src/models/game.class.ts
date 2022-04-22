import { Player } from "./player.class";

export class Game {
    public distribute = true;
    public players: Player[] = [];
    public stack: any[] = [];
    public playedIndices: number[] = [];
    public currentPlayer: number = 0;
    public isTaken: boolean[] = [];
    public currentFace: string = '';
    public gameOver: boolean = false;

    constructor() {
        // create all card faces
        for (let i = 1; i < 14; i++) {
            this.stack.push({ face: i + '_of_clubs' });
            this.stack.push({ face: i + '_of_diamonds' });
            this.stack.push({ face: i + '_of_hearts' });
            this.stack.push({ face: i + '_of_spades' });
        }
        //shuffle randomly
        shuffle(this.stack);

        //set parameters needed for animation
        for (let i = 0; i < this.stack.length; i++) {
            const card = this.stack[i];
            //angle to build circle from all cards
            card.orgDegrees = i * 6.75;
            //parameters for position when card is taken
            card.degrees = this.setAngle(i);
            card.XOffset = this.setOffset();
            card.YOffset = this.setOffset();
        }

        for (let i = 0; i < 52; i++) {
            this.isTaken.push(false);
        }
    }


    /**
     * random number to specify the twist of the card after been taken
     * @param index - index of card
     * @returns number - angle used in css-variable degrees
     */
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


    /**
     * random number to be used as x or y offset for taken card
     * @returns number
     */
    setOffset() {
        return (Math.random() - 0.5) * 30;
    }


    /**
     * translates in game properties into JSON
     * @returns JSON with all properties of game
     */
    public toJson() {
        return {
            distribute: this.distribute,
            players: this.players,
            stack: this.stack,
            playedIndices: this.playedIndices,
            currentPlayer: this.currentPlayer,
            isTaken: this.isTaken,
            currentFace: this.currentFace,
            gameOver:this.gameOver
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