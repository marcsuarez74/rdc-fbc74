import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountFieldSettingsComponent } from './count-field-settings.component';

describe('CountFieldSettingsComponent', () => {
  let component: CountFieldSettingsComponent;
  let fixture: ComponentFixture<CountFieldSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountFieldSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountFieldSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
