import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerceService } from "../../service/EcommerceService";
import { CartService } from '../cart.service';
@Component({
   selector: 'app-check-out',
   templateUrl: './check-out.component.html',
   styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
   total: number = 0;
   cartData: any = [];
   alertMsg = false;
   productLength: any;
   signedUserEmail = localStorage.getItem('signInUserEmail');
   signedUserPhoneNumber = localStorage.getItem('userPhoneNumberOTP');
   model: any = {
      name: '',
      lastName: '',
      userName: '',
      email: this.signedUserEmail,
      phoneNumber: this.signedUserPhoneNumber,
      address: '',
      address2: '',
      country: '',
      state: '',
      zip: ''
   }
   cartDataTotalCount: number = 0;
   TotalAllDetails: any = [];
   last: any = [];

   url : any=[];
   whatsappUrl : any;
   productDetails : string = "Product Details";

   contactDetails:any= [];

   constructor(private cartService: CartService, private ecommerceService: EcommerceService, private router : Router) { }
   ngOnInit() {
      this.cartData = this.cartService.checkOutCartData;
     //this.cartData = JSON.parse(localStorage.getItem('cardData'));
      this.onTotal();
      this.cartDataCount();
      console.log("let data val",this.cartData);
      if(this.cartData.length ==0){
       
         this.router.navigate(['/cart']);
      }
      else{
       this.cartData = this.cartService.checkOutCartData; 
      }
   }

   userNameValidate(userName){
         this.model.userName = userName.replaceAll(" ", "");
   }

   onTotal() {
      let totalAmout = 0;
      for (let i = 0; i < this.cartData.length; i++) {
         totalAmout += this.cartData[i].subTotal;
      }
      this.total = totalAmout;
      this.cartDataTotalCount = this.cartData.length;
      
   }

   onClose() {
      this.alertMsg = false;
   }

   onSubmit(formData: NgForm) { 
      console.log("Check Out Data ",formData.value);
      if (this.cartData.length == 0) {
         formData.reset();
         this.alertMsg = true;
      }

      else {


         
      // whatsapp send data

         console.log("hasim now data",this.cartData);
         for(let i=0;i<this.cartData.length;i++){
         this.url.push( 
         "---------------------------" + "%0a"
         + "Id: " + this.cartData[i].id + "%0a"
         + "Name: " + this.cartData[i].name + "%0a"
         + "Quantity: " + this.cartData[i].qty  + "%0a"
         + "Amount: " + this.cartData[i].amount + "%0a"); 
         }

         // contact form details start

         let name =(formData.value.name)+(formData.value.lastName);
         let email = formData.value.email;
         let address = formData.value.address
         this.contactDetails.push(
            "Contact Details" + "%0a"+
            "---------------------------" + "%0a"
            + "Email Id: " + email + "%0a"
            + "Name: " + name + "%0a"
            + "Quantity: " + address  + "%0a"
         ); 
         
         // contact from details end

         this.whatsappUrl = "https://wa.me/916383356162?text="+this.productDetails+ "%0a"+this.url+"%0a%0a%0a%0a"+this.contactDetails;
         window.open(this.whatsappUrl, '_blank').focus();

         this.router.navigate(['/thank-you']);
         //localStorage.clear();
            localStorage.removeItem('TotalAllDetails');
            localStorage.removeItem('cardData');
      // whatsapp send data end


               this.alertMsg = false;
               this.TotalAllDetails.push(formData.value, this.cartData, this.total)
               // this.last =this.TotalAllDetails;
               // console.log(this.last);
               debugger;
               let customerValue = {
                  
                  'formData': formData.value,
                  'cartData': this.cartData,
                  'total': this.total
               }
               this.last.push(customerValue);

               localStorage.setItem('TotalAllDetails', JSON.stringify(this.last));
               this.checkOutSubmit(this.last);
            // localStorage.clear();
               //this.TotalAllDetails = [];
               //this.last = [];
               this.cartData = [];
               this.cartDataTotalCount = 0;
               // this.cartService.checkOutCartData = [];
               //   this.ecommerceService.cartDatas = [];
               //   this.ecommerceService.addToCartData = [];
               this.ecommerceService.productCart = [];
               this.total = 0;
               formData.reset();
            }

            this.productLength = 0;
            console.log(formData.value);          
   }

   cartDataCount() {
      this.ecommerceService.cartDatas = this.ecommerceService.showToCard();
      this.productLength = this.ecommerceService.cartDatas.length;      
   }


   checkOutSubmit(val: any) {
      this.cartService.sendData(val);
   }
}
