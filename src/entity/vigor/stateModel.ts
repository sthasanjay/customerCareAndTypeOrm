import { Moment } from "moment";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";

@Entity()
export class State {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    stateName: string;

    @Column({ type: "varchar" })
    stateShortName: string;

    @Column({ type: "integer", default: 0 })
    order?: number;

    @Column({ default: true, select: false, type: "boolean" })
    isActive?: boolean;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
}
