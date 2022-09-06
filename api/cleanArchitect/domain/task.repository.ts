import { ITask } from "./task.model";

/**
 * sera la capa de abstraccion con metodos,  que impacta a cualquier BD
 */
export interface ITaskRepo{

    findTaskById(uuid:string):Promise<ITask | null>;

    createTask(name:string,añoInicio:number, description:string):Promise<ITask | null>;
    createTask2(task:ITask):Promise<ITask | null>;

    listTask():Promise<ITask[] | null>;
}