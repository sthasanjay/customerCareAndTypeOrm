import { ClassType } from "class-transformer-validator";
import { AppDataSource } from "data-source";
import { ContentTypeEnum } from "entity/enum/tables";
import { In } from "typeorm";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";
import { plainToInstance } from "class-transformer";
import { cache } from "../../utils/cache-decorator/cache";

const enum2entity: Record<ContentTypeEnum, ClassType<any>> = {
  [ContentTypeEnum.contactUs]: Event,
  //TODO: fix this
};

export class ForeignKeyObject {
  static async get<Entity>(contentType: ContentTypeEnum, objectIds: number | number[]): Promise<Entity[]> {
    return plainToInstance(enum2entity[contentType], await ForeignKeyObject._get(contentType, objectIds));
  }

  @cache({ ttl: 1000 * 60 * 30 })
  static async _get<Entity>(contentType: ContentTypeEnum, objectIds: number | number[]): Promise<Entity[]> {
    objectIds = Array.isArray(objectIds) ? objectIds : [objectIds];
    return await AppDataSource.getRepository(enum2entity[contentType as ContentTypeEnum]).findBy({
      id: In(objectIds),
    });
  }
}

/**
 Class used for generic foreign key queries
 @example:
 const obj = await daoObj.findById(id);
 GenericRelationQuerySet(obj).fetchRelated("refererType", "referredBy");
 */
export class GenericRelationQuerySet<Entity extends ObjectLiteral> {
  public readonly entities: Entity[];

  constructor(entities: Entity | Entity[]) {
    this.entities = Array.isArray(entities) ? entities : [entities];
    // we need to add every content type to the enum2entity when new table is added
  }

  public async fetchRelatedMany(genericFields: (keyof Entity)[]): Promise<Entity[]> {
    // fetch multiple generic foreignkey object

    for (const genericField of genericFields) {
      await this.fetchRelated(genericField);
    }
    return this.entities;
  }

  public async fetchRelated(genericField: keyof Entity): Promise<Entity[]> {
    // fetch generic foreignkey object
    const columns = this.entities[0].GenericFields[genericField];
    return await this._fetchRelated(columns[0], columns[1]);
  }

  private _groupByContentType(
    contentTypeColumn: keyof Entity,
    objectIdColumn: keyof Entity
  ): Record<ContentTypeEnum, Set<number>> {
    const contentType2ObjectIds: {
      content_type: ContentTypeEnum;
      objectId: number;
    }[] = this.entities
      .filter((obj: Entity) => obj[contentTypeColumn]) //filter our `null` contentType
      .map((obj: Entity) => {
        return {
          content_type: obj[contentTypeColumn] as ContentTypeEnum,
          objectId: obj[objectIdColumn] as number,
        };
      });
    return contentType2ObjectIds.reduce(
      /** group by content type
             example: { content_type: [objectId1, objectId2, ...],content_type2: [objectId1, objectId2, ...] }
             */
      (grp: Record<any, any>, ref: { content_type: any; objectId: any }) => {
        const { content_type, objectId } = ref;
        grp[content_type] = grp[content_type] || new Set();
        grp[content_type].add(objectId);
        return grp;
      },
      {}
    );
  }

  private async _fetchRelated(
    contentTypeColumn: keyof Entity,
    objectIdColumn: keyof Entity
  ): Promise<Entity[]> {
    const groupByContentType = this._groupByContentType(contentTypeColumn, objectIdColumn);
    const genericObjectFieldKey = this.entities[0][`${String(contentTypeColumn)}__holder`];
    this.entities.forEach((entity: any) => {
      entity[genericObjectFieldKey] = null; // override getter method
    });
    for (const [contentType, objectIds] of Object.entries(groupByContentType)) {
      const foreignObjects = await ForeignKeyObject._get<Entity>(
        contentType as ContentTypeEnum,
        Array.from(objectIds)
      );
      this.entities.map((entity: any) => {
        //assign foreign object to the entity
        foreignObjects.some((foreignObjectEntity: Entity) => {
          // early out if object id is found
          if (
            foreignObjectEntity.id === entity[objectIdColumn] &&
            entity[contentTypeColumn] === contentType
          ) {
            entity[genericObjectFieldKey] = foreignObjectEntity;
            return true;
          }
        });
      });
    }
    return this.entities;
  }
}
