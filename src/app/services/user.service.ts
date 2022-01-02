import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
//import { User } from '../models/user';
import { global } from './global';


@Injectable()
export class UserService{
 
    public url: string;
    public identity: any;
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

getIdentity(){
let identity=JSON.parse(localStorage.getItem('identity')|| '{}');


if(identity && identity != null && identity !='undefined' && identity!=undefined){
    this.identity=identity;
    }else{
    this.identity=null;
    }

    return this.identity;
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