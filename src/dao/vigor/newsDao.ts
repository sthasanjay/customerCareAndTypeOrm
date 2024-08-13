import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { News } from "entity/vigor/newsModel";

@singleton()
export class NewsDao extends TransactionDaoHelper<NewsDao> {
  public override repository = AppDataSource.getRepository(News);

  create(news: News): Promise<News> {
    return this.repository.save(this.repository.create(news));
  }

  update(id: string, news: DeepPartial<News>): Promise<UpdateResult> {
    return this.repository.update({ id }, news);
  }

  findById(id: string, relations?: (keyof News)[]): Promise<News> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, news: DeepPartial<News>): Promise<News> {
    const data = await this.repository
      .createQueryBuilder()
      .update(news)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as News;
  }
}
