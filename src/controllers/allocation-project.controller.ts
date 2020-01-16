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
  Project,
} from '../models';
import {AllocationRepository} from '../repositories';

export class AllocationProjectController {
  constructor(
    @repository(AllocationRepository)
    public allocationRepository: AllocationRepository,
  ) { }

  @get('/allocations/{id}/project', {
    responses: {
      '200': {
        description: 'Project belonging to Allocation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async getProject(
    @param.path.number('id') id: typeof Allocation.prototype.id,
  ): Promise<Project> {
    return this.allocationRepository.project(id);
  }
}
