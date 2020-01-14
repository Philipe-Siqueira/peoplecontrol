import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Allocation,
  User,
} from '../models';
import {AllocationRepository} from '../repositories';

export class AllocationUserController {
  constructor(
    @repository(AllocationRepository) protected allocationRepository: AllocationRepository,
  ) { }

  @get('/allocations/{id}/users', {
    responses: {
      '200': {
        description: 'Array of User\'s belonging to Allocation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.allocationRepository.users(id).find(filter);
  }

  @post('/allocations/{id}/users', {
    responses: {
      '200': {
        description: 'Allocation model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Allocation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInAllocation',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.allocationRepository.users(id).create(user);
  }

  @patch('/allocations/{id}/users', {
    responses: {
      '200': {
        description: 'Allocation.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.allocationRepository.users(id).patch(user, where);
  }

  @del('/allocations/{id}/users', {
    responses: {
      '200': {
        description: 'Allocation.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.allocationRepository.users(id).delete(where);
  }
}
