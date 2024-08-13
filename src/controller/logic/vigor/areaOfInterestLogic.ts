import { NextFunction, Request, Response } from "express";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import { AppError } from "utils/appError";
import { AreaOfInterestDao } from "dao/vigor/areaOfInterestDao";
import {
    AreaOfInterestCreateBody,
    AreaOfInterestEditBody,
    AreaOfInterestActivateBody
} from "controller/dataclass/vigor/areaOfInterestDataClass";
import { AreaOfInterest } from "entity/vigor/areaOfInterestModel";

@autoInjectable()
export class AreaOfInterestController extends QueryFilter<AreaOfInterest> {
    public override entity = AreaOfInterest;

    constructor(private areaOfInterestDao?: AreaOfInterestDao) {
        super();
    }

    /*
   @desc Create AreaOfInterest
   @route POST /api/areaOfInterest/create
   @access private
   **/

    createAreaOfInterest = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { result: validBody, errors } = await validateBodyInput(req, AreaOfInterestCreateBody);

        if (errors) return res.status(400).json(errors);

        const results = await this.areaOfInterestDao.create({
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
   @desc Edit AreaOfInterest
   @route POST /api/areaOfInterest/edit/{id}
   @access private
   **/

    editAreaOfInterest = async (req: Request, res: Response, next: NextFunction) => {
        const { result: validBody, errors } = await validateBodyInput(req, AreaOfInterestEditBody);

        if (errors) return res.status(400).json(errors);

        const areaOfInterestId = validateNumericParam(req, "id");

        const results = await this.areaOfInterestDao.updateAndReturn(areaOfInterestId, { ...validBody });
        if (!results) return next(new AppError(" no areaOfInterest data found to update.", 400));

        res.status(200).json({
            status: "success",
            data: results,
        });
    };

    /*
   @desc Edit AreaOfInterest
   @route POST /api/areaOfInterest/getAll
   @access private
   **/

    getAllAreaOfInterest = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const results = await this.getData(req.query);
        res.status(200).json({
            status: "Success",
            ...results,
        });
    };

    /*
   @desc Edit AreaOfInterest
   @route POST /api/areaOfInterest/getOne/:id
   @access private
   **/
    getOneAreaOfInterest = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const areaOfInterestId = validateNumericParam(req, "id");

        const results = await this.areaOfInterestDao.findById(areaOfInterestId);
        if (!results) return next(new AppError("No AreaOfInterest found.", 400));

        res.status(200).json({
            status: "Success",
            data: results,
        });
    };

    /*
   @desc delete AreaOfInterest
   @route delete /api/areaOfInterest/delete/:id
   @access private
   **/
    deleteAreaOfInterest = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const areaOfInterestId = validateNumericParam(req, "id");

        const results = await this.areaOfInterestDao.delete(areaOfInterestId);
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `areaOfInterest ${areaOfInterestId} deleted Successfully`,
        });
    };

    /*
   @desc delete AreaOfInterest
   @route delete /api/areaOfInterest/activate/:id
   @access private
   **/
    activateAreaOfInterest = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const { result: validBody, errors } = await validateBodyInput(req, AreaOfInterestActivateBody);

        if (errors) return res.status(400).json(errors);

        const areaOfInterestId = validateNumericParam(req, "id");

        const results = await this.areaOfInterestDao.update(areaOfInterestId, { isActive: validBody.isActive });
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `areaOfInterest ${areaOfInterestId} deleted Successfully`,
        });
    };

}
