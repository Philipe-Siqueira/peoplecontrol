import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Allocation>) {
    super(data);
  }
}

export interface AllocationRelations {
  // describe navigational properties here
}

export type AllocationWithRelations = Allocation & AllocationRelations;
