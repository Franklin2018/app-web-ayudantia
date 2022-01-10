import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
//import { User } from '../models/user';
import { global } from './global';


@Injectable()
export class UserService{
 
    public url: string;
    public usuario: any;
    public persona: any;
    public userData: any;
    public token: any;

    
constructor(
    private _http:HttpClient
){
    this.url=global.url;
}

// register(user:any):Observable<any>{

// let params=JSON.stringify(user);
// let headers= new HttpHeaders().set('Content-Type', 'application/json');
// return this._http.post(this.url+'register', params,{headers:headers});

// }


login(user:any):Observable<any>{
    
let params=JSON.stringify(user);
let headers= new HttpHeaders().set('Content-Type', 'application/json');
return this._http.post(this.url+'login', params,{headers:headers});

}

pushImageToUser(formData:FormData,imgUrl:any,userId:any){
   formData.append('image', imgUrl);
   return this._http.post<any>(this.url+'upload/image/'+userId,formData,);
}

registerAux(auxData:any):Observable<any>{

  let params=JSON.stringify(auxData);
  let headers= new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.post(this.url+'register', params,{headers:headers});
           
}



getUsuario(){
let usuario=JSON.parse(localStorage.getItem('usuario')|| '{}');


if(usuario && usuario != null && usuario !='undefined' && usuario!=undefined){
    this.usuario=usuario;
    }else{
    this.usuario=null;
    }

    return this.usuario;
}


getPersona(){
    let persona=JSON.parse(localStorage.getItem('persona')|| '{}');
    
    
    if(persona && persona != null && persona !='undefined' && persona!=undefined){
        this.persona=persona;
        }else{
        this.persona=null;
        }
    
        return this.persona;
    }


    getUserData(){
        let userData=JSON.parse(localStorage.getItem('userData')|| '{}');
        
        
        if(userData && userData != null && userData !='undefined' && userData!=undefined){
            this.userData=userData;
            }else{
            this.userData=null;
            }
        
            return this.userData;
        }



getToken(){
    let token=localStorage.getItem('token');

    if(token && token != null && token !='undefined' && token!=undefined){
    this.token=token;
        }else{
        this.token=null;
        }
    
        return this.token;
}


/*
getEventos(token,id):Observable<any>{
    let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded')
										.set('token', token);
    return this._http.get(this.url+'service/' + id,{headers:headers});
}	
getImageUrl(id):Observable<any>{
    let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'service/imageurl/' + id,{headers:headers});
}*/



}            