import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PersonServices } from './persons.sevices';
import { HttpErrorResponse } from '@angular/common/http';
import { Person } from '../models/person.model';

describe('PersonServices', () => {
  let httpController: HttpTestingController;
  let personServices: PersonServices;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonServices],
    });
    httpController = TestBed.inject(HttpTestingController);
    personServices = TestBed.inject(PersonServices);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', async () => {
    expect(personServices).toBeTruthy();
  });

  it('should return expected persons when get all persons', (done: DoneFn) => {
    const expectedPersones = [
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

    personServices.getPersons().subscribe({
      next: (persons: any) => {
        expect(persons)
          .withContext('expected persons')
          .toEqual(expectedPersones);
        done();
      },
      error: done.fail,
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons');

    expect(req.request.method).toEqual('GET');

    req.flush(expectedPersones);
  });

  it('should return an error if the server returned an error response when get all persons', (done: DoneFn) => {
    const expectedErrorResponse = new HttpErrorResponse({
      statusText: 'test error',
    });

    personServices.getPersons().subscribe({
      next: (person: Person[]) => {
        done.fail('expected an error, not persons');
      },
      error: (error: HttpErrorResponse) => {
        expect(error.statusText).toContain('test error');
        done();
      },
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons');

    expect(req.request.method).toEqual('GET');

    req.flush('', expectedErrorResponse);
  });

  it('should return expected person with id 2', (done: DoneFn) => {
    const expectedPerson = {
      id: 2,
      firstname: 'Lina',
      lastname: 'Wagner',
      email: 'Lina.Wagner@hotmail.de',
    };

    personServices.getSinglePerson(2).subscribe({
      next: (person: Person) => {
        expect(person).withContext('expected persons').toEqual(expectedPerson);
        done();
      },
      error: done.fail,
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons/2');

    expect(req.request.method).toEqual('GET');

    req.flush(expectedPerson);
  });

  it('should return an error if the server returned an error response when get single person with id 2', (done: DoneFn) => {
    const expectedErrorResponse = new HttpErrorResponse({
      statusText: 'test error',
    });

    personServices.getSinglePerson(2).subscribe({
      next: (person: Person) => {
        done.fail('expected an error, not persons');
      },
      error: (error: { statusText: any }) => {
        expect(error.statusText).toContain('test error');
        done();
      },
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons/2');

    expect(req.request.method).toEqual('GET');

    req.flush('', expectedErrorResponse);
  });

  it('should add a person with id 7', (done: DoneFn) => {
    const inputPerson = {
      id: 0,
      firstname: 'Lina',
      lastname: 'Wagner',
      email: 'Lina.Wagner@hotmail.de',
    };
    const expectedPerson = {
      id: 7,
      firstname: 'Lina',
      lastname: 'Wagner',
      email: 'Lina.Wagner@hotmail.de',
    };

    personServices.addPerson(inputPerson).subscribe({
      next: (person: Person) => {
        expect(person).withContext('expected persons').toEqual(expectedPerson);
        done();
      },
      error: done.fail,
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons');

    expect(req.request.method).toEqual('POST');

    req.flush(expectedPerson);
  });

  it('should return an error if the server returned an error response when add a person', (done: DoneFn) => {
    const inputPerson = {
      id: 0,
      firstname: 'Lina',
      lastname: 'Wagner',
      email: 'Lina.Wagner@hotmail.de',
    };
    const expectedErrorResponse = new HttpErrorResponse({
      statusText: 'test error',
    });
    personServices.addPerson(inputPerson).subscribe({
      next: (person: Person) => {
        done.fail('expected an error, not persons');
      },
      error: (error: { statusText: any }) => {
        expect(error.statusText).toContain('test error');
        done();
      },
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons');

    expect(req.request.method).toEqual('POST');

    req.flush('', expectedErrorResponse);
  });

  it('should update a person with id 2', (done: DoneFn) => {
    const expectedPerson = {
      id: 2,
      firstname: 'Lina',
      lastname: 'Wagner',
      email: 'Lina.Wagner@hotmail.de',
    };

    personServices.updatePerson(2, expectedPerson).subscribe({
      next: (person: Person) => {
        expect(person).withContext('expected persons').toEqual(expectedPerson);
        done();
      },
      error: done.fail,
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons/2');

    expect(req.request.method).toEqual('PUT');

    req.flush(expectedPerson);
  });

  it('should return an error if the server returned an error response when update a person', (done: DoneFn) => {
    const expectedPerson = {
      id: 2,
      firstname: 'Lina',
      lastname: 'Wagner',
      email: 'Lina.Wagner@hotmail.de',
    };
    const expectedErrorResponse = new HttpErrorResponse({
      statusText: 'test error',
    });
    personServices.updatePerson(2, expectedPerson).subscribe({
      next: (person: Person) => {
        done.fail('expected an error, not persons');
      },
      error: (error: { statusText: any }) => {
        expect(error.statusText).toContain('test error');
        done();
      },
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons/2');

    expect(req.request.method).toEqual('PUT');

    req.flush('', expectedErrorResponse);
  });

  it('should delete a person with id 2', (done: DoneFn) => {
    const expectedPerson = [
      {
        id: 2,
        firstname: 'Lina',
        lastname: 'Wagner',
        email: 'Lina.Wagner@hotmail.de',
      },
    ];

    personServices.deletePerson(2).subscribe({
      next: (persons: Person[]) => {
        expect(persons).withContext('expected persons').toEqual(expectedPerson);
        done();
      },
      error: done.fail,
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons/2');

    expect(req.request.method).toEqual('DELETE');

    req.flush(expectedPerson);
  });

  it('should return an error if the server returned an error response when delete a person', (done: DoneFn) => {
    const expectedErrorResponse = new HttpErrorResponse({
      statusText: 'test error',
    });
    personServices.deletePerson(2).subscribe({
      next: (persons: Person[]) => {
        done.fail('expected an error, not persons');
      },
      error: (error: { statusText: any }) => {
        expect(error.statusText).toContain('test error');
        done();
      },
    });

    const req = httpController.expectOne('http://localhost:3000/api/persons/2');

    expect(req.request.method).toEqual('DELETE');

    req.flush('', expectedErrorResponse);
  });
});
