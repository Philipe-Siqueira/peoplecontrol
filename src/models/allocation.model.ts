import { Entity, model, property, belongsTo } from '@loopback/repository';
import { User, UserWithRelations } from './user.model';
import { Project, ProjectWithRelations } from './project.model';

@model({
  settings: {
    foreignKeys: {
      projectId: {
        name: 'projectId',
        entity: 'Project',
        entityKey: 'id',
        foreignKey: 'projectId',
      },
      userId: {
        name: 'userId',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userId',
      },
    },
  },
})
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

  @belongsTo(() => User, { keyFrom: 'userId' }, { name: 'userId' })
  userId: number;

  @belongsTo(() => Project, { keyFrom: 'projectId' }, { name: 'projectId' })
  projectId: number;

  constructor(data?: Partial<Allocation>) {
    super(data);
  }
}

export interface AllocationRelations {
  // describe navigational properties here
  user?: UserWithRelations;
  project?: ProjectWithRelations;
}

export type AllocationWithRelations = Allocation & AllocationRelations;
