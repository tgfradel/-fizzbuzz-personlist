import { UpdatePersonComponent } from './updatePerson.component';
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
describe('UpdatePersonComponent', () => {
  let component: UpdatePersonComponent;
  let fixture: ComponentFixture<UpdatePersonComponent>;
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
      declarations: [UpdatePersonComponent, NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePersonComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HttpClient);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', async () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Edit Person'`, async () => {
    expect(component.title).toEqual('Edit Person');
  });

  it('should render loading... only if loading is true', () => {
    /* should render */
    component.loading = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_loading')).toBeDefined();

    /* should not render */
    component.loading = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_loading')).toBeDefined();
  });

  it(`should render 'Error on loading' only if loading is false and loadingError is true`, async () => {
    /* should render */
    component.loading = false;
    component.loadingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_loading_error')).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.loadingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_loading_error')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_loading_error')).toBeFalsy();
  });

  it(`should render the form only if loading is false and loadingError is false`, async () => {
    /* should render */
    component.loading = false;
    component.loadingError = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_update_form')).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.loadingError = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_update_form')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.loadingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_update_form')).toBeFalsy();
  });

  it(`should render the update button only if loading is false and updating is false`, async () => {
    /* should render */
    component.loading = false;
    component.updating = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_update_button')).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.updating = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_update_button')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.updating = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_update_button')).toBeFalsy();
  });

  it(`should run updatePerson when the update button is clicked`, fakeAsync(() => {
    component.loading = false;
    component.updating = false;
    component.checkoutForm.controls.firstname.setValue('Max');
    component.checkoutForm.controls.lastname.setValue('Mustermann');
    component.checkoutForm.controls.email.setValue('max.mustermann@test.de');
    fixture.detectChanges();

    spyOn(component, 'updatePerson');
    const updatePersonButton = compiled.querySelector('#person_update_button');
    updatePersonButton.click();
    tick();
    expect(component.updatePerson).toHaveBeenCalled();
  }));

  it(`should render 'Updating' only if loading is false and updating is true`, async () => {
    /* should render */
    component.loading = false;
    component.updating = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_updating')).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.updating = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_updating')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.updating = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_updating')).toBeFalsy();
  });

  it(`should render 'Error on Updating' only if loading is false and updatingError is true`, async () => {
    /* should render */
    component.loading = false;
    component.updatingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_updating_error')).toBeTruthy();

    /* should not render */
    component.loading = true;
    component.updatingError = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_updating_error')).toBeFalsy();

    /* should not render */
    component.loading = false;
    component.updatingError = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#person_updating_error')).toBeFalsy();
  });
});
