import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/listTask/list.service';
import { Datum, IListData } from '../interface/list.data.interface';
import { take } from 'rxjs';
import { EditService } from 'src/app/services/edit/edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  listTask: IListData = {} as IListData
  createForm = new FormGroup({
    title: new FormControl(),
    tasks: new FormArray([])
  })
  tasks = this.createForm.get('tasks') as FormArray
  editThisTask: Datum = {} as Datum;

  constructor(public apiList: ListService, public rout: Router,
    public apiEdit: EditService) {
    this.getlisData();
  }

  ngOnInit(): void {
  }

  addTask() {
    const tasksG = new FormGroup({
      task: new FormControl('', Validators.required),
      isComplete: new FormControl(false)
    })
    this.tasks.push(tasksG)
  }

  editTask() {
    this.editThisTask.title = this.createForm.getRawValue().title;
    this.editThisTask.tasks = this.createForm.getRawValue().tasks
    this.editThisTask.date = this.formatDate(new Date());
    this.editThisTask.time = this.formatAMPM(new Date())
    // this part is simulate call the back end, and create a new task
    this.listTask.data.push(this.editThisTask)
    this.apiList.setDataList(this.listTask)
    this.rout.navigate(['task'])


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
  goToList() {
    this.rout.navigate(['task'])
  }
  getId() {
    this.apiEdit.getIdEdit().pipe(take(1)).subscribe(resId => {
      this.editThisTask = this.listTask.data.filter(res => res.id === resId)[0]
      this.listTask.data = this.listTask.data.filter(resLis => resLis.id !== resId)
      this.setFormData();
    })
  }

  getlisData() {
    this.apiList.getDataList().pipe(take(1)).subscribe(resList => {
      this.listTask = resList;
      console.log(this.listTask)
      this.getId()
    })
  }

  setFormData() {
    this.createForm.get('title')?.setValue(this.editThisTask.title)
    this.editThisTask.tasks.forEach(task => {
      const tasksG = new FormGroup({
        task: new FormControl(task.task, Validators.required),
        isComplete: new FormControl(task.isComplete)
      })
      this.tasks.push(tasksG)
    })
  }
}
