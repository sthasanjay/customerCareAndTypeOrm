import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { FAQ } from "entity/vigor/faqModel";

@singleton()
export class FAQDao extends TransactionDaoHelper<FAQDao> {
  public override repository = AppDataSource.getRepository(FAQ);

  create(faq: FAQ): Promise<FAQ> {
    return this.repository.save(this.repository.create(faq));
  }

  update(id: string, faq: DeepPartial<FAQ>): Promise<UpdateResult> {
    return this.repository.update({ id }, faq);
  }

  findById(id: string, relations?: (keyof FAQ)[]): Promise<FAQ> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, faq: DeepPartial<FAQ>): Promise<FAQ> {
    const data = await this.repository
      .createQueryBuilder()
      .update(faq)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as FAQ;
  }
}
