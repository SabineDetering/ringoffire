import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPlayerComponent } from './dialog-edit-player.component';

describe('DialogEditPlayerComponent', () => {
  let component: DialogEditPlayerComponent;
  let fixture: ComponentFixture<DialogEditPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
