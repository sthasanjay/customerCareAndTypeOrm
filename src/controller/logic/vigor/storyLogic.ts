import { NextFunction, Request, Response } from "express";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import { AppError } from "utils/appError";
import { StoryDao } from "dao/vigor/storyDao";
import {
    StoryUploadByUserBody,
    StoryEditBody,
    StoryApproveBody
} from "controller/dataclass/vigor/storyDataClass";
import { Story } from "entity/vigor/storyModel";
import { IsNull } from "typeorm";
import moment from "moment";

@autoInjectable()
export class StoryController extends QueryFilter<Story> {
    public override entity = Story;

    constructor(private storyDao?: StoryDao) {
        super();
    }

    /*
   @desc Create Story
   @route POST /api/story/user/upload
   @access private
   **/

    createStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { result: validBody, errors } = await validateBodyInput(req, StoryUploadByUserBody);

        if (errors) return res.status(400).json(errors);

        const results = await this.storyDao.create({
            ...validBody,
            userId: req.user.id
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
   @desc Edit Story
   @route POST /api/story/edit/{id}
   @access private
   **/

    editStory = async (req: Request, res: Response, next: NextFunction) => {
        const { result: validBody, errors } = await validateBodyInput(req, StoryEditBody);

        if (errors) return res.status(400).json(errors);

        const storyId = validateNumericParam(req, "id");

        const results = await this.storyDao.updateAndReturn(storyId, { ...validBody });
        if (!results) return next(new AppError(" no story data found to update.", 400));

        res.status(200).json({
            status: "success",
            data: results,
        });
    };

    /*
   @desc Edit Story
   @route POST /api/story/getAll
   @access private
   **/

    getAllStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const results = await this.getData(req.query);
        res.status(200).json({
            status: "Success",
            ...results,
        });
    };

    /*
   @desc Edit Story
   @route POST /api/story/getOne/:id
   @access private
   **/
    getOneStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const storyId = validateNumericParam(req, "id");

        const results = await this.storyDao.findById(storyId);
        if (!results) return next(new AppError("No Story found.", 400));

        res.status(200).json({
            status: "Success",
            data: results,
        });
    };

    /*
   @desc delete Story
   @route delete /api/story/delete/:id
   @access private
   **/
    deleteStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const storyId = validateNumericParam(req, "id");

        const results = await this.storyDao.delete(storyId);
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `story ${storyId} deleted Successfully`,
        });
    };

    /*
   @desc delete Story
   @route delete /api/story/activate/:id
   @access private
   **/
    activateStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const { result: validBody, errors } = await validateBodyInput(req, StoryApproveBody);

        if (errors) return res.status(400).json(errors);

        const storyId = validateNumericParam(req, "id");
        // let updateObj = { isApproved: validBody.isApproved, isActive: validBody.isActive, approvedDate: IsNull() }
        // if (validBody.isApproved) {
        //     updateObj.approvedDate = 
        //     }

        // const results = await this.storyDao.update(storyId, { isApproved: validBody.isApproved, isActive: validBody.isActive, approvedDate: validBody.isApproved ? moment() : IsNull() });
        const results = await this.storyDao.update(storyId, { isApproved: validBody.isApproved, isActive: validBody.isActive, });

        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `story ${storyId} deleted Successfully`,
        });
    };

}
