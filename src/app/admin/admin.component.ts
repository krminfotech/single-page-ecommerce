import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector : 'app-admin',
  templateUrl : './admin.component.html',
  styleUrls : ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  constructor( private adminService : AdminService,private db : AngularFirestore, private router : Router ){}
  checkOutDataDetails = [];
  cartDataFinal = [];
  datashow = [];
  loadder = false;
   ngOnInit(){
     this.checkOutData();
     this.onAuthValid();
   }

   onUpdateDelivery(id:string){
     this.db.doc('orderDetails/'+id).update(
       {
         delivery : true
       }
     )
   }

   checkOutData(){
       this.adminService.getData()
       .subscribe(res=>{
         console.log("Old data ",res);
         this.checkOutDataDetails = res;
         
         // assedening order data start
         this.checkOutDataDetails = res.sort(
           (objA, objB) => <any>new Date(objA.orderDate) - <any>new Date(objB.orderDate),
         );
         // assedening order data end
         // desending order data start
         this.checkOutDataDetails = res.sort(
           (objA, objB) => <any>new Date(objB.orderDate) - <any>new Date(objA.orderDate),
         );
         // desending order data end
         console.log("checkOutDataDetails ",this.checkOutDataDetails);
         this.loadder = true;
       })
   }

   onAuthValid(){
    if(this.adminService.onCheckAuth() == true){
      return;
    }
    else{
      this.router.navigate(['/admin/sign-in']);
    }
   }


}