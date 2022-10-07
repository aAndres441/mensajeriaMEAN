import { Preparacion } from './preperacionEnum';

export interface IPropiedad{
    recomendacion:string[],
    dosis:number,
    preparado:Preparacion,
}