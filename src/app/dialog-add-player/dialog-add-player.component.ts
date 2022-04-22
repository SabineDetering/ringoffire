import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  form: FormGroup;
  
  avatars: string[] = [
    'girl-long-hair.png',
    'boy-orange.png',
    'girl-orange.png',
    'girl.png',
    'man-beard.png',
    'man-bold.png'
  ]
  standardAvatar = this.avatars[0];

  constructor(private formBuilder: FormBuilder, private addPlayerDialogRef: MatDialogRef<DialogAddPlayerComponent>) {
    this.form = this.formBuilder.group({ playerName: '', selectedAvatar: '' })
  }

  ngOnInit(): void {
  }

  submit(form) {
    this.addPlayerDialogRef.close(`${form.value}`);
    console.log('submit ', form.value);

  }

}
