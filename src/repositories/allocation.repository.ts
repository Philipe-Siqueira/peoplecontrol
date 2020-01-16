import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Allocation, AllocationRelations, User, Project } from '../models';
import { DbcontrolDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { UserRepository } from './user.repository';
import { ProjectRepository } from './project.repository';

export class AllocationRepository extends DefaultCrudRepository<
  Allocation,
  typeof Allocation.prototype.id,
  AllocationRelations
  > {

  public readonly user: BelongsToAccessor<User, typeof Allocation.prototype.id>;

  public readonly project: BelongsToAccessor<Project, typeof Allocation.prototype.id>;

  constructor(
    @inject('datasources.dbcontrol') dataSource: DbcontrolDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(Allocation, dataSource);
    this.project = this.createBelongsToAccessorFor('project', projectRepositoryGetter);
    this.registerInclusionResolver('project', this.project.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}

