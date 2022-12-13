import { Person } from './../../models/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonServices } from './../../services/persons.sevices';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'update-person-root',
  templateUrl: './updatePerson.component.html',
  styleUrls: ['./updatePerson.component.scss'],
})
export class UpdatePersonComponent implements OnInit {
  title: string = 'Edit Person';

  loading = false;
  loadingError = false;

  updating = false;
  updatingError = false;

  checkoutForm = this.formBuilder.group({
    firstname: '',
    lastname: '',
    email: '',
  });
  person: Person = new Person(
    parseInt(this.activatedRoute.snapshot.paramMap.get('personId') ?? '0')
  );

  private personServices: PersonServices = new PersonServices(this.http);

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    document.title = this.title;
    this.getSinglePerson(this.person.id);
  }

  updatePerson(): void {
    this.updating = true;
    this.updatingError = false;

    this.person.firstname = this.checkoutForm.value.firstname ?? '';
    this.person.lastname = this.checkoutForm.value.lastname ?? '';
    this.person.email = this.checkoutForm.value.email ?? '';

    this.personServices.updatePerson(this.person.id, this.person).subscribe({
      next: (resp: Person) => {
        this.updating = false;
        this.route.navigate([`/single-person/${resp.id}`]);
      },
      error: (error: any) => {
        this.updating = false;
        this.updatingError = true;
      },
    });
  }

  getSinglePerson(id: number): void {
    this.loading = true;
    this.loadingError = false;
    this.personServices.getSinglePerson(id).subscribe({
      next: (resp: Person) => {
        this.loading = false;
        this.checkoutForm.setValue({
          firstname: resp.firstname,
          lastname: resp.lastname,
          email: resp.email,
        });
      },
      error: (error: any) => {
        this.loading = false;
        this.loadingError = true;
      },
    });
  }
}
