import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { AddPersonComponent } from './addPerson.component';

describe('AddPersonComponent', () => {
  let component: AddPersonComponent;
  let fixture: ComponentFixture<AddPersonComponent>;
  let service: HttpClient;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [AddPersonComponent, NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HttpClient);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', async () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Add a new Person'`, async () => {
    expect(component.title).toEqual('Add a new Person');
  });

  it(`should render the form`, async () => {
    expect(compiled.querySelector('#create_person_form')).toBeTruthy();
  });

  it(`should render the Add button only if creating is false`, async () => {
    /* should render */
    component.creating = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#create_person_button')).toBeTruthy();

    /* should not render*/
    component.creating = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#create_person_button')).toBeFalsy();
  });

  it('should render creating... only if creating is true', () => {
    component.creating = true;
    fixture.detectChanges();

    expect(compiled.querySelector('#person_creating')).toBeTruthy();

    component.creating = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_creating')).toBeFalsy();
  });

  it(`should render 'Error on Creating' only creatingError is true`, async () => {
    /* should render */
    component.creatingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_creating_error')).toBeTruthy();

    /* should not render*/
    component.creatingError = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_creating_error')).toBeFalsy();
  });

  it(`should run createPerson when the add button is clicked`, fakeAsync(() => {
    component.checkoutForm.controls.firstname.setValue('Max');
    component.checkoutForm.controls.lastname.setValue('Mustermann');
    component.checkoutForm.controls.email.setValue('max.mustermann@test.de');
    fixture.detectChanges();

    spyOn(component, 'createPerson');
    const createPersonButton = compiled.querySelector('#create_person_button');
    createPersonButton.click();
    tick();
    expect(component.createPerson).toHaveBeenCalled();
  }));
});
