import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '', component: ListComponent
    // path:'', component: ListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create', component: CreateComponent
    // path:'create', component: CreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit', component: EditComponent
    // path:'edit', component: EditComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
