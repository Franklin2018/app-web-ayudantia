import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements DoCheck {
  title = 'Auxiliaturas';
  public usuario:any;
  public persona:any;
  public userData:any;
  public token:any;
  public status:boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService:UserService,
  ) {
    this.usuario=this._userService.getUsuario();
    this.persona=this._userService.getPersona();
    this.userData=this._userService.getUserData();
    this.token=this._userService.getToken();
   } 
   
  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.loadUser();
  }


loadUser(){
 
  let usuario=JSON.parse(localStorage.getItem('usuario'));
  if(usuario==null){
    this.status=false;
  }else{
    this.status=true;
  }

    this.usuario=this._userService.getUsuario();
    this.persona=this._userService.getPersona();
    this.userData=this._userService.getUserData();
    this.token=this._userService.getToken();
   }

   
   logout(){
    this.status=false;
    localStorage.clear();
    this.usuario=null; 
    this.persona=null; 
    this.userData=null; 
    this.token=null;  
    this._router.navigate(['/']);
  }
}

