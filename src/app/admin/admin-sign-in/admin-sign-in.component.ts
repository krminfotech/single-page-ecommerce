import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.css']
})
export class AdminSignInComponent implements OnInit {
  model:any = {};
  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  signIn(){
    debugger;
    console.log('admin signin',this.model);
    if(this.model.email == "hasim@vrize.com" && this.model.password == "KasimHasim@2001"){
      localStorage.setItem('AuthStatus','true');
      localStorage.setItem('AuthEmail',this.model.email);
      localStorage.setItem('AuthPassword',this.model.password);
      this.router.navigate(['/admin']);
    }
    else{
      alert("Auth Fail");
    }
  }

}
