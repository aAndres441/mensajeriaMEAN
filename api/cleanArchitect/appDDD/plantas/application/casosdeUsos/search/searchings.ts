/**
 * solo conoce a dominio; 
 * dependencia porque es una inyecccion de un repositorio para saber metodos
 * no lo implemento directamente, sino que se injecta en constructor
 */

import { IPlant } from "../../../domain/IPlant.interface";
import { IPlantRepo } from "../../../domain/IPlantRepo.interface";

 
 export class Searching {
 
     constructor(private readonly repo: IPlantRepo) { }
 
     list = async (): Promise<IPlant[] | null> => {
         try {
             const lst = await this.repo.list();
             return lst;
         } catch (error) {
             return [];
         }
     }
 
     findOne = async (dato: string): Promise<IPlant | null> => {
         try {
             const dev = await this.repo.findOne(dato);
             return dev;
         } catch (error) {
             console.log(error);
             return null;
         }
     }
 
     findById = async (uuid: string): Promise<IPlant | null> => {
         try {
             const res = await this.repo.findById(uuid);
             if (res === null) return null;
             return res;
         } catch (error) {
             console.log(error);
             return null;
         }
     }
 
     delete = async (dato: string): Promise<boolean> => {
         try {
             const resultado = await this.repo.delete(dato);
             if (!resultado) { return false }
             return true;
         } catch (error) {
             console.log(error);
             return false;
         }
     }
 
 }