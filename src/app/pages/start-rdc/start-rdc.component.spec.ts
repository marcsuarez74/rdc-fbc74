import { TestBed } from "@angular/core/testing";
import { StartRdcComponent } from "@rdc/pages/start-rdc/start-rdc.component";

describe('StartRdcComponent',  () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartRdcComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(StartRdcComponent);
    const startRdcComponent = fixture.componentInstance;
    expect(startRdcComponent).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(StartRdcComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log('compiled', compiled);
    expect(compiled.querySelector('h1')?.textContent).toContain('Jeu de la ronde des Carrées');
  });


})
