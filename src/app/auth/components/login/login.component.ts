import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  users :any = [];
  type: string = "students";
 constructor(
   private authService: AuthService,
   private router : Router,
   private _formBuilder:FormBuilder,
   private toastr: ToastrService
   
 ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.createForm();
   
  }



  // Get Role:
  getRole(event:any){
    this.type= event.value;
    this.getAllUsers();
  }
    // Get All Users:
   getAllUsers(){
      this.authService.getUsers(this.type).subscribe((res:any)=>{
        this.users = res;
      })
  }
  // Create Form:
  createForm(){
    this.loginForm = this._formBuilder.group({
      type:[this.type],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]],
    });
  }

  login(){
    let index = this.users.findIndex((item: any) => item.email === this.loginForm.value.email && item.password === this.loginForm.value.password);
    if(index === -1){ // Corrected condition
      this.toastr.error("الإيميل او كلمة مرور غير صحيحة","",{closeButton:true});
    } else {
      const model = {
        username: this.users[index].username,
        role: this.type,
      };
      this.authService.login(model).subscribe((res:any)=>{
        this.authService.users.next(res);
        this.toastr.success("تم تسجيل بنجاح","",{closeButton:true});
        this.router.navigate(["/login"]);
      });
    }
  }
  
}
