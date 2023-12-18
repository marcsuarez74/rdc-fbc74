import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersSettingsComponent } from './players-settings.component';

describe('PlayersSettingsComponent', () => {
  let component: PlayersSettingsComponent;
  let fixture: ComponentFixture<PlayersSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
