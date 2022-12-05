import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-report-list-modal',
  templateUrl: './business-report-list-modal.component.html',
  styleUrls: ['./business-report-list-modal.component.scss'],
})
export class BusinessReportListModalComponent implements OnInit {
@Input('id') id:string
  constructor(
    public modalController: ModalController,

  ) { }

  ngOnInit() {}

}
