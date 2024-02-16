import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { NewExamComponent } from './doctor/components/new-exam/new-exam.component';
import { SubjectsComponent } from './doctor/components/subjects/subjects.component';
import { StudentsComponent } from './doctor/components/students/students.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ExamComponent } from './students/components/exam/exam.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { MaterialModule } from './shared/material.module';
import { StudentsModule } from './students/students.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NewExamComponent,
    SubjectsComponent,
    StudentsComponent,
    NavbarComponent,
    ExamComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    DoctorModule,
    MaterialModule,
    StudentsModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage:"en",
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
    
    

  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
