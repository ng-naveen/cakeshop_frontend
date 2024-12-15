import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CakelistComponent } from './cakelist/cakelist.component';
import { CakedetailComponent } from './cakedetail/cakedetail.component';
import { OrderComponent } from './order/order.component';
import { CartlistComponent } from './cartlist/cartlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';

const routes: Routes = [
  {path: 'register', component: RegistrationComponent},
  {path: 'cake-list', component: CakelistComponent},
  {path: 'cake-view/:id', component: CakedetailComponent},
  {path: 'cake/order/:id', component: OrderComponent},
  {path: 'cart-list', component: CartlistComponent},
  {path: 'order-list', component: OrderlistComponent},
  {path: '', component: LoginComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
