import { NextFunction, Request, Response } from "express";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import { AppError } from "utils/appError";
import { EventDao } from "dao/vigor/eventDao";
import {
    EventCreateBody,
    EventEditBody,
    EventActivateBody
} from "controller/dataclass/vigor/eventDataClass";
import { Event } from "entity/vigor/eventModel";

@autoInjectable()
export class EventController extends QueryFilter<Event> {
    public override entity = Event;

    constructor(private eventDao?: EventDao) {
        super();
    }

    /*
   @desc Create Event
   @route POST /api/event/create
   @access private
   **/

    createEvent = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { result: validBody, errors } = await validateBodyInput(req, EventCreateBody);

        if (errors) return res.status(400).json(errors);

        const results = await this.eventDao.create({
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
   @desc Edit Event
   @route POST /api/event/edit/{id}
   @access private
   **/

    editEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { result: validBody, errors } = await validateBodyInput(req, EventEditBody);

        if (errors) return res.status(400).json(errors);

        const eventId = validateNumericParam(req, "id");

        const results = await this.eventDao.updateAndReturn(eventId, { ...validBody });
        if (!results) return next(new AppError(" no event data found to update.", 400));

        res.status(200).json({
            status: "success",
            data: results,
        });
    };

    /*
   @desc Edit Event
   @route POST /api/event/getAll
   @access private
   **/

    getAllEvent = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const results = await this.getData(req.query);
        res.status(200).json({
            status: "Success",
            ...results,
        });
    };

    /*
   @desc Edit Event
   @route POST /api/event/getOne/:id
   @access private
   **/
    getOneEvent = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const eventId = validateNumericParam(req, "id");

        const results = await this.eventDao.findById(eventId);
        if (!results) return next(new AppError("No Event found.", 400));

        res.status(200).json({
            status: "Success",
            data: results,
        });
    };

    /*
   @desc delete Event
   @route delete /api/event/delete/:id
   @access private
   **/
    deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const eventId = validateNumericParam(req, "id");

        const results = await this.eventDao.delete(eventId);
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `event ${eventId} deleted Successfully`,
        });
    };

    /*
   @desc delete Event
   @route delete /api/event/activate/:id
   @access private
   **/
    activateEvent = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const { result: validBody, errors } = await validateBodyInput(req, EventActivateBody);

        if (errors) return res.status(400).json(errors);

        const eventId = validateNumericParam(req, "id");

        const results = await this.eventDao.update(eventId, { isActive: validBody.isActive });
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `event ${eventId} deleted Successfully`,
        });
    };

}
