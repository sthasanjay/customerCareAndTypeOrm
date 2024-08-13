import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { TaskApplyLog } from "entity/vigor/taskApplyLogModel";

@singleton()
export class EventDao extends TransactionDaoHelper<EventDao> {
  public override repository = AppDataSource.getRepository(TaskApplyLog);

  create(taskApplyLog: TaskApplyLog): Promise<TaskApplyLog> {
    return this.repository.save(this.repository.create(taskApplyLog));
  }

  update(id: string, taskApplyLog: DeepPartial<TaskApplyLog>): Promise<UpdateResult> {
    return this.repository.update({ id }, taskApplyLog);
  }

  findById(id: string, relations?: (keyof TaskApplyLog)[]): Promise<TaskApplyLog> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, taskApplyLog: DeepPartial<TaskApplyLog>): Promise<TaskApplyLog> {
    const data = await this.repository
      .createQueryBuilder()
      .update(taskApplyLog)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as TaskApplyLog;
  }
}
