import { Respuesta } from "./respuesta";

export class Pregunta{
    constructor(
        public _id:string,
        public pregunta:string,
        public respuestas:[Respuesta],
        
    ){
    
    }
    
    }