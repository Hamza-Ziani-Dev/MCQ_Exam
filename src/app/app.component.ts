import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MCQ_Exam';
  lang :any;
// This In Language Translate

  constructor(
    private authService : AuthService,
    private translate: TranslateService
    ) { 
     if('language' in localStorage){
      this.lang = localStorage.getItem('language')
      translate.use(this.lang);
     }else{
      translate.use(this.translate.defaultLang);
     }
    }

   

    ngOnInit(): void {
      this.getUsersData();
    }

    getUsersData(){
      this.authService.getRole().subscribe((res:any)=>{
        this.authService.users.next(res);
      })
    }
}
