import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JitsiComponent } from './components/jitsi/jitsi.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { ListaMateriasComponent } from './components/lista-materias/lista-materias.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { ListaEstudiantesComponent } from './components/lista-estudiantes/lista-estudiantes.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'meet/:materiaId/:auxId',
    component: JitsiComponent
  },
  {
    path: 'aux/test/:id',
    component: TestComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login/:id',
    component: LoginComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'mismaterias',
    component: ListaMateriasComponent
  },
  {
    path: 'lista/alumnos/:id',
    component: ListaEstudiantesComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {path:'**',
  component:WelcomeComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
