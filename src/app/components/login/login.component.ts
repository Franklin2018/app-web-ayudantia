import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import {Router,ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  public error:boolean | undefined;
  public title:string;
  public type:number;
  public usuario=[
      {rol :''},
      {id:''},
      {correo:''},
      {img_perfil:''},
  ];
  public persona=[
    {id :''},
    {nombre:''},
    {apellidos:''},
    {celular:''},
    {direccion:''},
];
  public userData: any;
  public user : User;
  public token: any;

  constructor(
    private _userService:UserService,
  	private _route:ActivatedRoute,
  	private _router:Router,
  ) { 
    this.user=new User("","","","","","");
  }

  ngOnInit(): void {
    this.setTitle();
  }
  setTitle() {
 //Verify StudentUser or AuxiliarUser
 this._route.params.subscribe(params=>{
  this.type=+params['id'];
    if (this.type==1) {
      this.title="Login Estudiante"
    }else{
      this.title="Login Auxiliar"
    }
});	
  }

  onSubmit(){
    this._userService.login(this.user).subscribe(
      response=>{
          if(response.ok == true){
            this.setData(response);
            
            localStorage.setItem('usuario', JSON.stringify(this.usuario));
            localStorage.setItem('persona', JSON.stringify(this.persona));
            localStorage.setItem('userData', JSON.stringify(this.userData));
            localStorage.setItem('token', this.token);
            this.error=false;
            this._router.navigate(['/home']);
          }else{
            this.error=true;
            console.log(response);
          }
      },
      err=>{
        this.error=true;
        console.log(err);
       
      }
    );
  }

  
  setData(response: any) {
  this.usuario[0].rol=response.usuario.rol;
  this.usuario[1].id=response.usuario._id;
  this.usuario[2].correo=response.usuario.correo;
  this.usuario[3].img_perfil=response.usuario.img_perfil;

  this.persona[0].id=response.persona._id;
  this.persona[1].nombre=response.persona.nombre;
  this.persona[2].apellidos=response.persona.apellidos;
  this.persona[3].celular=response.persona.celular;
  this.persona[4].direccion=response.persona.direccion;

  this.userData=response.data;

  this.token=response.token; 

  }

  

 
}
