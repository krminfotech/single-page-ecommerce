import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/service/ecommerce.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  sliderData : any = [];
  productModalValue = [];
  products :any;
  productLength;
  currentURL = '';
  modal = '';
  constructor(private ecommerceService : EcommerceService) { }

  ngOnInit(): void {
    
    this.currentURL = window.location.href;
    this.GetProducts();
  }


  GetProducts() {
    // this.ecommerceService.getData().subscribe(res => {
    //    this.products = res;
    // })
    console.log("Product Modal Value ",this.ecommerceService.productModalData);
    this.productModalValue.push(this.ecommerceService.productModalData);
       
    console.log("Product Modal ",this.ecommerceService.productModalData);
    this.products = this.ecommerceService.productModalData;
 }

 onAddToCard(val: object) {
  let value = {
    modelName:this.modal,
    ...val,
  }
  console.log("Cart Value modal ",value);
  this.productLength = this.ecommerceService.addToCart(value);
  this.onClose();
  // this.loader = true;
  // setTimeout(()=>{
  //    this.loader = false;
  // },1000)
}

shareWhatsapp(){
  debugger;
  let whatsappUrl = "whatsapp://send?text="+this.currentURL;
  window.open(whatsappUrl, '_blank').focus();
 }

 onClose(){
  debugger;
  this.ecommerceService.productModalData = [];
 // this.document.location.reload();
 window.location.reload();
 }

}
