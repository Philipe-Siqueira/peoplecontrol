import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Allocation extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  period?: string;

  @property({
    type: 'date',
    required: true,
    default: '$now',
  })
  created_at: string;

  @property({
    type: 'date',
    required: true,
    default: '$now',
  })
  updated_at: string;

  @hasMany(() => User, {keyTo: 'userId'})
  users: User[];

  constructor(data?: Partial<Allocation>) {
    super(data);
  }
}

export interface AllocationRelations {
  // describe navigational properties here
}

export type AllocationWithRelations = Allocation & AllocationRelations;
