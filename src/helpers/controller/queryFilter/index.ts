import {
  Between,
  FindOptionsWhere,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  SelectQueryBuilder,
} from "typeorm";
import { AppDataSource } from "data-source";
import assert from "assert";
import { ClassType } from "class-transformer-validator";
import { LIMIT } from "globalConstants";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";
import moment from "moment";
import { GenericRelationQuerySet } from "../../dao/genericRelationQuerySet";

interface Filters {
  query: Record<string, any>;
  offset: number;
  limit: number;
  order: Record<string, string>;
  attributes: string[];
  page: number;
}

interface FilteredEntity<T> {
  data: T[];
  hasMore: boolean;
  count: number;
  totalCount: number;
  page: number;
}

export interface PaginatedContent<T> {
  data: T[];
  hasMore: boolean;
  count: number;
  totalCount: number;
  page: number;
}

export interface FilterClauses {
  query: Record<string, any>;
  offset: number;
  limit: number;
  order: [string, "ASC" | "DESC"];
  attributes: string[];
  page: number;
}

export class QueryFilter<Entity extends ObjectLiteral> {
  public entity!: ClassType<Entity>;

  public async preQuery(queryString: Record<any, any>): Promise<Record<string, any>> {
    return queryString;
  }

  public async getData(
    queryString: Record<any, any>,
    withRelations?: string[],
    customWhere?: FindOptionsWhere<Entity>,
    alias = "o",
    useRawMany = false,
    callback?: (builder: SelectQueryBuilder<Entity>, ...args: any[]) => void
  ): Promise<PaginatedContent<Entity>> {
    queryString = await this.preQuery(queryString);
    const queryData = this.prepareSqlClauses(queryString);
    const { attributes, limit, page, order, query, offset } = queryData;
    const builder = this._getQueryBuilder(query, alias, customWhere)
      .take(limit)
      .skip(offset)
      .orderBy(alias + "." + order[0], order[1]);
    {
      attributes.length &&
        builder.select(Array.from(new Set(["id", order[0], ...attributes])).map((x) => alias + "." + x));
      this.addRelations(builder, alias, withRelations);
      callback && callback(builder, queryData);
    }
    const [entities, totalCount] = useRawMany
      ? await (async () => {
          const [data, count] = await Promise.all([builder.getRawAndEntities(), builder.getCount()]);
          return [data.raw, count];
        })()
      : await builder.getManyAndCount();
    const data = entities.slice(0, limit - 1); // since filters.limit has 1 extra row slice it before sending
    {
      const genericRelationFields = withRelations?.filter((column) =>
        Object.keys(new this.entity().GenericFields ?? {}).includes(column as string)
      );
      if (data.length != 0 && genericRelationFields != undefined && genericRelationFields.length != 0) {
        const gQuery = new GenericRelationQuerySet(data);
        await gQuery.fetchRelatedMany(genericRelationFields); // `entities` is passed by reference so new contenttype object is added
      }
    }
    console.log("after: ", builder.getQuery());
    return {
      data: data,
      hasMore: entities.length > limit - 1,
      count: data.length,
      totalCount: totalCount,
      page: page,
    };
  }

  protected _getQueryBuilder(
    query: Record<string, any>,
    alias: string,
    customWhere?: FindOptionsWhere<Entity>
  ): SelectQueryBuilder<Entity> {
    const repository = AppDataSource.getRepository(this.entity);
    return repository.createQueryBuilder(alias).where({ ...query, ...customWhere });
  }

  protected addRelations(
    builder: SelectQueryBuilder<Entity>,
    alias: string,
    withRelations?: string[]
  ): SelectQueryBuilder<Entity> {
    if (!withRelations) return builder;
    const relationFields = withRelations.filter(
      (column) => !Object.keys(new this.entity().GenericFields ?? {}).includes(column as string)
    ); // only get non generic fields
    const uniqueTablePrefixes = new Set(relationFields.map((str) => str.split(".")[0])); //get unique set of table names from relation fields

    const relationCategory = relationFields.reduce((acc, curr) => {
      const prefix = curr.split(".")[0];
      acc.set(prefix, (acc.get(prefix) || []).concat(curr));
      return acc;
    }, new Map()); // groupBy entityName/tableName prefix {"entityName": ["entityName.name","entityName.id"],"entityName1":...}
    for (const table of uniqueTablePrefixes) {
      builder.leftJoin(alias + "." + table, table).addSelect(relationCategory!.get(table));
    }
    return builder;
  }

