import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  products : any = [];
  loadder = false;
  pageOfItems: Array<any>;
  constructor(private db: AngularFirestore, private adminService : AdminService) { }

  ngOnInit(): void {
    this.getProduct();
  }

 getProduct(){
      this.adminService.onGetProductAll().subscribe(res=>{
        this.products = res;
        this.loadder = true;
      });
  }
  
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
}

onDeleteProduct(id){
  this.db.doc('product/' + id).delete();
}

}
