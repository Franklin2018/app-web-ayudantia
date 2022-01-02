import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class User{
    constructor(
        public _id:string,
        public correo:string,
        public contrasena:string,
        public img_perfil:string,
        public estado:string,
        public rol:string,
    ){
    
    }
    
    }