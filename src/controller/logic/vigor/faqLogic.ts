import { NextFunction, Request, Response } from "express";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import { AppError } from "utils/appError";
import log from "logger";
import { FAQDao } from "dao/vigor/faqDao";
import {
  FAQCreateBody,
  FAQEditBody,
} from "controller/dataclass/vigor/faqDataClass";
import { FAQ } from "entity/vigor/faqModel";

@autoInjectable()
export class FAQController extends QueryFilter<FAQ> {
  public override entity = FAQ;

  constructor(private faqDao?: FAQDao) {
    super();
  }

  /*
 @desc Create FAQ
 @route POST /api/faq/create
 @access private


 **/

  createFAQ = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    log.info(`req.body: ${JSON.stringify(req.body)}`);
    const { result: validBody, errors } = await validateBodyInput(req, FAQCreateBody);

    if (errors) return res.status(400).json(errors);

    const results = await this.faqDao.create({
      ...validBody,
    });

    if (!results) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed to create",
      });
    }

    res.status(200).json({
      status: "Success",
      data: results,
    });
  };

  /*
 @desc Edit FAQ
 @route POST /api/faq/edit/{id}
 @access private


 **/

  editFAQ = async (req: Request, res: Response, next: NextFunction) => {
    log.info(`req.body: ${JSON.stringify(req.body)}`);
    const { result: validBody, errors } = await validateBodyInput(req, FAQEditBody);

    if (errors) return res.status(400).json(errors);

    const faqId = validateNumericParam(req, "id");

    const results = await this.faqDao.updateAndReturn(faqId, { ...validBody });
    if (!results) return next(new AppError(" no faq data found to update.", 400));

    res.status(200).json({
      status: "success",
      data: results,
    });
  };

  /*
 @desc Edit FAQ
 @route POST /api/faq/getAll
 @access private


 **/

  getAllFAQ = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const results = await this.getData(req.query);
    res.status(200).json({
      status: "Success",
      ...results,
    });
  };

  /*
 @desc Edit FAQ
 @route POST /api/faq/getOne/:id
 @access private


 **/
  getOneFAQ = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const faqId = validateNumericParam(req, "id");

    const results = await this.faqDao.findById(faqId);
    if (!results) return next(new AppError("No FAQ found.", 400));

    res.status(200).json({
      status: "Success",
      data: results,
    });
  };

  /*
 @desc delete FAQ
 @route delete /api/faq/delete/:id
 @access private


 **/
  deleteFAQ = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const faqId = validateNumericParam(req, "id");

    const results = await this.faqDao.delete(faqId);
    if (!results.affected) return next(new AppError("no data found", 400));
    res.status(200).json({
      message: `faq ${faqId} deleted Successfully`,
    });
  };
}
