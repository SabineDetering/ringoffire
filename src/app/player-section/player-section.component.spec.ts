import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSectionComponent } from './player-section.component';

describe('PlayerSectionComponent', () => {
  let component: PlayerSectionComponent;
  let fixture: ComponentFixture<PlayerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
