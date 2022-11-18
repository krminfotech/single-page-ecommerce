import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  constructor(private http: HttpClient) { }
  addToCartData = [];
  cartDatas = [];
  productCart: any = [];
  sendData = [];

  getData() {
    return this.http.get("https://run.mocky.io/v3/3093c28c-f43a-4313-916f-56c3236f6cfb");
  }

  addToCart(val: any) {
    this.productCart = JSON.parse(localStorage.getItem('cardData')) != null ? JSON.parse(localStorage.getItem('cardData')) : [];
    for (var i = 0; i < this.productCart.length; i++) {
      if (val.id == this.productCart[i].id) {
        alert("Product already added to cart.");
        return this.productCart.length;
      }
    }
    this.productCart.push(val);
    localStorage.setItem('cardData', JSON.stringify(this.productCart));
    console.log("cart Length", this.productCart.length);
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
