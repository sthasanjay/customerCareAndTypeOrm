import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";

import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { AreaOfInterest } from "entity/vigor/areaOfInterestModel";

@singleton()
export class AreaOfInterestDao extends TransactionDaoHelper<AreaOfInterestDao> {
  public override repository = AppDataSource.getRepository(AreaOfInterest);

  create(areaOfInterest: AreaOfInterest): Promise<AreaOfInterest> {
    return this.repository.save(this.repository.create(areaOfInterest));
  }

  update(id: string, areaOfInterest: DeepPartial<AreaOfInterest>): Promise<UpdateResult> {
    return this.repository.update({ id }, areaOfInterest);
  }

  findById(id: string, relations?: (keyof AreaOfInterest)[]): Promise<AreaOfInterest> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, areaOfInterest: DeepPartial<AreaOfInterest>): Promise<AreaOfInterest> {
    const data = await this.repository
      .createQueryBuilder()
      .update(areaOfInterest)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as AreaOfInterest;
  }
}