  /*
  public async getData(
    queryString: Record<any, any>,
    withRelations?: (keyof Entity)[]
  ): Promise<FilteredEntity<Entity>> {
    assert(this.entity !== undefined, "entity must be defined");
    queryString = await this.preQuery(queryString);
    const { attributes, limit, offset, order, page, query } = this.getQuerySet(queryString);
    const repository = AppDataSource.getRepository(this.entity);

    const relationFields = withRelations?.filter(
      (column) => !Object.keys(new this.entity().GenericFields ?? {}).includes(column as string)
    );
    const genericRelationFields = withRelations?.filter((column) =>
      Object.keys(new this.entity().GenericFields ?? {}).includes(column as string)
    );

    const options: Record<any, any> = {
      // @ts-ignore
      select: attributes,
      // @ts-ignore
      order: order,
      // @ts-ignore
      where: query,
      take: limit,
      skip: offset,

      relations: relationFields,
    };
    const [entities, totalCount] = await repository.findAndCount(options);

    if (entities.length != 0 && genericRelationFields != undefined && genericRelationFields.length != 0) {
      const gQuery = new GenericRelationQuerySet(entities);
      await gQuery.fetchRelatedMany(genericRelationFields); // `entities` is passed by reference so new contenttype object is added
    }
    return {
      data: entities.slice(0, limit - 1), // since filters.limit has 1 extra row slice it before sending
      hasMore: entities.length >= limit,
      count: limit - 1,
      totalCount: totalCount,
      page: page,
    };
  }

  */

  private generateQueryFilter(queryParameters: Record<any, any>): Record<any, any> {
    Object.entries(queryParameters).map(([el, value]) => {
      if (typeof value == "string") queryParameters[el] = (value as string).trim();
    });
    const query: Record<any, any> = {
      ...Object.fromEntries(
        Object.entries(queryParameters)
          .filter(([el, _]) => !el.includes("__"))
          .filter(
            ([el, _]) =>
              !["limit", "page", "offset", "fields", "ordering", "order", "attributes", "order_by"].includes(
                el
              )
          )
      ),
    };
    Object.entries(queryParameters)
      .filter(([el, _]) => el.includes("__"))
      .forEach(([el, value]) => {
        const [column, operation] = el.split("__");
        switch (operation) {
          case "substring":
            query[column] = ILike(`%${value}%`);
            break;
          case "gt":
            query[column] = MoreThan(value);
            break;
          case "gte":
            query[column] = MoreThanOrEqual(value);
            break;
          case "in":
            query[column] = In(value);
            break;
          case "lt":
            query[column] = LessThan(value);
            break;
          case "between": {
            const dates = value.split(":");
            query[column] = Between(moment(dates[0]), moment(dates[1]));
            break;
          }
          case "lte":
            query[column] = LessThanOrEqual(value);
            break;
          case "ne":
            query[column] = Not(value);
            break;
          default:
            query[column] = value;
        }
      });
    // query.createdAt = Equal(query.createdAt);
    return query;
  }

  private getQuerySet(queryParameters: Record<any, any>): Filters {
    const query = this.generateQueryFilter(queryParameters);
    const limit = (+queryParameters.limit || LIMIT) + 1; // fetch extra row to see if there's more left
    const page = +queryParameters.page || 1;
    const offset = (+queryParameters.page - 1) * +queryParameters.limit || 0;
    const order = queryParameters.order_by
      ? { [queryParameters.order_by]: queryParameters.ordering ?? "DESC" }
      : { id: "DESC" };

    const attributes = queryParameters.fields ? queryParameters.fields.split(",") : [];
    return {
      query,
      offset,
      limit,
      order,
      attributes,
      page,
    };
  }

  protected prepareSqlClauses(queryString: Record<any, any>): FilterClauses {
    const query = this.generateQueryFilter(queryString);
    const limit = (+queryString.limit || LIMIT) + 1; // fetch extra row to see if there's more left
    const page = +queryString.page || 1;
    const offset = (+queryString.page - 1) * (limit - 1) || 0;
    const order: [string, "ASC" | "DESC"] = [queryString.order_by || "id", queryString.ordering || "DESC"];
    const attributes: string[] = (queryString.fields ? queryString.fields.split(",") : []).map(
      (val: string) => val.trim()
    );

    return {
      query,
      offset,
      limit,
      order,
      attributes,
      page,
    };
  }
}
