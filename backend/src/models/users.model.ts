import {Entity, model, property} from '@loopback/repository';

enum Role {
  Admin = 'Admin',
  User = 'User',
  Subscriber = 'Subscriber',
  SuperAdmin = 'SuperAdmin',
}

@model({
  settings: {mysql: {schema: 'testdb', table: 'User'}},
})
// @model({settings: {strict: false}})
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
  })
  phoneNumber?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
    default: 'user',
  })
  role: Role;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
