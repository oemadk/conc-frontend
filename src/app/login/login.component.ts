import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginTitle = '';
  number = this.route.snapshot.paramMap.get('id');

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route: ActivatedRoute,
              private router: Router
) {
    if (this.number){
      if (this.number === '1'){
        this.loginTitle = 'ER/OR/IP Login';
        localStorage.setItem('tag', 'it');
      }else if (this.number === '2'){
        this.loginTitle = 'Consultant ICU/EXT login';
        localStorage.setItem('user', 'user1');
        localStorage.setItem('password', '12345678')
      }else if (this.number === '3'){
        this.loginTitle = 'ICU Nurse login';
        localStorage.setItem('user', 'nurse');
        localStorage.setItem('password', 'Nurse@1234')
      }else if (this.number === '4'){
        this.loginTitle = 'ICU Specialist login';
        localStorage.setItem('user', 'user1');
        localStorage.setItem('password', '12345678')
      }
    }
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.gotoAdmission();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  gotoAdmission(): void{
    if (this.number){
      if (this.number === '1'){
        this.router.navigate(['/icudirectrequest']);
      }else if (this.number === '2'){
        this.router.navigate(['/icuhome']);
      }else if (this.number === '3'){
        this.router.navigate(['/icuhome']);
      }else if (this.number === '4'){
        this.router.navigate(['/icuhome']);
      }
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}
