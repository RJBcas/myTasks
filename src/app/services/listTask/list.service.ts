import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { IListData } from 'src/app/modules/task/interface/list.data.interface';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient, public modal: ModalService, public rout: Router) { }
  private dataList = new BehaviorSubject<IListData>({} as IListData);
  apiGetList() {
    const headerDirect = {
      'Content-Type': 'application/json'
    }
    const requestOption = {
      headers: new HttpHeaders(headerDirect)
    }
    this.http.get(environment.urlApiListTask)
      .pipe(
        catchError(this.handleError)
      ).subscribe((responseApiLogin: any) => {
        this.setDataList(responseApiLogin)

      })
  }
  setDataList(data: IListData) {
    this.dataList.next(data)
  }
  getDataList() {
    return this.dataList.asObservable();
  }

  handleError() {
    this.modal.setDataModal({
      title: 'Ups!!!',
      description: 'No se pudo Editar la Tarea',
      class: 'error'

    })
    this.rout.navigate([''])
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
