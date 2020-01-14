import {DefaultCrudRepository} from '@loopback/repository';
import {Allocation, AllocationRelations} from '../models';
import {DbcontrolDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AllocationRepository extends DefaultCrudRepository<
  Allocation,
  typeof Allocation.prototype.id,
  AllocationRelations
> {
  constructor(
    @inject('datasources.dbcontrol') dataSource: DbcontrolDataSource,
  ) {
    super(Allocation, dataSource);
  }
}
