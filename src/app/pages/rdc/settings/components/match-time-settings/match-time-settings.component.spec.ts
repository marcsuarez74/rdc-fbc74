import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTimeSettingsComponent } from './match-time-settings.component';

describe('MatchTimeSettingsComponent', () => {
  let component: MatchTimeSettingsComponent;
  let fixture: ComponentFixture<MatchTimeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchTimeSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchTimeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
