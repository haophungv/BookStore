import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles = '';

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password } = this.form;
    this.authenticationService.login(username, password).subscribe({
      next: (data) => {
        console.log(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = 'user';
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
