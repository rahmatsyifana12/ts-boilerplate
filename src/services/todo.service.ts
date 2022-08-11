import { Todo } from '../database/entities/todo.entity';
import type { AddTodoType } from '../validations/todo.validate';

class TodoService {

    async add(rawTodo: AddTodoType, userId: number) {
        const todo = Todo.create({ userId, ...rawTodo });

        await Todo.save(todo);
    }

}

export const todoService = new TodoService();