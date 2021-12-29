import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JitsiComponent } from './components/jitsi/jitsi.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'meet',
    component: JitsiComponent
  },
  {
    path: 'aux/test',
    component: TestComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
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
