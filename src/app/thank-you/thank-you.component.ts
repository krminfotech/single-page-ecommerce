import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  otpUserID =localStorage.getItem('userIdOTP');
  otpUserPhoneNumber =localStorage.getItem('userPhoneNumberOTP');
  signIn :any = localStorage.getItem('signIn');
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.goAuth();
  }

  
  goAuth(){
    debugger;
    if((this.otpUserID == '' && this.otpUserPhoneNumber == '') || (this.otpUserID == null && this.otpUserPhoneNumber == null)){
        this.router.navigate(['/phoneAuth']);
    }
    if(this.signIn == "true"){
      this.router.navigate(['/products']);
    }
    else{
      this.router.navigate(['/sign-in']);
    }
  }

}
