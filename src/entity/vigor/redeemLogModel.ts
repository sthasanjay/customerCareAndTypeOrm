import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";
import { State } from "./stateModel";
import { City } from "./cityModel";
import { PostalCode } from "./postalCodeModel";
import { StudentUser } from "./studentUserModel";
import { Task } from "./taskModel";


@Entity()
export class RedeemLog {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    redeemMethod: string;

    @Column({ type: "integer" })
    pointsExchanged: number;

    @Column({ type: "varchar" })
    redeemWithDrawnReceived: string;

    @Column({ type: "integer" })
    userId: string;
    @ManyToOne("RedeemLog", "redeemLogs", { lazy: true })
    user?: Relation<Promise<StudentUser>>;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
}
