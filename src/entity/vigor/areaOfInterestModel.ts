import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";
import { StudentUser } from "./studentUserModel";

@Entity()
export class AreaOfInterest {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "integer", default: 0 })
    displayOrder: number;

    @Column({ type: "boolean", select: false })
    isVisible: boolean;

    @Column({ default: true, select: false, type: "boolean" })
    isActive?: boolean;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;

    @ManyToMany("StudentUser", "areaOfInterests", { lazy: true })
    studentUsers?: Relation<Promise<StudentUser[]>>;
}
