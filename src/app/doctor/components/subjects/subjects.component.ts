import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
subjects :any;
users : any = {};
  constructor(
    private doctorService : DoctorService,
    private authService: AuthService,
    private toaster : ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getSubjects();
  }


  // Get All Subjects:
  getSubjects(){
      this.doctorService.getAllSubjects().subscribe((res:any)=>{
          this.subjects = res;
      })
  }

  // getUserInfo
  getUserInfo(){
    this.authService.getRole().subscribe((res:any)=>{
      this.users = res[0];   
    })
  }

  // delete Subject
  delete(index:any){
    let id = this.subjects[index].id;
    this.subjects.splice(index,1);
    this.doctorService.delete(id).subscribe((res:any)=>{
         this.toaster.success("Delete With Success!")
    })
    console.log(id);
  }

}
