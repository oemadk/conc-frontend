import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { RfaService } from 'src/app/_services/rfa.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';


import {  TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-icuhome',
  templateUrl: './icuhome.component.html',
  styleUrls: ['./icuhome.component.scss']
})
export class IcuhomeComponent implements OnInit {
  pending: any;
  declined: any;
  accepted: any;
  modalRef?: BsModalRef;
  declinedData: any;
  constructor(private modalService: BsModalService, private rfaService: RfaService, private route: ActivatedRoute,
              private router: Router) { }
  facircle = faCircle;
  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>, data: any) {
    this.declinedData = data;
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.pending = this.rfaService.getPending();
    this.accepted = this.rfaService.getAccepted();
    this.declined = this.rfaService.getDeclined();
  }
  gotoAdmission(): void{
    this.router.navigate(['/rfa']);
  }
  gotofilledform(data: any): void{
    this.router.navigate(['/rfafilled', data._id ]);
  }
}
