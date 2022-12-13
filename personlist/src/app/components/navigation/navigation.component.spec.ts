import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });
  
  it('should create the app', async () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render the navigation with title only if title is defined`, async () => {
    /* should render */
    component.title = 'Nav title';
    fixture.detectChanges();
    expect(compiled.querySelector('#navigation_component')).toBeTruthy();
    expect(compiled.querySelector('#navigation_title')?.textContent).toEqual(
      'Nav title'
    );

    /* should not render */
    component.title = undefined;
    fixture.detectChanges();
    expect(compiled.querySelector('#navigation_component')).toBeFalsy();
  });
});
