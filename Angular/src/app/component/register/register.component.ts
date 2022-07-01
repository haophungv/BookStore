import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles = '';
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}
  onSubmit(): void {
    const { username, password } = this.form;
    this.authenticationService.register(username, password).subscribe({
      next: (data) => {
        console.log(data);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.roles = 'user';
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
    this.isSuccessful = false;

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
