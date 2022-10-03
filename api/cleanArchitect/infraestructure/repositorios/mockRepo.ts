import { ITask } from "../../domain/task.IEntity";
import { ITaskRepo } from "../../domain/task.repository";

/**
 * implementa la interface de dominio que pega o trae datos harcodeados
 */

const task_Mock1: ITask = {
  uuid: '001-22',
  name: 'Futbol',
  añoInicio: 1999,
  description: 'ther is a bad match'
};
const task_Mock2: ITask  = {
  uuid: '002-44',
  name: 'Fronton',
  añoInicio: 2010,
  description: 'beautyfull ball'
};

const ver = 'pppp';

 export class MockRepo implements ITaskRepo {

  listTask = async ():Promise<ITask[]> => {
    setInterval(() => {
      return [task_Mock1, task_Mock2];
    }, 3000);
    const resultado = [task_Mock1, task_Mock2,task_Mock1, task_Mock2];
    return resultado;
  }
  
  createTask = async (task_Mock3: ITask):Promise<ITask> => {
    const resultado = task_Mock3;
    setTimeout(() => {
    }, 2000);
    return resultado;
  }

  findTaskById = async (uuid: string):Promise<ITask> => {
    const resultado = task_Mock1;
    return resultado;
  }

  findOneTask = async (dato: string):Promise<ITask> => {
    return task_Mock1;
  }

  deleteTask = async (uuid: string):Promise<ITask> => { 
    return task_Mock2;
  }
}
