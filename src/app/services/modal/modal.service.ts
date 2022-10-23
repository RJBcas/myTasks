import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IModal } from 'src/app/template/modal/interface/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModal = new BehaviorSubject<boolean>(false);
  private dataModal = new BehaviorSubject<IModal>({} as IModal)
  constructor() { }

  setShowModal(openModal: boolean) {
    this.showModal.next(openModal)
  }
  getShowModal() {
    return this.showModal.asObservable();
  }
  setDataModal(data: IModal) {
    this.dataModal.next(data)
  }
  getDataModal() {
    return this.dataModal.asObservable();
  }

}
