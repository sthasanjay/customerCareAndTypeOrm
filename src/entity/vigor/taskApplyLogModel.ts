import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";
import { State } from "./stateModel";
import { City } from "./cityModel";
import { PostalCode } from "./postalCodeModel";
import { StudentUser } from "./studentUserModel";
import { Task } from "./taskModel";


@Entity()
export class TaskApplyLog {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "boolean", default: false })
    isVerifiedForTask?: boolean;

    @Column({ type: "boolean", default: false })
    isRejectedForTask?: boolean;

    @Column({ type: "varchar", nullable: true })
    rejectReason?: string;

    @Column({ type: "varchar", nullable: false })
    fileUploadUrl: string;

    @Column({ type: "boolean", default: false })
    isTaskCompleteFromUser?: boolean;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    taskCompleteFromUserDate?: Moment | null;

    @Column({ type: "boolean", default: false })
    isTaskCompleteVerified?: boolean;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    taskCompleteVerifiedDate?: Moment | null;

    @Column({ type: "boolean", default: false })
    isTaskCompleteRejected?: boolean;

    @Column({ type: "varchar", nullable: true })
    taskCompletedRejectReason?: string;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    taskCompletedRejectDate?: Moment | null;

    @Column({ type: "integer", default: 0 })
    countOfRejection?: number;

    @Column({ type: "boolean", default: false })
    isTaskPointCollected?: boolean;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    taskPointCollectedDate?: Moment | null;

    @Column({ type: "integer", nullable: true })
    taskPointEarned?: number;

    @Column({ type: "integer" })
    userId: string;
    @ManyToOne("TaskApplyLog", "taskApplyLogs", { lazy: true })
    user?: Relation<Promise<StudentUser>>;

    @Column({ type: "integer" })
    taskId: string;
    @ManyToOne("TaskApplyLog", "taskApplyLogs", { lazy: true })
    task?: Relation<Promise<Task>>;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
}
