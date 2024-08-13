import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";

@Entity()
export class FAQ {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    subject: string;

    @Column({ type: "varchar" })
    question: string;

    @Column({ type: "varchar" })
    answer: string;

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
}
