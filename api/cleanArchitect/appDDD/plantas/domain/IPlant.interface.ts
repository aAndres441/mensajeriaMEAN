import { IPropiedad } from "./IPropiedad.interface";

/*********
 * Interface datos que seran los que me importan para el negocio
 */
export interface IPlant{
    uuid:string,
    name:string,
    description:string,
    propiedades:IPropiedad
}