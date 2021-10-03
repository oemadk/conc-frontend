import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-icubeds',
  templateUrl: './icubeds.component.html',
  styleUrls: ['./icubeds.component.scss']
})
export class IcubedsComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }
}
