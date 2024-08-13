import { Repository } from "typeorm";
import { EntityManager } from "typeorm/entity-manager/EntityManager";

/**
 Creates a new Dao instance with repository from EntityManager.
 @example:
  export class AreaOwnerDao extends TransactionDaoHelper<AreaOwnerDao> {}

*/
export class TransactionDaoHelper<T extends TransactionDaoHelper<any>> {
  public repository: Repository<any>;
  public withTransaction(manager: EntityManager): T {
    const obj = Object.create(this); // create a new object instead of a singleton
    obj.repository = manager.getRepository(this.repository.target);
    return obj;
  }
}
