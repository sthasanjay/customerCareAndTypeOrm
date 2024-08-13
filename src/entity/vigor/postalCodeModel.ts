import { Moment } from "moment";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";

@Entity()
export class PostalCode {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    postalCode: string;

    @Column({ type: "integer", default: 0 })
    displayOrder?: number;

    @Column({ default: true, select: false, type: "boolean" })
    isActive?: boolean;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
}
