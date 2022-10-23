import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient, public modal: ModalService) { }
  private idDelete = new BehaviorSubject<number>(0);
  private isSuccesses = new BehaviorSubject<boolean>(false);

  apiDeleteTask(idDelete: number) {
    const headerDirect = {
      'Content-Type': 'application/json'
    }
    const requestOption = {
      headers: new HttpHeaders(headerDirect)
    }
    this.http.delete(`${environment.urlApiEditTask}/${idDelete}`, requestOption)
      .pipe(
        catchError(this.handleError)
      ).subscribe((responseApiEdit: any) => {
        this.setIsSuccesses(responseApiEdit)
      })
  }
  getIdDelete() {
    return this.idDelete.asObservable();
  }
  setIdDelete(id: number) {
    this.idDelete.next(id);
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
      description: 'No se pudo eliminar la Tarea',
      class: 'error'

    })
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
