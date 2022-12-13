import { Router } from '@angular/router';
import { PersonServices } from './../../services/persons.sevices';
import { HttpClient } from '@angular/common/http';
import { Person } from './../../models/person.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'add-person-root',
  templateUrl: './addPerson.component.html',
  styleUrls: ['./addPerson.component.scss'],
})
export class AddPersonComponent implements OnInit {
  title = 'Add a new Person';

  creating = false;
  creatingError = false;

  checkoutForm = this.formBuilder.group({
    firstname: '',
    lastname: '',
    email: '',
  });

  person: Person = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
  };

  private personServices: PersonServices = new PersonServices(this.http);

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: Router
  ) {
    document.title = this.title;
  }
  ngOnInit(): void {}

  createPerson() {
    this.creating = true;
    this.creatingError = false;

    this.person.firstname = this.checkoutForm.value.firstname ?? '';
    this.person.lastname = this.checkoutForm.value.lastname ?? '';
    this.person.email = this.checkoutForm.value.email ?? '';

    this.personServices.addPerson(this.person).subscribe({
      next: (resp: Person) => {
        this.creating = false;
        this.route.navigate(['/']);
      },
      error: (error: any) => {
        this.creating = false;
        this.creatingError = true;
      },
    });
  }
}
