import { NextFunction, Request, Response } from "express";
import { validateBodyInput, validateNumericParam } from "helpers/controller/validator";
import { QueryFilter } from "helpers/controller/queryFilter";
import { autoInjectable } from "tsyringe";
import { AppError } from "utils/appError";
import { TaskDao } from "dao/vigor/taskDao";
import {
    TaskCreateBody,
    TaskEditBody,
    TaskActivateBody
} from "controller/dataclass/vigor/taskDataClass";
import { Task } from "entity/vigor/taskModel";

@autoInjectable()
export class TaskController extends QueryFilter<Task> {
    public override entity = Task;

    constructor(private taskDao?: TaskDao) {
        super();
    }

    /*
   @desc Create Task
   @route POST /api/task/create
   @access private
   **/

    createTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { result: validBody, errors } = await validateBodyInput(req, TaskCreateBody);

        if (errors) return res.status(400).json(errors);

        const results = await this.taskDao.create({
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
   @desc Edit Task
   @route POST /api/task/edit/{id}
   @access private
   **/

    editTask = async (req: Request, res: Response, next: NextFunction) => {
        const { result: validBody, errors } = await validateBodyInput(req, TaskEditBody);

        if (errors) return res.status(400).json(errors);

        const taskId = validateNumericParam(req, "id");

        const results = await this.taskDao.updateAndReturn(taskId, { ...validBody });
        if (!results) return next(new AppError(" no task data found to update.", 400));

        res.status(200).json({
            status: "success",
            data: results,
        });
    };

    /*
   @desc Edit Task
   @route POST /api/task/getAll
   @access private
   **/

    getAllTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const results = await this.getData(req.query);
        res.status(200).json({
            status: "Success",
            ...results,
        });
    };

    /*
   @desc Edit Task
   @route POST /api/task/getOne/:id
   @access private
   **/
    getOneTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const taskId = validateNumericParam(req, "id");

        const results = await this.taskDao.findById(taskId);
        if (!results) return next(new AppError("No Task found.", 400));

        res.status(200).json({
            status: "Success",
            data: results,
        });
    };

    /*
   @desc delete Task
   @route delete /api/task/delete/:id
   @access private
   **/
    deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const taskId = validateNumericParam(req, "id");

        const results = await this.taskDao.delete(taskId);
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `task ${taskId} deleted Successfully`,
        });
    };

    /*
   @desc delete Task
   @route delete /api/task/activate/:id
   @access private
   **/
    activateTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const { result: validBody, errors } = await validateBodyInput(req, TaskActivateBody);

        if (errors) return res.status(400).json(errors);

        const taskId = validateNumericParam(req, "id");

        const results = await this.taskDao.update(taskId, { isActive: validBody.isActive });
        if (!results.affected) return next(new AppError("no data found", 400));
        res.status(200).json({
            message: `task ${taskId} deleted Successfully`,
        });
    };

}
