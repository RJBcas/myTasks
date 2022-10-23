import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IModal } from './interface/modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  showModal: boolean = false;
  dataModal: IModal = {} as IModal;
  constructor(private modal: ModalService) {
    this.getData();
  }

  ngOnInit(): void {
  }
  closeModal() {
    this.showModal = false;
  }

  getData() {
    this.modal.getShowModal().subscribe(openModal => {
      this.showModal = openModal
      if (this.showModal) {
        this.modal.getDataModal().subscribe(resDataModal => this.dataModal = resDataModal)
      }
    })
  }

}
