import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

import { WindowService } from '../window.service';

export class PhoneNumber {
  country: any = 91;
  number!: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.number
    return `+${num}`
  }

}


@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.component.html',
  styleUrls: ['./phone-auth.component.css']
})
export class PhoneAuthComponent implements OnInit {

  otpUserID =localStorage.getItem('userIdOTP');
  otpUserPhoneNumber =localStorage.getItem('userPhoneNumberOTP');
  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode!: string;

  user: any;

  constructor(private win: WindowService, private router : Router) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render();
    this.goAuth();
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;
    
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( (result:any) => {
                    debugger;
                    this.user = result.user;
                    console.log("Result ",result);
                    console.log("User ",this.user);
                    localStorage.setItem('userIdOTP',this.user.uid);
                    localStorage.setItem('userPhoneNumberOTP',this.user.phoneNumber);
                    this.router.navigate(['/sign-up']);
    })
    .catch( (error:any) => console.log(error, "Incorrect code entered?"));
  }

  goAuth(){
    debugger;
    if((this.otpUserID == '' && this.otpUserPhoneNumber == '') || (this.otpUserID == null && this.otpUserPhoneNumber == null)){
        this.router.navigate(['/phoneAuth']);
    }
    else{
      this.router.navigate(['/sign-in']);
    }
  }

}
