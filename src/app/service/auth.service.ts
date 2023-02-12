import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData= {
    userName: 'user@gmail.com',
    password: '123456',
  }

  private environment:any = environment;

  constructor() { 
  }

  login(userCredential:any) {
    if(userCredential.userName === this.userData.userName && userCredential.password === this.userData.password) {
      return true
    }
    return false
  }

  isLoggedIn():boolean {
    let local = localStorage.getItem('user_info');
    if(local === environment.token) {
      console.log('token validation successful');
      
      return true
    }
    return false
  }
}
