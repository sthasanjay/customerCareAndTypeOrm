import { NextFunction, Request, Response } from "express";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import { AppError } from "utils/appError";
import log from "logger";
import { StateDao } from "dao/vigor/stateDao";
import {
  StateCreateBody,
  StateEditBody,
} from "controller/dataclass/vigor/stateDataClass";
import { State } from "entity/vigor/stateModel";

@autoInjectable()
export class StateController extends QueryFilter<State> {
  public override entity = State;

  constructor(private stateDao?: StateDao) {
    super();
  }

  /*
 @desc Create State
 @route POST /api/state/create
 @access private


 **/

  createState = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    log.info(`req.body: ${JSON.stringify(req.body)}`);
    const { result: validBody, errors } = await validateBodyInput(req, StateCreateBody);

    if (errors) return res.status(400).json(errors);

    const results = await this.stateDao.create({
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
 @desc Edit State
 @route POST /api/state/edit/{id}
 @access private


 **/

  editState = async (req: Request, res: Response, next: NextFunction) => {
    log.info(`req.body: ${JSON.stringify(req.body)}`);
    const { result: validBody, errors } = await validateBodyInput(req, StateEditBody);

    if (errors) return res.status(400).json(errors);

    const stateId = validateNumericParam(req, "id");

    const results = await this.stateDao.updateAndReturn(stateId, { ...validBody });
    if (!results) return next(new AppError(" no state data found to update.", 400));

    res.status(200).json({
      status: "success",
      data: results,
    });
  };

  /*
 @desc Edit State
 @route POST /api/state/getAll
 @access private


 **/

  getAllState = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const results = await this.getData(req.query);
    res.status(200).json({
      status: "Success",
      ...results,
    });
  };

  /*
 @desc Edit State
 @route POST /api/state/getOne/:id
 @access private


 **/
  getOneState = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const stateId = validateNumericParam(req, "id");

    const results = await this.stateDao.findById(stateId);
    if (!results) return next(new AppError("No State found.", 400));

    res.status(200).json({
      status: "Success",
      data: results,
    });
  };

  /*
 @desc delete State
 @route delete /api/state/delete/:id
 @access private


 **/
  deleteState = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const stateId = validateNumericParam(req, "id");

    const results = await this.stateDao.delete(stateId);
    if (!results.affected) return next(new AppError("no data found", 400));
    res.status(200).json({
      message: `state ${stateId} deleted Successfully`,
    });
  };
}
