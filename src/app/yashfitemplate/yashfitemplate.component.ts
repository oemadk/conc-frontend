import {Component, OnInit, TemplateRef} from '@angular/core';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-yashfitemplate',
  templateUrl: './yashfitemplate.component.html',
  styleUrls: ['./yashfitemplate.component.scss']
})
export class YashfitemplateComponent implements OnInit {
  add = true;
  url = 'http://localhost:8081/_/plugin/doctor/add/template/answer?patientId=248&clinicId=183&patientName=Omar%20Emad&clinicName=Consultation';
  // @ts-ignore
  url2;
  modalRef?: BsModalRef;
  constructor(private sanatizer: DomSanitizer, private router: Router, private modalService: BsModalService) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  goto(){
    const a = localStorage.getItem('tag');
    // tslint:disable-next-line:triple-equals
    if (a == 'it'){
      this.router.navigate(['icudirectrequest']);
    }else{
      this.router.navigate(['icuhome']);

    }

  }
ngOnInit(): void {
    window.addEventListener('storage', () => {
  // When local storage changes, dump the list to
  // the console.
      // @ts-ignore
  console.log(JSON.parse(window.localStorage.getItem('localstorage')));
      // @ts-ignore
  let user = JSON.parse(window.localStorage.getItem('localstorage'));
  if (user != null) {
    console.log(user);
  this.add = false;
  this.url = 'http://localhost:8081/_/plugin/doctor/add/template/answer?clinicId=183&clinicName=Consultation&patientId=' + user.user._id;
  this.url2 = this.sanatizer.bypassSecurityTrustResourceUrl(this.url);
  }
});
  }
// &patientName=Omar%20Emad
  addRfa(){
    this.postCrossDomainMessage('save');
  }
  postCrossDomainMessage(msg: string) {
    // @ts-ignore
    const win = document.getElementById('ifr').contentWindow;
    win.postMessage(msg, 'http://localhost:8081');
  }
}
