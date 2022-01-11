import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JitsiComponent } from './components/jitsi/jitsi.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { AsignaturaService } from './services/asignatura.service';
import { ListaMateriasComponent } from './components/lista-materias/lista-materias.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { ListaEstudiantesComponent } from './components/lista-estudiantes/lista-estudiantes.component';



@NgModule({
  declarations: [
    AppComponent,
    JitsiComponent,
    TestComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    ListaMateriasComponent,
    ErrorComponent,
    RegisterComponent,
    ListaEstudiantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [
    UserService,
    AsignaturaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
