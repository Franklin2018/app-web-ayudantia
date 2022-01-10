import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RegisterUser } from '../../models/registerUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public error:boolean=false;
  private existData:boolean=false;
  public registrado:boolean=false;
  public user : RegisterUser;
  public url: string;
  private imageFile:any;
  formData=new FormData();
  constructor(
    private _userService:UserService,
  	private _route:ActivatedRoute,
  	private _router:Router,
  ) { 
    this.user=new RegisterUser("","","","","","","","AUX_ROLE");

  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._userService.registerAux(this.user).subscribe(resp=>{
      if(resp.ok == true){
        this.registrado=true;
        let id=resp.usuario._id;

        if(this.existData){ 
          this._userService.pushImageToUser(this.formData,this.imageFile,id).subscribe(response=>{
            if(response.ok == true){
              this._router.navigate(['/login/2']);
            }
          },err=>{
            this.error=true;
            console.log(err);
          });
        }else{
          this._router.navigate(['/login/2']);
        }
      }

    },err=>{
      this.error=true;
      console.log(err)
    });
  }

  selectImage(event:any ){
    if(event.target.files[0]){
      this.imageFile=event.target.files[0];
    this.existData=true;
    }
  }

}
