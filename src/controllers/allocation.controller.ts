import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Allocation} from '../models';
import {AllocationRepository} from '../repositories';

export class AllocationController {
  constructor(
    @repository(AllocationRepository)
    public allocationRepository : AllocationRepository,
  ) {}

  @post('/allocations', {
    responses: {
      '200': {
        description: 'Allocation model instance',
        content: {'application/json': {schema: getModelSchemaRef(Allocation)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Allocation, {
            title: 'NewAllocation',
            exclude: ['id'],
          }),
        },
      },
    })
    allocation: Omit<Allocation, 'id'>,
  ): Promise<Allocation> {
    return this.allocationRepository.create(allocation);
  }

  @get('/allocations/count', {
    responses: {
      '200': {
        description: 'Allocation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Allocation)) where?: Where<Allocation>,
  ): Promise<Count> {
    return this.allocationRepository.count(where);
  }

  @get('/allocations', {
    responses: {
      '200': {
        description: 'Array of Allocation model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Allocation, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Allocation)) filter?: Filter<Allocation>,
  ): Promise<Allocation[]> {
    return this.allocationRepository.find(filter);
  }

  @patch('/allocations', {
    responses: {
      '200': {
        description: 'Allocation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Allocation, {partial: true}),
        },
      },
    })
    allocation: Allocation,
    @param.query.object('where', getWhereSchemaFor(Allocation)) where?: Where<Allocation>,
  ): Promise<Count> {
    return this.allocationRepository.updateAll(allocation, where);
  }

  @get('/allocations/{id}', {
    responses: {
      '200': {
        description: 'Allocation model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Allocation, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Allocation)) filter?: Filter<Allocation>
  ): Promise<Allocation> {
    return this.allocationRepository.findById(id, filter);
  }

  @patch('/allocations/{id}', {
    responses: {
      '204': {
        description: 'Allocation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Allocation, {partial: true}),
        },
      },
    })
    allocation: Allocation,
  ): Promise<void> {
    await this.allocationRepository.updateById(id, allocation);
  }

  @put('/allocations/{id}', {
    responses: {
      '204': {
        description: 'Allocation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() allocation: Allocation,
  ): Promise<void> {
    await this.allocationRepository.replaceById(id, allocation);
  }

  @del('/allocations/{id}', {
    responses: {
      '204': {
        description: 'Allocation DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.allocationRepository.deleteById(id);
  }
}
