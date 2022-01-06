import { Pregunta } from "./pregunta";


export class Test{
    constructor(
        public _id:string,
        public asignatura:string,
        public calificacionMinima:string,
        public preguntas:[Pregunta],
    ){
    
    }
    
    }