import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   userForm !: FormGroup;
   students : any = [];
  constructor(
    private authService: AuthService,
    private router : Router,
    private _formBuilder:FormBuilder,
    private toastr: ToastrService
    
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllStudents();
  }
  // Get All Students:
  getAllStudents(){
    this.authService.getUsers("students").subscribe((res:any)=>{
      this.students = res;
      console.log(this.students);
      
    })
  }

  createForm(){
    this.userForm = this._formBuilder.group({
      username : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]],
      confirmPassword : ['', [Validators.required]],
    });
  }
  addStudent(){
    const model = {
      username : this.userForm.value.username,
      email : this.userForm.value.email,
      password : this.userForm.value.password,
    }
    let index = this.students.findIndex((item: any) => item.email === this.userForm.value.email);
    if(index !== -1){
      this.toastr.error("الإيميل موجود سابقا","",{closeButton:true})
    }else{
      this.authService.createUser(model).subscribe((res:any)=>{
        this.toastr.success("تم اضافة بنجاح","",{closeButton:true})
        this.router.navigate(["/login"]);
      })
    }
   
  }

}
