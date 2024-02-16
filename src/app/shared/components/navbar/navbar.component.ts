import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
users :any = null;
language :any = "en";
  constructor(
    private authService : AuthService,
    private translate: TranslateService
    ) { 
      this.language = this.translate.currentLang;
    }

  ngOnInit(): void {
    this.authService.users.subscribe((res:any)=>{
        if(res.role){
          this.users = res;
        }
    })
  }


  logout(){
    const model = {}
    this.authService.login(model).subscribe((res:any)=>{
      this.users = null;
      this.authService.users.next(res);
    })
  }

  ChangeLanguages(){
   if(this.language == "en"){
    localStorage.setItem("language","ar")
   }else{
    localStorage.setItem("language","en")
   }
   window.location.reload();
  }

}
