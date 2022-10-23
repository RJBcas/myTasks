import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/listTask/list.service';
import { Datum, IListData } from '../interface/list.data.interface';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal/modal.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  listTask: IListData = {} as IListData

  createForm = new FormGroup({
    title: new FormControl('', Validators.required),
    tasks: new FormArray([
      new FormGroup({
        task: new FormControl('', Validators.required),
        isComplete: new FormControl(false)
      })
    ])
  })

  tasks = this.createForm.get('tasks') as FormArray
  newTask: Datum = {} as Datum;


  constructor(public apiList: ListService, public rout: Router,
    public modal: ModalService) {
  }

  ngOnInit(): void {
    console.log(this.createForm.valid)
  }

  addTask() {
    const tasksG = new FormGroup({
      task: new FormControl('', Validators.required),
      isComplete: new FormControl(false)
    })
    this.tasks.push(tasksG)
  }
  goToList() {
    this.rout.navigate(['task'])
  }
  createTask() {

    this.newTask.id = Math.floor(Math.random() * new Date().getMilliseconds())
    this.newTask.title = this.createForm.getRawValue().title;
    this.newTask.tasks = this.createForm.getRawValue().tasks
    this.newTask.date = this.formatDate(new Date());
    this.newTask.time = this.formatAMPM(new Date())

    this.apiList.getDataList().pipe(take(1)).subscribe(res => {
      this.listTask = res;
      this.listTask.data.push(this.newTask)
      this.apiList.setDataList(this.listTask)
      this.modal.setShowModal(true);
      this.modal.setDataModal({
        title: 'Actividad Creada',
        description: 'Actividad Creada Exitosamente',
        class: 'successes'
      })
      this.rout.navigate(['task'])
    });

  }
  removeTask(index: number) {
    this.tasks.removeAt(index)
  }

  formatDate(date: Date) {
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear().toString().slice(2)}`
  }
  formatAMPM(date: Date) {
    let hours = date.getHours();
    let minutesNumber = date.getMinutes();
    let minuteStr;
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minuteStr = minutesNumber < 10 ? '0' + minutesNumber : minutesNumber;

    return `${hours}:${minuteStr} ${ampm}`;
  }

}
