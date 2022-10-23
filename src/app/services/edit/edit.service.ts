import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, catchError } from 'rxjs';
import { Datum } from 'src/app/modules/task/interface/list.data.interface';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http: HttpClient,
    public modal: ModalService) { }
  private idEdit = new BehaviorSubject<number>(0);
  private isSuccesses = new BehaviorSubject<boolean>(false);

  apiEditTask(taskEdited: Datum) {
    const headerDirect = {
      'Content-Type': 'application/json'
    }
    const requestOption = {
      headers: new HttpHeaders(headerDirect)
    }
    this.http.put(environment.urlApiEditTask, taskEdited, requestOption)
      .pipe(
        catchError(this.handleError)
      ).subscribe((responseApiEdit: any) => {
        this.setIsSuccesses(responseApiEdit)
      })
  }
  getIdEdit() {
    return this.idEdit.asObservable();
  }
  setIdEdit(id: number) {
    this.idEdit.next(id);
  }

  getIsSuccesses() {
    return this.isSuccesses.asObservable();
  }
  setIsSuccesses(successes: boolean) {
    this.isSuccesses.next(successes);
  }

  handleError() {
    this.modal.setDataModal({
      title: 'Ups!!!',
      description: 'No se pudo Editar la Tarea',
      class: 'error'

    })
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
