import { PersonServices } from './../../services/persons.sevices';
import { Person } from './../../models/person.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Homepage';
  loading = true;
  loadingError = false;

  persons: Array<Person> = [];

  private personServices: PersonServices = new PersonServices(this.http);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    document.title = 'Home';
    this.loading = true;
    this.personServices.getPersons().subscribe({
      next: (resp: Array<Person>) => {
        this.loading = false;
        this.persons = resp;
      },
      error: (error: any) => {
        this.loading = false;
        this.loadingError = true;
      },
    });
  }

  removeOneFromPersons(id: number): void {
    this.persons = this.persons.filter((person) => person.id != id);
  }
}
