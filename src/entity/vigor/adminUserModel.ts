import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../helpers/entity/transformers/date2moment";
import { Moment } from "moment";
import { AdminRole } from "entity/enum/adminRoleEnum";
import { ROLE } from "entity/enum/role";

@Entity()
export class AdminUser {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ unique: true, type: "varchar" })
    email: string;

    @Column({ type: "varchar", select: false })
    password: string;

    @Column({ default: true, select: false, type: "boolean" })
    isActive?: boolean;

    @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
    createdAt?: Moment;

    @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
    updatedAt?: Moment;
    role?: ROLE;

}
