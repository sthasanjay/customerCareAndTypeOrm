import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";

import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";
import { City } from "entity/vigor/cityModel";

@singleton()
export class CityDao extends TransactionDaoHelper<CityDao> {
  public override repository = AppDataSource.getRepository(City);

  create(city: City): Promise<City> {
    return this.repository.save(this.repository.create(city));
  }

  update(id: string, city: DeepPartial<City>): Promise<UpdateResult> {
    return this.repository.update({ id }, city);
  }

  findById(id: string, relations?: (keyof City)[]): Promise<City> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, city: DeepPartial<City>): Promise<City> {
    const data = await this.repository
      .createQueryBuilder()
      .update(city)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as City;
  }
}
