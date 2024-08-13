import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";
import { State } from "./stateModel";
import { City } from "./cityModel";
import { PostalCode } from "./postalCodeModel";
import { AreaOfInterest } from "./areaOfInterestModel";
import { ROLE } from "entity/enum/role";


@Entity()
export class StudentUser {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: "varchar" })
    firstName: string;

    @Column({ type: "varchar" })
    lastName: string;

    @Column({ unique: true, type: "varchar" })
    email: string;

    @Column({ type: "varchar", select: false })
    password: string;

    @Column({ type: "varchar", unique: true })
    phoneNumber: string;

    @Column({ type: "varchar" })
    gender: string;

    @Column({ type: "varchar" })
    dob: string;

    @Column({ type: "varchar" })
    profilePictureUrl: string;

    @Column({ type: "varchar" })
    institutionName: string;

    @Column({ type: "varchar" })
    institutionCardImageUrl: string;

    @Column({ type: "varchar" })
    studyingCourse: string;

    @Column({ type: "varchar" })
    collegeDesignation: string;

    @Column({ type: "varchar" })
    instagramUrl: string;

    @Column({ type: "varchar" })
    linkedinUrl: string;

    @Column({ type: "boolean", default: false })
    isProfileComplete?: boolean;

    @Column({ type: "varchar" })
    profileCompletionDate: string;

    @Column({ type: "integer" })
    stateId: string;
    @ManyToOne("State", "Users", { lazy: true })
    state?: Relation<Promise<State>>;

    @Column({ type: "integer" })
    cityId: string;
    @ManyToOne("City", "users", { lazy: true })
    city?: Relation<Promise<City>>;

    @Column({ type: "integer" })
    postalCodeId: string;
    @ManyToOne("City", "users", { lazy: true })
    postalCode?: Relation<Promise<PostalCode>>;

    @Column({ type: "integer", nullable: true })
    referredById?: number;

    @ManyToOne("StudentUser", "StudentUser.referredTo", { lazy: true })
    referredBy!: Relation<Promise<StudentUser>>;

    @OneToMany("StudentUser", "StudentUser.referredBy", { lazy: true })
    referredTo!: Relation<Promise<StudentUser[]>>;

    @Column({ default: true, select: false, type: "boolean" })
    isActive?: boolean;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;

    @ManyToMany("AreaOfInterest", "studentUsers", { lazy: true })
    @JoinTable()
    areaOfInterests!: Relation<Promise<AreaOfInterest[]>>;

    role?: ROLE;


}
