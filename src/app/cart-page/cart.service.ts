import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import moment from "moment";
@Injectable({
   providedIn: 'root'
})
export class CartService{
   checkOutCartData: any = [];


   creationDateAndTime = '';
   orderDate = '';
   constructor(private http: HttpClient,private db: AngularFirestore) { 
      debugger;
      this.creationDateAndTime = moment(new Date()).format('DD-MM-YYYY hh:mm a');
      this.orderDate = moment(new Date()).format('YYYY-MM-DD');
   }

   ngOnInit(): void {
     
   }
   sendData(resData: any) {
      debugger;
      let data = resData;
      console.log("Mooditu poda ",data[0]);
      this.http.post("https://khan-shopping-test-db-default-rtdb.firebaseio.com/allData.json", {
         delivery : false,
         orderDateTime : this.creationDateAndTime,
         orderDate : this.orderDate,
         email : data[0].formData.email,
         phoneNumber : data[0].formData.phoneNumber,
         ...data[0]
      }).subscribe(Data => {
         console.log(Data);
      });
      let final = data.map(
         val=>{
           let hasom =  val.cartData;
           return hasom
         }
      )
      console.log(final);
      debugger;
      this.db.collection('orderDetails').add({
         delivery : false,
         orderDateTime : this.creationDateAndTime,
         orderDate : this.orderDate,
         ...data[0]
      });
   }

   onCardData(){
      let data =  JSON.parse(localStorage.getItem('cardData'))
      return this.checkOutCartData =data;
      // console.log("Card Data on Check Data",this.checkOutCartData);
   }

}