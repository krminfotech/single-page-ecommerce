import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { EcommerceService } from '../service/ecommerce.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  sliderData : any = [];
  products: any;
  productLength;
  cartDatas = [];
  loader: boolean = true;
  currentURL = '';
  showDelay = 1000;
  hideDelay = 2000;
  constructor(private adminService : AdminService, private route : ActivatedRoute, private ecommerceService : EcommerceService) { }

  ngOnInit(): void {
    debugger;
    this.currentURL = window.location.href;
    console.log(this.sliderData);
    this.cartDatas = this.ecommerceService.showToCard();
      this.productLength = this.cartDatas.length;
    this.GetProducts();
  }

  GetProducts() {
    // this.ecommerceService.getData().subscribe(res => {
    //    this.products = res;
    // });
    const id = this.route.snapshot.paramMap.get('id');
    console.log("ID ",id);
    this.adminService.onGetProductAll().subscribe((val:any)=>{
      debugger;
      for(let i=0;i<val.length;i++)
        {
          if(id == val[i].id){
            this.products = val;
            this.products = this.products[i];
            
            console.log("imgGallery ",this.products.imgGallery);
            this.sliderData = this.products.imgGallery;
            console.log("sliderData ",this.sliderData[0]);
            this.loader=false;
          }
        }     
       });
       
 }
 onAddToCard(val: object) {
      
  this.productLength = this.ecommerceService.addToCart(val);
  
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

}
