import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  createSubjects(model:any){
    return this.http.post(environment.baseApi+'subjects',model);
  }

  // Delete Subjects
  deleteSubjects(model:any, id:any){
    return this.http.delete(environment.baseApi+'subjects/'+id ,model);
  }

   // Delete
   delete(id:any){
    return this.http.delete(environment.baseApi+'subjects/'+id );
  }



    // Get One Subject
    getSubject(id:any){
      return this.http.get(environment.baseApi+'subjects/'+id );
    }
  
  // Get All Subjects:
  getAllSubjects(){
    return this.http.get(environment.baseApi+'subjects');
  }

}
