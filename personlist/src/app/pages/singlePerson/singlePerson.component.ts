import { ActivatedRoute, Router } from '@angular/router';
import { PersonServices } from './../../services/persons.sevices';
import { HttpClient } from '@angular/common/http';
import { Person } from './../../models/person.model';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'single-person-root',
  templateUrl: './singlePerson.component.html',
  styleUrls: ['./singlePerson.component.scss'],
})
export class SinglePersonComponent implements OnInit {
  title = 'Single Person';

  loading = true;   
  loadingError = false;

  deleting = false;
  deletingError = false;

  person: Person = {
    id: parseInt(this.activatedRoute.snapshot.paramMap.get('personId') ?? '0'),
    firstname: '',
    lastname: '',
    email: '',
  };

  private personServices: PersonServices = new PersonServices(this.http);

  constructor(
    private http: HttpClient,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    document.title = this.title;
    this.getSinglePerson(this.person.id);
  }

  getSinglePerson(id: number): void {
    this.loading = true;
    this.loadingError = false;
    this.personServices.getSinglePerson(id).subscribe({
      next: (person: Person) => {
        this.loading = false;
        this.person = person;
        document.title = `${person.firstname} ${person.lastname}`;
      },
      error: (error: any) => {
        this.loading = false;
        this.loadingError = true;
      },
    });
  }

  deletePerson(id: number): void {
    this.deleting = true;
    this.deletingError = false;

    this.personServices.deletePerson(id).subscribe({
      next: (resp: Array<Person>) => {
        this.deleting = false;
        this.route.navigate(['/']);
      },
      error: (error: any) => {
        this.deleting = false;
        this.deletingError = true;
      },
    });
  }
}
