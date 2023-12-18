import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdcNavbarComponent } from './rdc-navbar.component';

describe('RdcNavbarComponent', () => {
  let component: RdcNavbarComponent;
  let fixture: ComponentFixture<RdcNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdcNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdcNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
