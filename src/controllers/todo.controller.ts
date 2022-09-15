import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/auth.service';
import { todoService } from '../services/todo.service';
import { sendResponse } from '../utils/api.util';
import { validate } from '../utils/validate.util';
import { addTodoScehma, todoIdSchema } from '../validations/todo.validate';

class TodoController {

    async add(req: Request, res: Response) {
        const userPayload = await authService.getTokenPayload(req, 'ACCESS');
        const body = validate(req, addTodoScehma, 'body');

        await todoService.add(body, userPayload!.userId); // userId still dummy

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'Successfully created a todo'
        });
    }

    async delete(req: Request, res: Response) {
        const userPayload = await authService.getTokenPayload(req, 'ACCESS');
        const params = validate(req, todoIdSchema, 'params');

        await todoService.delete(params.todoId, userPayload!.userId);

        return sendResponse(res, {
            message: 'Successfully deleted a todo'
        });
    }

}

export const todoController = new TodoController();