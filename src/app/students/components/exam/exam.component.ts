import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/components/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  id: any;
  subjects :any;
  users :any;
  total :any;
  showResult : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private doctorService : DoctorService,
    private authService: AuthService,
    private toaster : ToastrService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.getSubject();
    this.getUserInfo();
  }

   // getUserInfo
   getUserInfo(){
    this.authService.getRole().subscribe((res:any)=>{
      this.users = res[0];  
      console.log('====================================');
      console.log(this.users);
      console.log('===================================='); 
    })
  }

  // Get Subject:
  getSubject(){
    this.doctorService.getSubject(this.id).subscribe((res)=>{
         this.subjects = res;  
    })
  }
  //get Value Answer 
  getValueInswer(event:any){
    let  answerValue = event.value,
    questionIndex = event.source.name
    this.subjects.questions[questionIndex].studentsAnswer = answerValue;
  }
  // Get Resultat:
  getResultat(){
     this.total = 0;
    for(let x in  this.subjects.questions){
      if(this.subjects.questions[x].correctAnswer == this.subjects.questions[x].studentsAnswer){
     this.total ++;
      }
    }
   this.showResult = true
  }
   // delete Subject
   delete(index:any){
    let id = this.subjects.questions[index].id;
    this.subjects.questions.splice(index,1);
    this.doctorService.delete(id).subscribe((res:any)=>{
         this.toaster.success("Delete With Success!")
    })
    console.log(id);
  }




}
