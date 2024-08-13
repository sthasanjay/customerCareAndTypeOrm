import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { Story } from "entity/vigor/storyModel";

@singleton()
export class StoryDao extends TransactionDaoHelper<StoryDao> {
  public override repository = AppDataSource.getRepository(Story);

  create(story: Story): Promise<Story> {
    return this.repository.save(this.repository.create(story));
  }

  update(id: string, story: DeepPartial<Story>): Promise<UpdateResult> {
    return this.repository.update({ id }, story);
  }

  findById(id: string, relations?: (keyof Story)[]): Promise<Story> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, story: DeepPartial<Story>): Promise<Story> {
    const data = await this.repository
      .createQueryBuilder()
      .update(story)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as Story;
  }
}
