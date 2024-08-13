import { LessThanOrEqual, MoreThanOrEqual, MoreThan, LessThan, Not, Like, getConnection } from "typeorm";
import { AppDataSource } from "data-source";
import { ObjectType } from "typeorm/common/ObjectType";
import assert from "assert";
import log from "logger";
import { ClassType } from "class-transformer-validator";
import { LIMIT } from "globalConstants";
import { sleep } from "../../../utils/sleep";

interface Filters {
  query: Record<string, any>;
  offset: number;
  limit: number;
  order: Record<string, string>;
  attributes: string[];
}

interface FilteredEntity<T> {
  data: T[];
  hasMore: boolean;
}

export class QueryFilter<Entity> {
  public entity!: ClassType<Entity>;

  async getData(queryString: Record<any, any>): Promise<FilteredEntity<Entity>> {
    assert(this.entity !== undefined, "entity must be defined");

    const filters = this.getQuerySet(queryString);

    log.info(this.entity);
    const repository = AppDataSource.getRepository(this.entity);
    const entities: Entity[] = await repository.find({
      // @ts-ignore
      select: filters.attributes,
      // @ts-ignore
      order: filters.order,
      // @ts-ignore
      where: filters.query,
      take: filters.limit,
      skip: filters.offset,
    });
    return {
      data: entities.slice(0, filters.limit - 1), // since filters.limit has 1 extra row slice it before sending
      hasMore: entities.length >= filters.limit,
    };
  }

  private generateQueryFilter(queryParameters: Record<any, any>): Record<any, any> {
    const query: Record<any, any> = {};
    Object.entries(queryParameters)
      .filter(([el, _]) => el.includes("__"))
      .forEach(([el, value]) => {
        const [column, operation] = el.split("__");
        switch (operation) {
          case "substring":
            query[column] = Like(`%${value}%`);
            break;
          case "gt":
            query[column] = MoreThan(value);
            break;
          case "gte":
            query[column] = MoreThanOrEqual(value);
            break;
          case "lt":
            query[column] = LessThan(value);
            break;
          case "lte":
            query[column] = LessThanOrEqual(value);
            break;
          case "ne":
            query[column] = Not(value);
            break;
          default:
            query[column] = Like(`%${value}%`);
        }
      });
    return query;
  }

  public getQuerySet(queryParameters: Record<any, any>): Filters {
    const query = this.generateQueryFilter(queryParameters);
    const limit = (+queryParameters.limit || LIMIT) + 1; // fetch extra row to see if there's more left
    const offset = (+queryParameters.page - 1) * +queryParameters.limit || 0;
    const order = queryParameters.order_by
      ? { [queryParameters.order_by]: queryParameters.ordering ?? "DESC" }
      : { createdAt: "DESC" };

    const attributes = queryParameters.fields ? queryParameters.fields.split(",") : [];
    return {
      query,
      offset,
      limit,
      order,
      attributes,
    };
  }
}
