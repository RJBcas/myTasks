import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

import { MatIconModule } from '@angular/material/icon'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TemplateModule } from 'src/app/template/template.module';

import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent,

  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatIconModule,
    Ng2SearchPipeModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    TemplateModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule


  ]
})
export class TaskModule { }
