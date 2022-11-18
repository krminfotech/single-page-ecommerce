import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from "@angular/fire/firestore";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToasterComponent } from "../shared/toaster/toaster.component";
@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  constructor(private http: HttpClient,private db: AngularFirestore,private _snackBar: MatSnackBar) {}
  addToCartData = [];
  cartDatas = [];
  productCart : any = [];
  sendData = [];
  durationInSeconds = 5;
  productModalData = [];
  onSetProductModalData(data){
    this.productModalData = data;
  }

  getAllData(){
    return this.db.collection('ecom').snapshotChanges();
  }

  getData() {
    return this.http.get("https://run.mocky.io/v3/3093c28c-f43a-4313-916f-56c3236f6cfb");
  }

  addToCart(val: any) {
    debugger;
    this.productCart = JSON.parse(localStorage.getItem('cardData'))!= null ? JSON.parse(localStorage.getItem('cardData')) : [];
    for (var i = 0; i < this.productCart.length; i++) {
      if (val.modelName == this.productCart[i].modelName && val.id == this.productCart[i].id) {
        alert("Product already added to cart.");
        return this.productCart.length;
      }
    }
    this._snackBar.openFromComponent(ToasterComponent, {
      duration: this.durationInSeconds * 1000,
    });
    this.productCart.push(val);
    localStorage.setItem('cardData', JSON.stringify(this.productCart));
    console.log("cart Length",this.productCart.length);
    return this.productCart.length;
  }

  showToCard() {
    let cardData = [];
    if (this.productCart.length > 0) {
      cardData = this.productCart;
    } else {
      cardData = JSON.parse(localStorage.getItem('cardData'));
    }
    return this.sendData = cardData != null ? cardData : [];
  }

}

function res(res: any): import("rxjs").OperatorFunction<Object, unknown> {
  throw new Error("Function not implemented.");
}