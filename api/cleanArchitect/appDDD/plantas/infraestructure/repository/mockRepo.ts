
/**
 * implementa la interface de dominio que pega o trae datos harcodeados
 */

import { IPlant } from "../../domain/IPlant.interface";
import { IPlantRepo } from "../../domain/IPlantRepo.interface";
import { IPropiedad } from "../../domain/IPropiedad.interface";
import { Preparacion } from "../../domain/preperacionEnum";

const task_Mock1: IPlant = {
  uuid: '001-22',
  name: 'Calaguala',
  description: 'Helecho',
  propiedades: {
    recomendacion:['tomar','lavar'],
    dosis: 23,
    preparado: Preparacion.infusion
  }
};

const task_Mock2: IPlant  = {
  uuid: '002-44',
  name: 'Rosa',
  description: 'Negra',
  propiedades: {
    recomendacion:['comestible','creamas'],
    dosis: 23,
    preparado: Preparacion.aceite
  }
};


 export class MockRepo implements IPlantRepo {
  create(task: IPlant): Promise<IPlant | null> {
    throw new Error("Method not implemented.");
  }
  list(): Promise<IPlant[] | null> {
    throw new Error("Method not implemented.");
  }
  findOne(dato: string): Promise<IPlant | null> {
    throw new Error("Method not implemented.");
  }
  findById(uuid: string): Promise<IPlant | null> {
    throw new Error("Method not implemented.");
  }
  delete(dato: string): Promise<IPlant | null> {
    throw new Error("Method not implemented.");
  }

  listTask = async ():Promise<IPlant[]> => {
    setInterval(() => {
      return [task_Mock1, task_Mock2];
    }, 3000);
    const resultado = [task_Mock1, task_Mock2,task_Mock1, task_Mock2];
    return resultado;
  }
  
  createTask = async (task_Mock3: IPlant):Promise<IPlant> => {
    const resultado = task_Mock3;
    setTimeout(() => {
    }, 2000);
    return resultado;
  }

  findTaskById = async (uuid: string):Promise<IPlant> => {
    const resultado = task_Mock1;
    return resultado;
  }

  findOneTask = async (dato: string):Promise<IPlant> => {
    return task_Mock1;
  }

  deleteTask = async (uuid: string):Promise<IPlant> => { 
    return task_Mock2;
  }
}
