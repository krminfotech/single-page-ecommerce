import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input('productLength') productLength: any;
  cartDatas = [];
  cartLenght: any;
  category = [];
  signedUserEmail = localStorage.getItem('signInUserEmail');
  logOut = false;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('cardData'));
    this.cartLenght = data.length;
    this.GetCategory();
  }

  ngOnChanges() {
    console.log('productLength', this.productLength);
  }

  onLogOut() {
    this.logOut = true;
  }

  GetCategory() {
    this.adminService.ongetCategory().subscribe((val: any) => {
      this.category = val;
    });

  }

}
