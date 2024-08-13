import { NextFunction, Request, Response } from "express";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import { AppError } from "utils/appError";
import { CityDao } from "dao/vigor/cityDao";
import {
    CityCreateBody,
    CityEditBody,
    CityActivateBody
} from "controller/dataclass/vigor/cityDataClass";
import { City } from "entity/vigor/cityModel";

@autoInjectable()
export class CityController extends QueryFilter<City> {
    public override entity = City;

    constructor(private cityDao?: CityDao) {
        super();
    }

    /*
   @desc Create City
   @route POST /api/city/create
   @access private
   **/

    createCity = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { result: validBody, errors } = await validateBodyInput(req, CityCreateBody);

        if (errors) return res.status(400).json(errors);

        const results = await this.cityDao.create({
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
   @desc Edit City
   @route POST /api/city/edit/{id}
   @access private
   **/

    editCity = async (req: Request, res: Response, next: NextFunction) => {
        const { result: validBody, errors } = await validateBodyInput(req, CityEditBody);

        if (errors) return res.status(400).json(errors);

        const cityId = validateNumericParam(req, "id");

        const results = await this.cityDao.updateAndReturn(cityId, { ...validBody });
        if (!results) return next(new AppError(" no city data found to update.", 400));

        res.status(200).json({
            status: "success",
            data: results,
        });
    };

    /*
   @desc Edit City
   @route POST /api/city/getAll
   @access private
   **/

    getAllCity = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const results = await this.getData(req.query);
        res.status(200).json({
            status: "Success",
            ...results,
        });
    };

    /*
   @desc Edit City
   @route POST /api/city/getOne/:id
   @access private
   **/
    getOneCity = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const cityId = validateNumericParam(req, "id");

        const results = await this.cityDao.findById(cityId);
        if (!results) return next(new AppError("No City found.", 400));

        res.status(200).json({
            status: "Success",
            data: results,
        });
    };

    /*
   @desc delete City
   @route delete /api/city/delete/:id
   @access private
   **/
    deleteCity = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const cityId = validateNumericParam(req, "id");

        const results = await this.cityDao.delete(cityId);
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `city ${cityId} deleted Successfully`,
        });
    };

    /*
   @desc delete City
   @route delete /api/city/activate/:id
   @access private
   **/
    activateCity = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const { result: validBody, errors } = await validateBodyInput(req, CityActivateBody);

        if (errors) return res.status(400).json(errors);

        const cityId = validateNumericParam(req, "id");

        const results = await this.cityDao.update(cityId, { isActive: validBody.isActive });
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `city ${cityId} deleted Successfully`,
        });
    };

}
