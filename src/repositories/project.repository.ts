import {DefaultCrudRepository} from '@loopback/repository';
import {Project, ProjectRelations} from '../models';
import {DbcontrolDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {
  constructor(
    @inject('datasources.dbcontrol') dataSource: DbcontrolDataSource,
  ) {
    super(Project, dataSource);
  }
}
