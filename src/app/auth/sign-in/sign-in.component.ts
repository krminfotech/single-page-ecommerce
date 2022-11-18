import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  model: any = {
    email : '',
    password : ''
  };
  email!: string;
  password!: string;

  otpUserID =localStorage.getItem('userIdOTP');
  otpUserPhoneNumber =localStorage.getItem('userPhoneNumberOTP');
  signInAuth :any = localStorage.getItem('signIn');
  constructor(private authenticationService:AuthService, private router : Router) { }

  ngOnInit(): void {
    this.goAuth();
  }

  signIn() {
    this.email = this.model.email;
    this.password = this.model.password;
      this.authenticationService.SignIn(this.email, this.password);
      this.email = '';
      this.password = '';
    }
    
    goAuth(){
      debugger;
      if((this.otpUserID == '' && this.otpUserPhoneNumber == '') || (this.otpUserID == null && this.otpUserPhoneNumber == null)){
          this.router.navigate(['/phoneAuth']);
      }
      if(this.signInAuth == "true"){
        this.router.navigate(['/home']);
      }
      else{
        return;
      }
    }

}
