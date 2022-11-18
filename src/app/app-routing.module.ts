import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';
import { AdminComponent } from './admin/admin.component';
import { ViewProductComponent } from './admin/view-product/view-product.component';
import { PhoneAuthComponent } from './auth/phone-auth/phone-auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './cart-page/check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ThankYouComponent } from './thank-you/thank-you.component';


const routes: Routes = [
  {path : '', redirectTo : 'home',pathMatch :"full"},
  {path : 'phoneAuth', component : PhoneAuthComponent},
  {path : 'products', component : ProductPageComponent},
  {path : 'product-view/:id', component : ProductViewComponent},
  {path : 'cart', component : CartPageComponent},
  {path : 'check-out', component : CheckOutComponent},
  {path : 'thank-you', component : ThankYouComponent},
  
  {path : 'home', component : HomeComponent},

  {path : 'admin',
    children : [
      { path: "", component: AdminComponent },
      { path : 'sign-in',component: AdminSignInComponent },
      { path : 'add-product',component: AddProductComponent },
      { path : 'view-product',component: ViewProductComponent }
    ]
  },
  { path : 'sign-in',component : SignInComponent },
  { path : 'sign-up',component : SignUpComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
