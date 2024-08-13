import { NextFunction, Request, Response } from "express";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import { AppError } from "utils/appError";
import { NewsDao } from "dao/vigor/newsDao";
import {
    NewsCreateBody,
    NewsEditBody,
    NewsActivateBody
} from "controller/dataclass/vigor/newsDataClass";
import { News } from "entity/vigor/newsModel";

@autoInjectable()
export class NewsController extends QueryFilter<News> {
    public override entity = News;

    constructor(private newsDao?: NewsDao) {
        super();
    }

    /*
   @desc Create News
   @route POST /api/news/create
   @access private
   **/

    createNews = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { result: validBody, errors } = await validateBodyInput(req, NewsCreateBody);

        if (errors) return res.status(400).json(errors);

        const results = await this.newsDao.create({
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
   @desc Edit News
   @route POST /api/news/edit/{id}
   @access private
   **/

    editNews = async (req: Request, res: Response, next: NextFunction) => {
        const { result: validBody, errors } = await validateBodyInput(req, NewsEditBody);

        if (errors) return res.status(400).json(errors);

        const newsId = validateNumericParam(req, "id");

        const results = await this.newsDao.updateAndReturn(newsId, { ...validBody });
        if (!results) return next(new AppError(" no news data found to update.", 400));

        res.status(200).json({
            status: "success",
            data: results,
        });
    };

    /*
   @desc Edit News
   @route POST /api/news/getAll
   @access private
   **/

    getAllNews = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const results = await this.getData(req.query);
        res.status(200).json({
            status: "Success",
            ...results,
        });
    };

    /*
   @desc Edit News
   @route POST /api/news/getOne/:id
   @access private
   **/
    getOneNews = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const newsId = validateNumericParam(req, "id");

        const results = await this.newsDao.findById(newsId);
        if (!results) return next(new AppError("No News found.", 400));

        res.status(200).json({
            status: "Success",
            data: results,
        });
    };

    /*
   @desc delete News
   @route delete /api/news/delete/:id
   @access private
   **/
    deleteNews = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const newsId = validateNumericParam(req, "id");

        const results = await this.newsDao.delete(newsId);
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `news ${newsId} deleted Successfully`,
        });
    };

    /*
   @desc delete News
   @route delete /api/news/activate/:id
   @access private
   **/
    activateNews = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const { result: validBody, errors } = await validateBodyInput(req, NewsActivateBody);

        if (errors) return res.status(400).json(errors);

        const newsId = validateNumericParam(req, "id");

        const results = await this.newsDao.update(newsId, { isActive: validBody.isActive });
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `news ${newsId} deleted Successfully`,
        });
    };

}
