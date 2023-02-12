import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: any = '';
  public password: any = '';
  private environment: any = environment;
  constructor(private router: Router, public _authService: AuthService) {

    if (this._authService.isLoggedIn()) {
      //now redirecting to employee dashboard
      this.router.navigate(['admin/employee-list']);
    }
  }

  ngOnInit(): void { }
  onsubmit() {
    this.submitToLogin(this.username, this.password);
  }

  submitToLogin(username: any, password: any) {

    if (this._authService.login({ userName: username, password: password })) {
      //set user login related token
      localStorage.setItem('user_info', this.environment.token);

      if (localStorage.getItem('user_info') != null) {
        console.log('redirecting');

        //now redirecting to employee dashboard
        this.router.navigate(['admin/employee-list']);
      }
    } else {
      console.log('faild');

    }
  }
}
