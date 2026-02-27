import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App], 
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render name in a h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Marco');
  });

  it('should have a downloadVCard method', () => {
    expect(component.downloadVCard).toBeDefined();
  });

  it('should have a projects section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#projects')).toBeTruthy();
  });
});