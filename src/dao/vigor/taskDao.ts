import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { Task } from "entity/vigor/taskModel";

@singleton()
export class TaskDao extends TransactionDaoHelper<TaskDao> {
  public override repository = AppDataSource.getRepository(Task);

  create(task: Task): Promise<Task> {
    return this.repository.save(this.repository.create(task));
  }

  update(id: string, task: DeepPartial<Task>): Promise<UpdateResult> {
    return this.repository.update({ id }, task);
  }

  findById(id: string, relations?: (keyof Task)[]): Promise<Task> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, task: DeepPartial<Task>): Promise<Task> {
    const data = await this.repository
      .createQueryBuilder()
      .update(task)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as Task;
  }
}
