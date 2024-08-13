import { AppDataSource } from "data-source";
import { singleton } from "tsyringe";
import { EmailHTMLTemplate, EmailTemplate } from "entity";
import { DeepPartial, DeleteResult, UpdateResult } from "typeorm";
import { TransactionDaoHelper } from "helpers";

@singleton()
export class EmailTemplateDao extends TransactionDaoHelper<EmailTemplateDao> {
  public override repository = AppDataSource.getRepository(EmailTemplate);

  create(emailTemplate: EmailTemplate): Promise<EmailTemplate> {
    return this.repository.save(this.repository.create(emailTemplate));
  }

  update(id: string, emailTemplate: DeepPartial<EmailTemplate>): Promise<UpdateResult> {
    return this.repository.update({ id }, emailTemplate);
  }

  findById(id: string, relations?: (keyof EmailTemplate)[]): Promise<EmailTemplate> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(id: string, emailTemplate: DeepPartial<EmailTemplate>): Promise<EmailTemplate> {
    const data = await this.repository
      .createQueryBuilder()
      .update(emailTemplate)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as EmailTemplate;
  }

  findByName(name: string): Promise<EmailTemplate> {
    return this.repository.findOne({
      where: { slug: name },
    });
  }
}

@singleton()
export class EmailHTMLTemplateDao extends TransactionDaoHelper<EmailHTMLTemplateDao> {
  public override repository = AppDataSource.getRepository(EmailHTMLTemplate);

  create(emailHTMLTemplate: EmailHTMLTemplate): Promise<EmailHTMLTemplate> {
    return this.repository.save(this.repository.create(emailHTMLTemplate));
  }

  update(id: string, emailHTMLTemplate: DeepPartial<EmailHTMLTemplate>): Promise<UpdateResult> {
    return this.repository.update({ id }, emailHTMLTemplate);
  }

  findById(id: string, relations?: (keyof EmailHTMLTemplate)[]): Promise<EmailHTMLTemplate> {
    return this.repository.findOne({
      where: { id: id },
      relations,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async updateAndReturn(
    id: string,
    emailHTMLTemplate: DeepPartial<EmailHTMLTemplate>
  ): Promise<EmailHTMLTemplate> {
    const data = await this.repository
      .createQueryBuilder()
      .update(emailHTMLTemplate)
      .where("id = :id", { id })
      .returning("*")
      .execute();
    return data.raw[0] as EmailHTMLTemplate;
  }

  findByName(name: string): Promise<EmailHTMLTemplate> {
    return this.repository.findOne({
      where: { templateHTMLName: name },
    });
  }
}
