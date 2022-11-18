import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    debugger;
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then((res: any) => {
      alert('You are Successfully signed up!');
      this.router.navigate(['/sign-in']);
      localStorage.setItem('signUp','yes');
    })
      .catch(err => {
        alert(err.message);
        if (err.message == 'The email address is already in use by another account.') {
          this.router.navigate(['/sign-in']);
        }
      });
  }


  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('signInUserEmail', email);
        localStorage.setItem('signIn', 'true');
        this.router.navigate(['products']);
        alert('You are Successfully logged in!');
      })
      .catch(err => {
        alert(err.message);
      });
  }

}
