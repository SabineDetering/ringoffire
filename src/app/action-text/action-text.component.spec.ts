import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTextComponent } from './action-text.component';

describe('ActionTextComponent', () => {
  let component: ActionTextComponent;
  let fixture: ComponentFixture<ActionTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
