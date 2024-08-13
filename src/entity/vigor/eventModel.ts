import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";
import { State } from "./stateModel";
import { City } from "./cityModel";
import { PostalCode } from "./postalCodeModel";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    eventName: string;

    @Column({ type: "varchar" })
    eventDescription: string;

    @Column({ type: "varchar" })
    eventDisplayDate: string;

    @Column({ type: "varchar" })
    eventDisplayTime: string;

    @Column({ type: "timestamptz", transformer: new DateTransformer() })
    eventDate?: Moment | null;

    @Column({ type: "varchar" })
    eventDisplayLocation: string;

    @Column({ type: "varchar", nullable: true })
    eventGoogleMapUrl: string;

    @Column({ type: "varchar" })
    eventBannerUrl: string;

    @Column({ type: "varchar" })
    eventLogoUrl: string;

    @Column({ type: "varchar" })
    eventTagType: string;

    @Column({ type: "integer", default: 0 })
    displayOrder: number;

    @Column({ type: "boolean", select: false })
    isSuggestedEvent: boolean;

    @Column({ type: "integer", default: 0 })
    suggestedOrder?: number;

    @Column({ default: true, select: false, type: "boolean" })
    isActive?: boolean;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
}
