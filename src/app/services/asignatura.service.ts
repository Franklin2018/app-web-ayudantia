import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {  Asignatura } from '../models/asignatura';
import { global } from './global';
@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  public url: string;

  constructor(
    private _http:HttpClient
){
    this.url=global.url;
}

getAsignaturas():Observable<any>{
  let headers= new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.get(this.url+'getasignaturas',{headers:headers});
}	

getTestByMateria(asignaturaId):Observable<any>{
  let headers= new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.get(this.url+'get/test/'+asignaturaId,{headers:headers});
}	

getAsignaturaById(asignaturaId):Observable<any>{
  let headers= new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.get(this.url+'getasignatura/'+asignaturaId,{headers:headers});
}	

getAuxiliarById(auxiliarId):Observable<any>{
  let headers= new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.get(this.url+'getauxbyid/'+auxiliarId,{headers:headers});
}	


pushAdignaturaToUser(dataAsigUser:any):Observable<any>{
    
  let params=JSON.stringify(dataAsigUser);
  let headers= new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.post(this.url+'pushtouser', params,{headers:headers});
  
  }



  getEstudiantesByAuxIdAsigId(auxId:any, asigId:any):Observable<any>{
  let headers= new HttpHeaders().set('Content-Type', 'application/json');
   return this._http.get(this.url+'get/students/'+auxId+'/'+asigId,{headers:headers});

  }	

  getSalaByAuxIdAsigId(auxId:any, asigId:any):Observable<any>{
    let headers= new HttpHeaders().set('Content-Type', 'application/json');
     return this._http.get(this.url+'getnombresala/'+auxId+'/'+asigId,{headers:headers});
  
    }	

}
