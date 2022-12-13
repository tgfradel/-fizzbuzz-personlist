import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonServices {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getPersons(): Observable<Array<Person>> {
    return this.http
      .get<Array<Person>>('http://localhost:3000/api/persons')
      .pipe();
  }

  getSinglePerson(id: number): Observable<Person> {
    return this.http
      .get<Person>(`http://localhost:3000/api/persons/${id}`)
      .pipe();
  }

  addPerson(person: Person): Observable<Person> {
    return this.http
      .post<Person>(
        'http://localhost:3000/api/persons',
        person,
        this.httpOptions
      )
      .pipe();
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    return this.http
      .put<Person>(
        `http://localhost:3000/api/persons/${id}`,
        person,
        this.httpOptions
      )
      .pipe();
  }

  deletePerson(id: number): Observable<Array<Person>> {
    return this.http
      .delete<Array<Person>>(`http://localhost:3000/api/persons/${id}`)
      .pipe();
  }
}
