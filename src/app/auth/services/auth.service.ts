
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
users = new Subject();
  private baseUrl: string;
  constructor(private http:HttpClient) { 
    this.baseUrl = environment.baseApi;
  }

  createUser(model:any){
    return this.http.post(this.baseUrl+"students", model);
  }

  login(model:any){
    return this.http.put(this.baseUrl+'login/1', model);
  }

  getUsers(type:string){
    return this.http.get(this.baseUrl + type)
  }
  getRole(){
    return this.http.get(this.baseUrl+'login');
  }
}
