import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "helpers";
import { Moment } from "moment";

@Entity()
export class EmailTemplate {

  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ type: "varchar", unique: true })
  templateName: string;

  @Column({ type: "varchar", unique: true })
  slug: string;

  @Column({ type: "varchar", nullable: true })
  emailDescription?: string;

  @Column({ type: "varchar" })
  subject: string;

  @Column({ type: "varchar", nullable: true })
  emailTitle?: string;

  @Column({ type: "varchar" })
  emailContent: string;

  @Column({ type: "boolean", default: true, select: false })
  isActive?: boolean;

  @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
  createdAt?: Moment;

  @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
  updatedAt?: Moment;
}

@Entity()
export class EmailHTMLTemplate {


  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ type: "varchar", unique: true })
  templateHTMLName: string;

  @Column({ type: "varchar" })
  emailHTMLContent: string;

  @Column({ type: "boolean", default: true, select: false })
  isActive?: boolean;

  @CreateDateColumn({ select: true, type: "timestamptz", transformer: new DateTransformer() })
  createdAt?: Moment;

  @UpdateDateColumn({ select: false, type: "timestamptz", transformer: new DateTransformer() })
  updatedAt?: Moment;
}
