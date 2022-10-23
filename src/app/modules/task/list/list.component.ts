import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { DeleteService } from 'src/app/services/delete/delete.service';
import { EditService } from 'src/app/services/edit/edit.service';
import { ListService } from 'src/app/services/listTask/list.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IListData } from '../interface/list.data.interface';
import { LIST_TASK_MOCK } from '../mocks/listTask.mock';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  dataPayload: IListData = {} as IListData
  search: string = '';
  showSearch: boolean = false;

  constructor(public apiList: ListService,
    public rout: Router,
    public apiEdit: EditService,
    public apiDelete: DeleteService,
    public modal: ModalService) {
    this.simulateData();
    this.getData();
  }

  ngOnInit() {

  }

  getData() {
    this.apiList.getDataList().pipe(take(1), filter((res) => res.data !== undefined))
      .subscribe((resDataLis) => {
        this.dataPayload = resDataLis
      }

      )
    this.dataPayload = LIST_TASK_MOCK;
  }
  showSearchFn() {
    this.showSearch = !this.showSearch;
  }

  simulateData() {
    this.apiList.setDataList(LIST_TASK_MOCK);
  }
  addTask() {
    this.rout.navigate(['task/create'])

  }
  editTask(id: number) {
    this.apiEdit.setIdEdit(id);
    this.rout.navigate(['task/edit'])

  }
  deleteTask(id: number) {
    // Simulate Delete data into dataPayload and setting a new data to api
    // this.apiDelete.setIdDelete(id);
    this.dataPayload.data = this.dataPayload.data.filter(res => res.id !== id)
    this.apiList.setDataList(this.dataPayload);
    // if No successes delete execute the next 2 line
    // this.modal.setShowModal(true);
    // this.modal.setDataModal({ title:'Ups!!', description:'A ocurrido un error al tratar de eliminar esta actividad',class:'error'})
  }
}
