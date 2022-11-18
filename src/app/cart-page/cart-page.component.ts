import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EcommerceService } from "../service/ecommerce.service";

import { CartService } from './cart.service';

@Component({
   selector: 'app-card-page',
   templateUrl: './cart-page.component.html',
   styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
   constructor(private ecommerceService: EcommerceService, private cartService : CartService, private router : Router) { }
   cartDatas = [];
   total: number = 0;
   subTotalAns: number = 0;
   alertMsg = false;
   productLength: any;
   
   ngOnInit() {
      this.showData();
      this.subTotal();
   }
   showData() {
      this.cartDatas = this.ecommerceService.showToCard();
      this.productLength = this.cartDatas.length;
   }

   removeCartData(val : any) {
      for (let i = 0; i < this.cartDatas.length; i++) {
         if (this.cartDatas[i].name == val) {
            console.log(this.total = this.total - this.cartDatas[i].subTotal);
            this.cartDatas.splice(i, 1);
            localStorage.setItem('cardData', JSON.stringify(this.cartDatas));
         }
      }
      this.productLength = this.cartDatas.length;
   }

   subTotal() {
      for (let i = 0; i < this.cartDatas.length; i++) {
         if(this.cartDatas[i].qty == 1){
         this.cartDatas[i].subTotal = 1 * this.cartDatas[i].amount;
         }
         this.cartDatas[i].subTotal = this.cartDatas[i].qty* this.cartDatas[i].amount;
         this.total += this.cartDatas[i].subTotal;
      }
   }

   onQty(value: number, id: number) {
      let totalAmout = 0;
      for (let i = 0; i < this.cartDatas.length; i++) {
         if (this.cartDatas[i].id == id) {
            this.cartDatas[i].qty = value;
            this.cartDatas[i].subTotal = value * this.cartDatas[i].amount;
         } 
         localStorage.setItem('cardData', JSON.stringify(this.cartDatas));
         totalAmout += this.cartDatas[i].subTotal;
         
      this.cartDatas = JSON.parse(localStorage.getItem('cardData'));
      }
      this.total = totalAmout;
   }

   
   onClearCart(){
      if(this.cartDatas.length == 0){
        // alert("Already Cart Empty!");
        this.alertMsg = true;
      }
      else{
         this.alertMsg = false;
         this.cartDatas = [];
         this.ecommerceService.productCart = [];
         this.subTotalAns = 0;
         this.total = 0;
         localStorage.removeItem("cardData");
      }
      this.productLength = this.cartDatas.length;
   }

   onContinueToShopping(){
      this.router.navigate(['./products']);
   }

   checkOut(){
      if(this.cartDatas.length == 0){
         this.alertMsg = true;
      }
      else{
     // console.log(this.cartDatas);
     this.alertMsg = false;
      // this.cartService.onCardData(this.cartDatas);
      this.router.navigate(['/check-out']);
      console.log("Cart Service Data",this.cartService.checkOutCartData = this.cartDatas);
      }
   }


}

function value(value: any) {
   throw new Error("Function not implemented.");
}

