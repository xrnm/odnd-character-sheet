import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CharacterSpellSlotsComponent } from './character-spell-slots.component';

describe('CharacterSpellSlotsComponent', () => {
  let component: CharacterSpellSlotsComponent;
  let fixture: ComponentFixture<CharacterSpellSlotsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSpellSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSpellSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
