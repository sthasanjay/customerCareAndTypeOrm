import { NextFunction, Request, Response } from "express";
import { AppError } from "utils/appError";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import log from "logger";
import { EmailHTMLTemplateDao, EmailTemplateDao } from "dao/vigor/emailRelatedDaos";
import {
  EmailHTMLTemplateCreateBody,
  EmailHTMLTemplateEditBody,
  EmailTemplateCreateBody,
  EmailTemplateEditBody,
} from "controller/dataclass/vigor/emailRelatedDataClass";
import { createUniqueSlugFieldFromTitle } from "../../../utils/functions";
import { EmailHTMLTemplate, EmailTemplate } from "entity";

@autoInjectable()
export class EmailTemplateController extends QueryFilter<EmailTemplate> {
  public override entity = EmailTemplate;

  constructor(private emailTemplateDao?: EmailTemplateDao) {
    super();
  }

  /*
   @desc Create EmailTemplate
   @route POST /api/emailTemplate/create
   @access private


   **/

  createEmailTemplate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    log.info(`req.body: ${JSON.stringify(req.body)}`);
    const { result: validBody, errors } = await validateBodyInput(req, EmailTemplateCreateBody);

    if (errors) return res.status(400).json(errors);
    const slug = await createUniqueSlugFieldFromTitle(
      validBody.templateName,
      this.emailTemplateDao.repository
    );
    const result = await this.emailTemplateDao.create({
      ...validBody,
      slug: slug,
    });

    if (!result) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed to create",
      });
    }
    res.status(200).json({
      status: "Success",
      data: result,
    });
  };

  /*
   @desc Edit EmailTemplate
   @route POST /api/emailTemplate/edit/{id}
   @access private


   **/

  editEmailTemplate = async (req: Request, res: Response, next: NextFunction) => {
    log.info(`req.body: ${JSON.stringify(req.body)}`);
    const { result: validBody, errors } = await validateBodyInput(req, EmailTemplateEditBody);

    if (errors) return res.status(400).json(errors);

    const emailTemplateId = validateNumericParam(req, "id");
    const result = await this.emailTemplateDao.updateAndReturn(emailTemplateId, { ...validBody });
    if (!result) return next(new AppError(" no emailTemplate data found to update.", 400));

    res.status(200).json({
      status: "success",
      data: result,
    });
  };

  /*
   @desc Edit EmailTemplate
   @route POST /api/emailTemplate/getAll
   @access private


   **/

  getAllEmailTemplate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const results = await this.getData(req.query);
    res.status(200).json({
      status: "Success",
      ...results,
    });
  };

  /*
   @desc Edit EmailTemplate
   @route POST /api/emailTemplate/getOne/:id
   @access private


   **/
  getOneEmailTemplate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const emailTemplateId = validateNumericParam(req, "id");

    const results = await this.emailTemplateDao.findById(emailTemplateId);
    if (!results) return next(new AppError("No EmailTemplate found.", 400));

    res.status(200).json({
      status: "Success",
      data: results,
    });
  };

  /*
   @desc delete EmailTemplate
   @route delete /api/emailTemplate/delete/:id
   @access private


   **/
  deleteEmailTemplate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const emailTemplateId = validateNumericParam(req, "id");

    const results = await this.emailTemplateDao.delete(emailTemplateId);
    if (!results.affected) return next(new AppError("no data found", 400));
    res.status(200).json({
      message: `emailTemplate ${emailTemplateId} deleted Successfully`,
    });
  };
}

@autoInjectable()
export class EmailHTMLTemplateController extends QueryFilter<EmailHTMLTemplate> {
  public override entity = EmailHTMLTemplate;

  constructor(private emailHTMLTemplateDao?: EmailHTMLTemplateDao) {
    super();
  }

  /*
   @desc Create EmailHTMLTemplate
   @route POST /api/emailHTMLTemplate/create
   @access private


   **/

  createEmailHTMLTemplate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    log.info(`req.body: ${JSON.stringify(req.body)}`);
    const { result: validBody, errors } = await validateBodyInput(req, EmailHTMLTemplateCreateBody);

    if (errors) return res.status(400).json(errors);

    const result = await this.emailHTMLTemplateDao.create({
      ...validBody,
    });

    if (!result) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed to create",
      });
    }
    res.status(200).json({
      status: "Success",
      data: result,
    });
  };

  /*
   @desc Edit EmailHTMLTemplate
   @route POST /api/emailHTMLTemplate/edit/{id}
   @access private


   **/

  editEmailHTMLTemplate = async (req: Request, res: Response, next: NextFunction) => {
    log.info(`req.body: ${JSON.stringify(req.body)}`);
    const { result: validBody, errors } = await validateBodyInput(req, EmailHTMLTemplateEditBody);

    if (errors) return res.status(400).json(errors);

    const emailHTMLTemplateId = validateNumericParam(req, "id");
    const result = await this.emailHTMLTemplateDao.updateAndReturn(emailHTMLTemplateId, { ...validBody });
    if (!result) return next(new AppError(" no emailHTMLTemplate data found to update.", 400));

    res.status(200).json({
      status: "success",
      data: result,
    });
  };

  /*
   @desc Edit EmailHTMLTemplate
   @route POST /api/emailHTMLTemplate/getAll
   @access private


   **/

  getAllEmailHTMLTemplate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const results = await this.getData(req.query);
    res.status(200).json({
      status: "Success",
      ...results,
    });
  };

  /*
   @desc Edit EmailHTMLTemplate
   @route POST /api/emailHTMLTemplate/getOne/:id
   @access private


   **/
  getOneEmailHTMLTemplate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const emailHTMLTemplateId = validateNumericParam(req, "id");

    const results = await this.emailHTMLTemplateDao.findById(emailHTMLTemplateId);
    if (!results) return next(new AppError("No EmailHTMLTemplate found.", 400));

    res.status(200).json({
      status: "Success",
      data: results,
    });
  };

  /*
   @desc delete EmailHTMLTemplate
   @route delete /api/emailHTMLTemplate/delete/:id
   @access private


   **/
  deleteEmailHTMLTemplate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const emailHTMLTemplateId = validateNumericParam(req, "id");

    const results = await this.emailHTMLTemplateDao.delete(emailHTMLTemplateId);
    if (!results.affected) return next(new AppError("no data found", 400));
    res.status(200).json({
      message: `emailHTMLTemplate ${emailHTMLTemplateId} deleted Successfully`,
    });
  };
}
