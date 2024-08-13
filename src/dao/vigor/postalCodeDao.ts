import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { PostalCode } from "entity/vigor/postalCodeModel";

@singleton()
export class PostalCodeDao extends TransactionDaoHelper<PostalCodeDao> {
  public override repository = AppDataSource.getRepository(PostalCode);

  create(postalCode: PostalCode): Promise<PostalCode> {
    return this.repository.save(this.repository.create(postalCode));
  }

  update(id: string, postalCode: DeepPartial<PostalCode>): Promise<UpdateResult> {
    return this.repository.update({ id }, postalCode);
  }

  findById(id: string, relations?: (keyof PostalCode)[]): Promise<PostalCode> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, postalCode: DeepPartial<PostalCode>): Promise<PostalCode> {
    const data = await this.repository
      .createQueryBuilder()
      .update(postalCode)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as PostalCode;
  }
}
