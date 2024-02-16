import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {
  name = new FormControl("");
  questionsForm !: FormGroup;
  questions : any = [];
  correctId:any;
  subjetcName : any;
  stepperIndex = 0;
  startAdd :boolean = false;
  preview : boolean = false;
  id :any;
  constructor(
    private fb: FormBuilder,
    private toaster : ToastrService,
    private doctorService: DoctorService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }


  // Create From 
  createForm(){
    this.questionsForm = this.fb.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
    })
  }




  // Button Start :
  start(){
     if(this.name.value == ""){
      this.toaster.error( "Please enter the subject name", "Error!");
     }else{
      this.subjetcName = this.name.value;
      this.startAdd = true;
     }
     if(this.startAdd){
      this.stepperIndex = 1;
     }
  }

  // get Answer Select By Radio Button:
  getAnswerSelect(event:any){
    // debugger;
    this.correctId = event.value;
     
  }

  // Create Question:
  createQuestion(){
   if(this.correctId){
    const model = {
      question : this.questionsForm.value.question,
      answer1 : this.questionsForm.value.answer1,
      answer2 : this.questionsForm.value.answer2,
      answer3 : this.questionsForm.value.answer3,
      answer4 : this.questionsForm.value.answer4,
      correctAnswer:this.questionsForm.value[this.correctId],
    }
    this.questions.push(model);
    this.questionsForm.reset(); // Reset the FormGroup
   }else{
     this.toaster.error('Please select the correct answer first');
   }
  }
  

  // Save Subjects:
  save(){
    const model = {
      name : this.subjetcName,
      questions : this.questions,
    }
    
    if(this.preview){
      this.stepperIndex = 2;
    }else{
      this.doctorService.createSubjects(model).subscribe((res:any)=>{
        this.preview = true;
        this.id = res.id;
      })
    }

  }


  // Clear From 
  clearForm(){
    this.questionsForm.reset();
  }

  // Cancel From  
  cancelForm(){
    this.questionsForm.reset();
    this.questions = [];
    this.subjetcName = "";
    this.name.reset();
    this.stepperIndex = 0;
    this.startAdd = false;
  }


  // Delete :
  delete(index:any){
    this.questions.splice(index,1);
    const model = {
      name : this.subjetcName,
      questions : this.questions,
    }
    this.doctorService.deleteSubjects(model,this.id).subscribe((res:any)=>{
      this.toaster.success("Delete With Success!");
    })
  }

}
