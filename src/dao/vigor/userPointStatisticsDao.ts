import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { UserPointStatistics } from "entity/vigor/userPointStatisticsModel";

@singleton()
export class EventDao extends TransactionDaoHelper<EventDao> {
  public override repository = AppDataSource.getRepository(UserPointStatistics);

  create(userPointStatistics: UserPointStatistics): Promise<UserPointStatistics> {
    return this.repository.save(this.repository.create(userPointStatistics));
  }

  update(id: string, userPointStatistics: DeepPartial<UserPointStatistics>): Promise<UpdateResult> {
    return this.repository.update({ id }, userPointStatistics);
  }

  findById(id: string, relations?: (keyof UserPointStatistics)[]): Promise<UserPointStatistics> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, userPointStatistics: DeepPartial<UserPointStatistics>): Promise<UserPointStatistics> {
    const data = await this.repository
      .createQueryBuilder()
      .update(userPointStatistics)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as UserPointStatistics;
  }
}
