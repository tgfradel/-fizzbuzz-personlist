import { SinglePersonComponent } from './singlePerson.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { Person } from 'src/app/models/person.model';

describe('SinglePersonComponent', () => {
  let component: SinglePersonComponent;
  let fixture: ComponentFixture<SinglePersonComponent>;
  let service: HttpClient;
  let compiled: any;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [SinglePersonComponent, NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePersonComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HttpClient);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', async () => {
    expect(service).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Single Person'`, async () => {
    expect(component.title).toEqual('Single Person');
  });

  it(`should render loading... only if loading is true`, async () => {
    /* should render */
    component.loading = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_loading')).toBeTruthy();

    /* should not render */
    component.loading = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_loading')).toBeFalsy();
  });

  it(`should render error if loading is false and loadingError is true`, async () => {
    /* should render */
    component.loading = false;
    component.loadingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_loading_error')).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.loadingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_loading_error')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_loading_error')).toBeFalsy();
  });

  it(`should render a person only if loading is false and loadingError is false`, async () => {
    /* should render */
    component.loading = false;
    component.loadingError = false;
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    fixture.detectChanges();
    expect(
      compiled.querySelector('#single_person_loading_success')
    ).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.loadingError = false;
    fixture.detectChanges();
    expect(
      compiled.querySelector('#single_person_loading_success')
    ).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = true;
    fixture.detectChanges();
    expect(
      compiled.querySelector('#single_person_loading_success')
    ).toBeFalsy();
  });

  it(`should render a delete button only if loading is false, loadingError is false, deleting is false`, async () => {
    /* should render */
    component.loading = false;
    component.loadingError = false;
    component.deleting = false;
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_delete_button')).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.loadingError = false;
    component.deleting = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_delete_button')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = true;
    component.deleting = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_delete_button')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = false;
    component.deleting = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_delete_button')).toBeFalsy();
  });

  it(`should render a deleting... only if loading is false, loadingError is false, deleting is true`, async () => {
    /* should render */
    component.loading = false;
    component.loadingError = false;
    component.deleting = true;
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_deleting')).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.loadingError = false;
    component.deleting = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_deleting')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = true;
    component.deleting = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_deleting')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = false;
    component.deleting = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_deleting')).toBeFalsy();
  });

  it(`should render a deletingError... only if loading is false, loadingError is false, and deletingError is true`, async () => {
    /* should render */
    component.loading = false;
    component.loadingError = false;
    component.deletingError = true;
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    fixture.detectChanges();
    expect(
      compiled.querySelector('#single_person_deleting_error')
    ).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.loadingError = false;
    component.deletingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_deleting_error')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = true;
    component.deletingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_deleting_error')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = false;
    component.deletingError = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#single_person_deleting_error')).toBeFalsy();
  });

  it(`should run ngOnInit when the reload button is clicked`, fakeAsync(() => {
    const compiled = fixture.nativeElement;
    component.loading = false;
    component.loadingError = true;
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    fixture.detectChanges();

    spyOn(component, 'ngOnInit');
    const reloadButton = compiled.querySelector('#reload_button');
    reloadButton.click();
    tick();
    expect(component.ngOnInit).toHaveBeenCalled();
  }));

  it(`should run deletePerson when the delete button is clicked`, fakeAsync(() => {
    const compiled = fixture.nativeElement;
    component.loading = false;
    component.loadingError = false;
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    fixture.detectChanges();

    spyOn(component, 'deletePerson');
    const deletePersonButton = compiled.querySelector(
      '#single_person_delete_button'
    );
    deletePersonButton.click();
    tick();
    expect(component.deletePerson).toHaveBeenCalled();
  }));
});
