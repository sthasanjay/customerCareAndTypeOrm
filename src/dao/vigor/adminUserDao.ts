import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { AdminUser } from "entity/vigor/adminUserModel";

@singleton()
export class AdminUserDao extends TransactionDaoHelper<AdminUserDao> {
  public override repository = AppDataSource.getRepository(AdminUser);

  create(adminUser: AdminUser): Promise<AdminUser> {
    return this.repository.save(this.repository.create(adminUser));
  }

  update(id: string, adminUser: DeepPartial<AdminUser>): Promise<UpdateResult> {
    return this.repository.update({ id }, adminUser);
  }

  findById(id: string, relations?: (keyof AdminUser)[]): Promise<AdminUser> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, adminUser: DeepPartial<AdminUser>): Promise<AdminUser> {
    const data = await this.repository
      .createQueryBuilder()
      .update(adminUser)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as AdminUser;
  }
}
