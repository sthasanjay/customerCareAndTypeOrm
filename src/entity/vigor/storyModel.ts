import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";
import { State } from "./stateModel";
import { City } from "./cityModel";
import { PostalCode } from "./postalCodeModel";
import { StudentUser } from "./studentUserModel";

@Entity()
export class Story {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    storyCaption: string;

    @Column({ type: "varchar", nullable: true })
    storyDisplayCaption?: string;

    @Column({ type: "varchar" })
    videoUrl: string;

    @Column({ type: "integer", default: 0 })
    displayOrder?: number;

    @Column({ type: "boolean", select: false })
    isVisible?: boolean;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    storyDisplayFrom?: Moment | null;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    storyDisplayUpto?: Moment | null;

    @Column({ type: "boolean", select: false })
    isApproved?: boolean;

    @Column({ type: "timestamptz", nullable: true, transformer: new DateTransformer() })
    approvedDate?: Moment | null;

    @Column({ default: true, select: false, type: "boolean" })
    isActive?: boolean;

    @Column({ type: "integer" })
    userId: string;
    @ManyToOne("Story", "stories", { lazy: true })
    user?: Relation<Promise<StudentUser>>;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
}
