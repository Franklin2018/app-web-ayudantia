import { Asignatura } from './../../models/asignatura';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.css']
})
export class ListaEstudiantesComponent implements OnInit {
  public estudiantes:any;
  public nombreAsig:any;
  public user:any;
  public materiaId:any;
  public auxId:any;
  


  constructor(
    private _asignaturaService:AsignaturaService,
    private _userService:UserService,
    private _route:ActivatedRoute,
  	private _router:Router,
    
  ) { 
    this.user=this._userService.getUsuario();
    
  }

  ngOnInit(): void {
    this.getMateriaData();
    this.getAsignatura();
   this.getEstudiantes();
  this.getUrlSala();

  }

  getUrlSala() {
    this._route.params.subscribe(params=>{
        let materiaId=(params['id']);
        this._asignaturaService.getSalaByAuxIdAsigId(this.user[1].id,materiaId).subscribe(
            resp=>{
            localStorage.setItem('sala', JSON.stringify(resp.sala.url));
            }
        );

        
      });
}

  getEstudiantes() {
    this._route.params.subscribe(params=>{
      let asigId=(params['id']);
      this._asignaturaService.getEstudiantesByAuxIdAsigId(this.user[1].id,asigId).subscribe(
        res=>{
          this.estudiantes=res.estudiantes;
        }
      );
    });
  }

  getAsignatura(){
   
      this._route.params.subscribe(params=>{
        let asigId=(params['id']);
        this._asignaturaService.getAsignaturaById(asigId).subscribe(
          res=>{
         this.nombreAsig= res.asignatura.nombre;
          }
        );
      });

  }

  getMateriaData(){
   
    this._route.params.subscribe(params=>{
      this.materiaId=(params['id']);
      this.auxId=this.user[1].id;
      
    });

}

}
