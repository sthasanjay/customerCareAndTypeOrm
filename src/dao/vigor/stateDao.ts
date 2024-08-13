import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { State } from "entity/vigor/stateModel";

@singleton()
export class StateDao extends TransactionDaoHelper<StateDao> {
  public override repository = AppDataSource.getRepository(State);

  create(state: State): Promise<State> {
    return this.repository.save(this.repository.create(state));
  }

  update(id: string, state: DeepPartial<State>): Promise<UpdateResult> {
    return this.repository.update({ id }, state);
  }

  findById(id: string, relations?: (keyof State)[]): Promise<State> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, state: DeepPartial<State>): Promise<State> {
    const data = await this.repository
      .createQueryBuilder()
      .update(state)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as State;
  }
}
