import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JitsiComponent } from './components/jitsi/jitsi.component';

const routes: Routes = [

  {
    path: '',
    component: JitsiComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
