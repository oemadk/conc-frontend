import { Component, OnInit } from '@angular/core';
import { RfaService } from 'src/app/_services/rfa.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

import {  TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-icudirectrequest',
  templateUrl: './icudirectrequest.component.html',
  styleUrls: ['./icudirectrequest.component.scss']
})
export class IcudirectrequestComponent implements OnInit {

  constructor(private modalService: BsModalService, private rfaService: RfaService, private route: ActivatedRoute,
              private router: Router ) { }
  pending: any;
  declined: any;
  accepted: any;
  modalRef?: BsModalRef;
  declinedData: any;
  ngOnInit(): void {
    this.pending = this.rfaService.getPending();
    this.accepted = this.rfaService.getAccepted();
    this.declined = this.rfaService.getDeclined();}

  gotofilledform(data: any): void{
    this.router.navigate(['/rfafilled', data._id ]);
  }
  gotoAdmission(): void{
    this.router.navigate(['/icubeds']);
  }
  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>, data: any) {
    this.declinedData = data;
    this.modalRef = this.modalService.show(template);
  }

}
