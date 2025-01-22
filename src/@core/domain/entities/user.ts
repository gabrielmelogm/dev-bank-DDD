import { v4 as uuid } from 'uuid';

interface UserProps {
  id?: string;
  name: string;
  email: string;
}

export class User {
  id?: string;
  name: string;
  email: string;

  constructor(user: UserProps) {
    this.id = user.id ?? uuid();
    this.name = user.name;
    this.email = user.email;
  }
}
