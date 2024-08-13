import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    newsTitle: string;

    @Column({ type: "varchar" })
    newsType: string;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    newsUploadDate?: Moment | null;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    newsEditDate?: Moment | null;

    @Column({ type: "varchar" })
    description: string;

    @Column({ type: "varchar" })
    shortDescription: string;

    @Column({ type: "varchar" })
    bannerUrl: string;

    @Column({ type: "varchar" })
    logoUrl: string;

    @Column({ type: "integer", default: 0 })
    displayOrder: number;

    @Column({ type: "boolean", select: false })
    isVisible: boolean;

    @Column({ default: true, select: false, type: "boolean" })
    isActive?: boolean;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    newsDisplayFrom?: Moment | null;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    newsDisplayTo?: Moment | null;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
}
