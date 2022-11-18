import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdminService } from '../admin/admin.service';
import { EcommerceService } from '../service/ecommerce.service';

@Component({
   selector: 'app-product-page',
   templateUrl: './product-page.component.html',
   styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
   panelOpenState = false;
   category : any = [];
   products: any = [];
   product: any = [];
   productList : any = [];
   successAlert = false;
   loader = true;
   data :any ;
   productLength: any;
   cartDatas = [];
   loaderFinal : any;
   pageOfItems: Array<any>;
   otpUserID =localStorage.getItem('userIdOTP');
   otpUserPhoneNumber =localStorage.getItem('userPhoneNumberOTP');
   signIn :any = localStorage.getItem('signIn');
   productModal = false;
   constructor(private ecommerceService: EcommerceService,private db: AngularFirestore, private adminService : AdminService, private router : Router) { }

   ngOnInit() {
      this.GetCategory();
      this.GetProducts();
      this.cartData();
      this.allData();
      let dataAll = this.db.collection('orderDetails')
      .snapshotChanges()
      .pipe(map(docArr => {
         return docArr.map((doc:any)=>{
            return{
               id:doc.payload.doc.id,
               ...doc.payload.doc.data()
            };
         });
      }))
      // .map((docArr:any) =>{
      //    return docArr.map((doc:any)=>{
      //       return doc.payload.doc.data();
      //    })
      // })
     
      .subscribe(res=>{
         // for(let d of res){
         //    console.log(d.payload.doc.data());
         // }
         console.log(res);
      })
      console.log("Ecom Hasim Data ",dataAll);
      this.goAuth();
   }

   onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }

   onDeleteRecord(){
      let id = 'OmzNWuT6DEiQlSbaJH1u';
      this.db.doc('orderDetails/'+id).delete();
      alert("Deleted Successfully !...");
   }

   allData(){
      this.ecommerceService.getAllData().subscribe(data => {
         let hasim = data.map((e:any) => {
           return {
             id: e.payload.doc.id,
             ...e.payload.doc.data()
           };
         })
         console.log("hasim ",hasim);
       });
   }

   cartData() {
      this.cartDatas = this.ecommerceService.showToCard();
      this.productLength = this.cartDatas.length;
   }

   GetCategory() {
      this.adminService.ongetCategory().subscribe((val:any)=>{
         this.category = val;
         this.loader = false;
           console.log("Product All ",val);
         });
      
   }

   onBasedOnCategory(category:any){
      debugger;
      this.product = [];
         for(let i=0;i<this.productList.length;i++){
            if(category ==this.productList[i].category){
               this.product.push(this.productList[i]);
            }
         }
      this.products = this.product;
      
   }

   GetProducts() {
      // this.ecommerceService.getData().subscribe(res => {
      //    this.products = res;
      // });
      this.adminService.onGetProductAll().subscribe((val:any)=>{
         this.products = val;
         this.productList = val
         this.loader = false;
           console.log("Product All ",val);
         });
      
   }

   onAddToCard(val: object) {
      
      this.successAlert = true;
      this.productLength = this.ecommerceService.addToCart(val);
      
      // this.loader = true;
      // setTimeout(()=>{
      //    this.loader = false;
      // },1000)
   }

   showProductCard() {
      this.ecommerceService.showToCard();
   }

   falseAlert(){
      this.successAlert = false;
   }

   onAllProduct(){
      this.GetProducts();
   }
   goAuth(){
      debugger;
      if((this.otpUserID == '' && this.otpUserPhoneNumber == '') || (this.otpUserID == null && this.otpUserPhoneNumber == null)){
          this.router.navigate(['/phoneAuth']);
      }
      if(this.signIn == "true"){
        this.router.navigate(['products']);
      }
      else{
        return;
      }
    }

    onAddViewProduct(product){
         console.log("onAddViewProduct" , product);
         this.router.navigate(['/product-view/',product.id])
    }

    onAddToCardModal(val){
      debugger;
      console.log("Value ",val);
      this.ecommerceService.onSetProductModalData(val);
      this.productModal = true;
    }


}