import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { RedeemLog } from "entity/vigor/redeemLogModel";

@singleton()
export class EventDao extends TransactionDaoHelper<EventDao> {
  public override repository = AppDataSource.getRepository(RedeemLog);

  create(redeemLog: RedeemLog): Promise<RedeemLog> {
    return this.repository.save(this.repository.create(redeemLog));
  }

  update(id: string, redeemLog: DeepPartial<RedeemLog>): Promise<UpdateResult> {
    return this.repository.update({ id }, redeemLog);
  }

  findById(id: string, relations?: (keyof RedeemLog)[]): Promise<RedeemLog> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, redeemLog: DeepPartial<RedeemLog>): Promise<RedeemLog> {
    const data = await this.repository
      .createQueryBuilder()
      .update(redeemLog)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as RedeemLog;
  }
}
