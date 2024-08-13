import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";
import { State } from "./stateModel";
import { City } from "./cityModel";
import { PostalCode } from "./postalCodeModel";
import { StudentUser } from "./studentUserModel";
import { Task } from "./taskModel";


@Entity()
export class UserPointStatistics {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "integer", default: 0 })
    availablePoints?: number;

    @Column({ type: "integer", default: 0 })
    totalEarnedPoints?: number;

    @Column({ type: "integer", default: 0 })
    totalCompletedTask?: number;

    @Column({ type: "integer", default: 0 })
    totalRedeemedCount?: number;

    @Column({ type: "integer" })
    userId: string;
    @ManyToOne("UserPointStatistics", "userPointStatistics", { lazy: true })
    user?: Relation<Promise<StudentUser>>;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
}
