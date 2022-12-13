import { Person } from '../../models/person.model';
import { PersonServices } from '../../services/persons.sevices';
import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'person-root',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  deleting = false;
  deletingError = false;

  @Input() person?: Person;
  @Output() removeOneFromPersons: EventEmitter<number> =
    new EventEmitter<number>();

  private personServices: PersonServices = new PersonServices(this.http);

  constructor(private http: HttpClient) {}

  deletePerson(id: number) {
    this.deleting = true;
    this.deletingError = false;

    this.personServices.deletePerson(id).subscribe({
      next: (persons: Array<Person>) => {
        this.deleting = false;
        if (this.removeOneFromPersons) {
          this.removeOneFromPersons.emit(id);
        }
      },
      error: () => {
        this.deleting = false;
        this.deletingError = true;
      },
    });
  }
}
