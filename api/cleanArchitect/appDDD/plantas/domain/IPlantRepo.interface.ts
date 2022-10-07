
import { IPlant } from "./IPlant.interface";

/**
 * Metodos, sera la capa de abstraccion,  que impacta a cualquier BD
 */
export interface IPlantRepo{

    //create(name:string,añoInicio:number, description:string):Promise<IPlant | null>;
    
    create(task:IPlant):Promise<IPlant | null>;

    list():Promise<IPlant[] | null>;

    findOne(dato:string):Promise<IPlant | null>;
    
    findById(uuid:string):Promise<IPlant | null>;

    delete(dato:string):Promise<IPlant | null>;

}