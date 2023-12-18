import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnRefreshGameDialogComponent } from './warn-refresh-game-dialog.component';

describe('WarnRefreshGameDialogComponent', () => {
  let component: WarnRefreshGameDialogComponent;
  let fixture: ComponentFixture<WarnRefreshGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarnRefreshGameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarnRefreshGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
