import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { StudentUser } from "entity/vigor/studentUserModel";

@singleton()
export class StudentUserDao extends TransactionDaoHelper<StudentUserDao> {
  public override repository = AppDataSource.getRepository(StudentUser);

  create(user: StudentUser): Promise<StudentUser> {
    return this.repository.save(this.repository.create(user));
  }

  update(id: string, user: DeepPartial<StudentUser>): Promise<UpdateResult> {
    return this.repository.update({ id }, user);
  }

  findById(id: string, relations?: (keyof StudentUser)[]): Promise<StudentUser> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, user: DeepPartial<StudentUser>): Promise<StudentUser> {
    const data = await this.repository
      .createQueryBuilder()
      .update(user)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as StudentUser;
  }
}
