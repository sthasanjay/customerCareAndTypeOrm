import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";
import { State } from "./stateModel";
import { City } from "./cityModel";
import { PostalCode } from "./postalCodeModel";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    taskName: string;

    @Column({ type: "varchar" })
    taskDescription: string;

    @Column({ type: "varchar" })
    taskType: string;

    @Column({ type: "varchar" })
    taskBannerUrl: string;

    @Column({ type: "varchar" })
    taskLogoUrl: string;

    @Column({ type: "varchar", nullable: true })
    taskExternalLink?: string;

    @Column({ type: "varchar" })
    taskCompletionStep: string;

    @Column({ type: "integer" })
    taskEarnPoint: number;

    @Column({ type: "varchar" })
    taskTagType: string;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    taskStartDate?: Moment | null;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    taskDeadlineDate?: Moment | null;

    @Column({ type: "integer", default: 0 })
    displayOrder: number;

    @Column({ default: true, select: false, type: "boolean" })
    isActive?: boolean;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
}
