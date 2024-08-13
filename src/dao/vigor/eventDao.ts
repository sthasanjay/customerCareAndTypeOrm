import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { Event } from "entity/vigor/eventModel";

@singleton()
export class EventDao extends TransactionDaoHelper<EventDao> {
  public override repository = AppDataSource.getRepository(Event);

  create(event: Event): Promise<Event> {
    return this.repository.save(this.repository.create(event));
  }

  update(id: string, event: DeepPartial<Event>): Promise<UpdateResult> {
    return this.repository.update({ id }, event);
  }

  findById(id: string, relations?: (keyof Event)[]): Promise<Event> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, event: DeepPartial<Event>): Promise<Event> {
    const data = await this.repository
      .createQueryBuilder()
      .update(event)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as Event;
  }
}
