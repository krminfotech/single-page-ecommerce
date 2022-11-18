import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({ 
   providedIn : 'root'
})
export class AdminService{
    authEmail;
    authPassword;
    authStatus;
    constructor(private http: HttpClient, private db : AngularFirestore, private router : Router) { }

    getData() {
        return this.db.collection('orderDetails')
            .snapshotChanges()
            .pipe(map(docArr => {
                return docArr.map((doc: any) => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
    }
    onAddCategory(category){
        debugger;
        this.db.collection('category').add({
            category
        });
    }

    ongetCategory() {
        return this.db.collection('category')
            .snapshotChanges()
            .pipe(map(docArr => {
                return docArr.map((doc: any) => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data().category.categoryName,
                        //...doc.payload.doc.data()
                    };
                });
            }))
    }

    onGetProductAll() {
        return this.db.collection('product')
            .snapshotChanges()
            .pipe(map(docArr => {
                return docArr.map((doc: any) => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }))
    }

    onCheckAuth(){
        
    this.authEmail = localStorage.getItem('AuthEmail');
    this.authPassword = localStorage.getItem('AuthPassword');
    this.authStatus = localStorage.getItem('AuthStatus');
        debugger;
        if(this.authEmail == "hasim@vrize.com" && this.authPassword == "KasimHasim@2001" && this.authStatus == "true" ){
            return true;       
          }
          else{
            alert("You Need to Login");
            return false;
          }
    }
}