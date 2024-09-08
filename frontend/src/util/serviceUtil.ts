import * as webService from './webServiceUtil';
import { Todo } from '@/entity/todo';

// Example service functions
export const registerUser = async (username: string, password: string): Promise<void> => {
    await webService.registerUser(username, password);
};

export const loginUser = async (username: string, password: string): Promise<void> => {
    await webService.loginUser(username, password);
};

export const fetchTodos = async (): Promise<Todo[]> => {
    return await webService.getTodos();
};

export const addTodo = async (task: string): Promise<Todo> => {
    return await webService.createTodo(task);
};

export const modifyTodo = async (id: string, task: string, completed: boolean): Promise<Todo> => {
    return await webService.updateTodo(id, task, completed);
};

export const removeTodo = async (id: string): Promise<void> => {
    await webService.deleteTodo(id);
};
