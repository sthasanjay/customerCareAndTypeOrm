import { NextFunction, Request, Response } from "express";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import { AppError } from "utils/appError";
import { PostalCodeDao } from "dao/vigor/postalCodeDao";
import {
    PostalCodeCreateBody,
    PostalCodeEditBody,
    PostalCodeActivateBody
} from "controller/dataclass/vigor/postalCodeDataClass";
import { PostalCode } from "entity/vigor/postalCodeModel";

@autoInjectable()
export class PostalCodeController extends QueryFilter<PostalCode> {
    public override entity = PostalCode;

    constructor(private postalCodeDao?: PostalCodeDao) {
        super();
    }

    /*
   @desc Create PostalCode
   @route POST /api/postalCode/create
   @access private
   **/

    createPostalCode = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { result: validBody, errors } = await validateBodyInput(req, PostalCodeCreateBody);

        if (errors) return res.status(400).json(errors);

        const results = await this.postalCodeDao.create({
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
   @desc Edit PostalCode
   @route POST /api/postalCode/edit/{id}
   @access private
   **/

    editPostalCode = async (req: Request, res: Response, next: NextFunction) => {
        const { result: validBody, errors } = await validateBodyInput(req, PostalCodeEditBody);

        if (errors) return res.status(400).json(errors);

        const postalCodeId = validateNumericParam(req, "id");

        const results = await this.postalCodeDao.updateAndReturn(postalCodeId, { ...validBody });
        if (!results) return next(new AppError(" no postalCode data found to update.", 400));

        res.status(200).json({
            status: "success",
            data: results,
        });
    };

    /*
   @desc Edit PostalCode
   @route POST /api/postalCode/getAll
   @access private
   **/

    getAllPostalCode = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const results = await this.getData(req.query);
        res.status(200).json({
            status: "Success",
            ...results,
        });
    };

    /*
   @desc Edit PostalCode
   @route POST /api/postalCode/getOne/:id
   @access private
   **/
    getOnePostalCode = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const postalCodeId = validateNumericParam(req, "id");

        const results = await this.postalCodeDao.findById(postalCodeId);
        if (!results) return next(new AppError("No PostalCode found.", 400));

        res.status(200).json({
            status: "Success",
            data: results,
        });
    };

    /*
   @desc delete PostalCode
   @route delete /api/postalCode/delete/:id
   @access private
   **/
    deletePostalCode = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const postalCodeId = validateNumericParam(req, "id");

        const results = await this.postalCodeDao.delete(postalCodeId);
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `postalCode ${postalCodeId} deleted Successfully`,
        });
    };

    /*
   @desc delete PostalCode
   @route delete /api/postalCode/activate/:id
   @access private
   **/
    activatePostalCode = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const { result: validBody, errors } = await validateBodyInput(req, PostalCodeActivateBody);

        if (errors) return res.status(400).json(errors);

        const postalCodeId = validateNumericParam(req, "id");

        const results = await this.postalCodeDao.update(postalCodeId, { isActive: validBody.isActive });
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `postalCode ${postalCodeId} deleted Successfully`,
        });
    };

}
