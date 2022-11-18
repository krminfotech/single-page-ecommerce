import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  model: any = {
    email: '',
    password: ''
  };
  email!: string;
  password!: string;

  otpUserID = localStorage.getItem('userIdOTP');
  otpUserPhoneNumber = localStorage.getItem('userPhoneNumberOTP');
  signIn: any = localStorage.getItem('signIn');
  signUpAuth:any = localStorage.getItem('signUp');

  constructor(private authenticationService: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.goAuth();
  }

  signUp() {
    this.email = this.model.email;
    this.password = this.model.password;
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  goAuth() {
    debugger;
    if ((this.otpUserID == '' && this.otpUserPhoneNumber == '') || (this.otpUserID == null && this.otpUserPhoneNumber == null)) {
      this.router.navigate(['/phoneAuth']);
    }
    if (this.signIn == "true") {
      this.router.navigate(['products']);
    }
    else if(this.signUpAuth == "yes"){
      this.router.navigate(['/sign-in']);
    }
    else {
      return;
    }
  }

}
