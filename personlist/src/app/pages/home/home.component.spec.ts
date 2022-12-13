import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { PersonComponent } from 'src/app/components/personComponent/person.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: HttpClient;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [HomeComponent, PersonComponent, NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HttpClient);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', async () => {
    expect(service).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Homepage'`, async () => {
    expect(component.title).toEqual('Homepage');
  });

  it(`should render loading... only if loading is true`, async () => {
    /* should render */
    component.loading = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#persons_is_loading')).toBeTruthy();

    /* should not render */
    component.loading = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#persons_is_loading')).toBeFalsy();
  });

  it(`should render error only if loading is false and loadingError is true`, async () => {
    /* should render */
    component.loading = false;
    component.loadingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#persons_is_loadingError')).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.loadingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#persons_is_loadingError')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#persons_is_loadingError')).toBeFalsy();
  });

  it(`should render list of persons only if loading is false and loadingError is false`, async () => {
    /* should render */
    component.loading = false;
    component.loadingError = false;
    component.persons = [
      {
        id: 1,
        firstname: 'Guiro',
        lastname: 'Tetsa',
        email: 'guiro.tetsa@gmail.com',
      },
      {
        id: 2,
        firstname: 'Lina',
        lastname: 'Wagner',
        email: 'Lina.Wagner@hotmail.de',
      },
      {
        id: 3,
        firstname: 'Peter',
        lastname: 'Alves',
        email: 'p.a@outlook.de',
      },
      {
        id: 4,
        firstname: 'Joe',
        lastname: 'Tedon',
        email: 'jtedon@yahoo.com',
      },
      {
        id: 5,
        firstname: 'Jasmin',
        lastname: 'Haller',
        email: 'jh002@gmail.de',
      },
    ];
    fixture.detectChanges();
    expect(compiled.querySelector('#persons_is_loadingSuccess')).toBeTruthy();
    expect(
      compiled.querySelector(`#person_item_${component.persons[0].id}`)
    ).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.loadingError = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#persons_is_loadingSuccess')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#persons_is_loadingSuccess')).toBeFalsy();
  });

  it(`should remove a person with id 3`, async () => {
    component.persons = [
      {
        id: 1,
        firstname: 'Guiro',
        lastname: 'Tetsa',
        email: 'guiro.tetsa@gmail.com',
      },
      {
        id: 2,
        firstname: 'Lina',
        lastname: 'Wagner',
        email: 'Lina.Wagner@hotmail.de',
      },
      {
        id: 3,
        firstname: 'Peter',
        lastname: 'Alves',
        email: 'p.a@outlook.de',
      },
      {
        id: 4,
        firstname: 'Joe',
        lastname: 'Tedon',
        email: 'jtedon@yahoo.com',
      },
      {
        id: 5,
        firstname: 'Jasmin',
        lastname: 'Haller',
        email: 'jh002@gmail.de',
      },
    ];
    component.removeOneFromPersons(3);
    fixture.detectChanges();
    expect(component.persons).toEqual([
      {
        id: 1,
        firstname: 'Guiro',
        lastname: 'Tetsa',
        email: 'guiro.tetsa@gmail.com',
      },
      {
        id: 2,
        firstname: 'Lina',
        lastname: 'Wagner',
        email: 'Lina.Wagner@hotmail.de',
      },
      {
        id: 4,
        firstname: 'Joe',
        lastname: 'Tedon',
        email: 'jtedon@yahoo.com',
      },
      {
        id: 5,
        firstname: 'Jasmin',
        lastname: 'Haller',
        email: 'jh002@gmail.de',
      },
    ]);
  });
});
