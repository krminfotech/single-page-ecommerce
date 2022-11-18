import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  model : any ={
    imgArrData : []
  };
  categoryData = [];
  myImage : any;
  products = [];
  values = [];
  imgArray = [];
  imgOfData =[];
  constructor(private db : AngularFirestore, private adminService : AdminService, private router : Router) { }

  ngOnInit(): void {
    this.onGetCategory();
    this.onAuthValid();
  }

  onSubmit(data:any){
    for(let i=0;i<this.imgArray.length;i++){

      console.log("Hasim hasim()",this.imgArray[i]);
      this.imgOfData.push(this.imgArray[i]);
    }
      let val = {
        name:data.value.productName,
        category:data.value.categoryName,
        imgPath:this.myImage,
        amount : data.value.productAmount,
        originalAmount : data.value.productOriginalAmount,
        subTotal : 0,
        qty : 1,
        imgGallery : this.imgOfData
      }
      console.log(val);
      this.db.collection('product').add(val);
      data.reset();
  }

  onGetCategory(){
    this.adminService.ongetCategory().subscribe((val:any)=>
    {
      console.log(val);
      this.categoryData = val;
      console.log(this.categoryData);
    });
  }

    // image to base 64 conversion start

    onChange($event: Event) {
      const file = ($event.target as HTMLInputElement).files[0];
      this.convertToBase64(file);
    }
  
    convertToBase64(file: File) {
      const observable = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber);
      });
      observable.subscribe((base64=>{
        console.log("Base 64 Value : ",base64);
        this.myImage = base64;
      }))
    }
  
    readFile(file: File, subscriber: Subscriber<any>) {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
  
      filereader.onload = () => {
        subscriber.next(filereader.result);
        subscriber.complete();
      };
      filereader.onerror = (error) => {
        subscriber.error(error);
        subscriber.complete();
      };
    }

    onAuthValid(){
      if(this.adminService.onCheckAuth() == true){
        return;
      }
      else{
        this.router.navigate(['/admin/sign-in']);
      }
     }

     removevalue(i){
      this.values.splice(i,1);
    }
  
    addvalue(){
      let  data = [];
      this.values.push(this.model.imgArrData);
     
     this.imgArray =this.model.imgArrData;
    }
  

}
