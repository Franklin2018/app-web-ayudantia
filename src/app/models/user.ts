export class User{
    constructor(
        public _id:string,
        public fullname:string,
        public email:string,
        public password:string,
        public status:boolean,
        public img:string,
        public room:any,
        public saved:any 
    ){
    
    }
    
    }