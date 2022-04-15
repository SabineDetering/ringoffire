import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-text',
  templateUrl: './action-text.component.html',
  styleUrls: ['./action-text.component.scss']
})
export class ActionTextComponent implements OnInit, OnChanges {
  actions = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as the player who drew the card stops drinking, the next player may stop drinking, then the player next to them, and so on.' },
    { title: 'You', description: 'Choose someone else to drink.' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: "Category", description: "Come up with a category (e.g. colors). Each player names something belonging to the category. The first player who can't must drink." },
    { title: 'Bust a jive', description: 'Perform a dance move. The next player repeats the move and adds a second one, and so on. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks.' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumb Master', description: 'When you place your thumb on the table everyone else must follow and whoever is last must drink. You are the thumb master till someone else picks a five.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Never have I ever...', description: 'Say something you have never done. Everyone who has done it must     drink.' },
    { title: 'Question Master', description: 'Any question you ask must be answered ending with " Mr/Mrs Question Master" until the next Queen is drawn.' },
    { title: 'Rule', description: 'Make up a rule. Everyone (including you) must follow this rule for the entire game. Anyone disobeying must drink.' },
  ];

  title = '';
  description = '';
  @Input() card: string;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if (this.card) {
      let currentType = +this.card.split('_')[0];
      this.title = this.actions[currentType - 1].title;
      this.description = this.actions[currentType - 1].description;
    }
  }

}
