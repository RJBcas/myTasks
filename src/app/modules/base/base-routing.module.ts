import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'', loadChildren: () => import('../login/login.module').then( (m) => m.LoginModule)
  },
  {
    path:'task', loadChildren: () => import('../task/task.module').then( (m)=> m.TaskModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
