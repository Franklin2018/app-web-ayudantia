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
  public identity: any;
  public user : User;
  public token: any;

  constructor(
    private _userService:UserService,
  	private _route:ActivatedRoute,
  	private _router:Router,
  ) { 
    this.user=new User('','','','',true,'','','');
  }

  ngOnInit(): void {
    this.getType();
  }

  onSubmit(){
    // this._userService.login(this.user).subscribe(
    //   response=>{
    //       if(response.user && response.user._id){
    //         localStorage.setItem('room', 'true'); 
    //         this.identity=response.user;
    //         localStorage.setItem('identity', JSON.stringify(this.identity));
    //         this.token=response.token;
    //         localStorage.setItem('token', this.token);
    //         this.error=false;
    //         localStorage.setItem('type', 'home');
    //         this._router.navigate(['/home']);
    //       }else{
    //         this.error=true;
    //         console.log(this.error)
    //         console.log(response.err);
           
          
    //       }
    //   },
    //   err=>{
    //     this.error=true;
    //    console.log(err.error.err.message);
       
    //   }
    // );
  }

  getType(){
    //Verify StudentUser or AuxiliarUser
      this._route.params.subscribe(params=>{
        let type=+params['id'];
       console.log(type);
      });	
    }

}
