import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.scss'],

})
export class WelcomepageComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               private router: Router) { }
    goto(id: number){
      this.router.navigate(['/login', id]);
    }

  ngOnInit(): void {
  }

}
