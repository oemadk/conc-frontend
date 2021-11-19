import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-localstorage',
  templateUrl: './localstorage.component.html',
  styleUrls: ['./localstorage.component.scss']
})
export class LocalstorageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    window.addEventListener('message', function(event) {
      console.log(event, 'event happened?');
      const PERMITTED_DOMAIN = 'http://localhost:8081';
      if (event.origin === PERMITTED_DOMAIN) {
        // var msgKey = Object.keys(msg)[0];
        if (event.data) {
          console.log(event);
          localStorage.setItem('localstorage', JSON.stringify(event.data));
        } else {
          localStorage.removeItem('localstorage');
        }
      }

    });
  }





}
