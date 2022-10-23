import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [ HeaderComponent, ModalComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDialogModule
  ],
  exports:[
    HeaderComponent,
    ModalComponent
  ]
})
export class TemplateModule { }
