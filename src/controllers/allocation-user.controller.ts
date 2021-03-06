import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Allocation,
  User,
} from '../models';
import {AllocationRepository} from '../repositories';

export class AllocationUserController {
  constructor(
    @repository(AllocationRepository)
    public allocationRepository: AllocationRepository,
  ) { }

  @get('/allocations/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Allocation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Allocation.prototype.id,
  ): Promise<User> {
    return this.allocationRepository.user(id);
  }
}
