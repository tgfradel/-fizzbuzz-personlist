import { HttpClient } from '@angular/common/http';
import { PersonComponent } from './person.component';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Person } from 'src/app/models/person.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let service: HttpClient;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HttpClient);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', async () => {
    const app = fixture.componentInstance;
    expect(service).toBeTruthy();
    expect(app).toBeTruthy();
  });

  it(`should render only if person was instantiate`, async () => {
    /* should render */
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    fixture.detectChanges();
    expect(compiled.querySelector('#person_component')).toBeTruthy();
    expect(compiled.querySelector('#person_fullname')?.textContent).toEqual(
      'Max Mustermann'
    );

    /* should not render */
    component.person = undefined;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_component')).toBeFalsy();
  });

  it(`should render the delete button if person was instantiate and deleting is false`, async () => {
    /* should render */
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    component.deleting = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#button_to_delete_person')).toBeTruthy();

    /* should not render */
    component.person = undefined;
    component.deleting = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#button_to_delete_person')).toBeFalsy();

    /* should not render */
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    component.deleting = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#button_to_delete_person')).toBeFalsy();
  });

  it(`should render the deleting... if person was instantiate and deleting is true`, async () => {
    /* should render */
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    component.deleting = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_deleting')).toBeTruthy();

    /* should not render */
    component.person = undefined;
    component.deleting = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_deleting')).toBeFalsy();

    /* should not render */
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    component.deleting = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_deleting')).toBeFalsy();
  });

  it(`should run deletePerson when the delete button is clicked`, fakeAsync(() => {
    spyOn(component, 'deletePerson');
    component.person = new Person(
      1,
      'Max',
      'Mustermann',
      'max.mustermann@test.de'
    );
    fixture.detectChanges();
    const deleteButton = compiled.querySelector('#button_to_delete_person');
    deleteButton.click();
    tick();
    expect(component.deletePerson).toHaveBeenCalled();
  }));
});
