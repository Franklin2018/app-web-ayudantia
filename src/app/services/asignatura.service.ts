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



}
