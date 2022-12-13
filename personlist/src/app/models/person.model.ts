export class Person {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  constructor(
    id?: number,
    firstname?: string,
    lastname?: string,
    email?: string
  ) {
    this.id = id ?? 0;
    this.firstname = firstname ?? '';
    this.lastname = lastname ?? '';
    this.email = email ?? '';
  }
}
