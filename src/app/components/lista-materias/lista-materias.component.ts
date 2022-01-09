import { Asignatura } from './../../models/asignatura';
import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { UserService } from 'src/app/services/user.service';
 

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.css'],
  providers:[AsignaturaService,UserService]
})
export class ListaMateriasComponent implements OnInit {
public user:any;
public asignaturas:Asignatura;
private sw:boolean=true;

  constructor(
    private _asignaturaService:AsignaturaService,
    private _userService:UserService,
    
  ) { 
    this.user=this._userService.getUserData();
    
  }

  ngOnInit(): void {
     this.getMateriasByAuxId(this.user._id);
    
    
  }
  getMateriasByAuxId(userId: any) {

    this._asignaturaService.getAuxiliarById(userId).subscribe(res=>{
      this.asignaturas=res.auxiliar.asignatura;
        },
        err=>{
      console.log(err);
        }
        );

  }

}
