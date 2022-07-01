import { CartComponent } from './component/book/cart/cart.component';
import { DetailsComponent } from './component/book/details/details.component';
import { ListComponent } from './component/book/list/list.component';
import { UpdateComponent } from './component/book/update/update.component';
import { CreateComponent } from './component/book/create/create.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book-create', component: CreateComponent },
  { path: 'book-update', component: UpdateComponent },
  { path: 'book-list', component: ListComponent },
  { path: 'book-details/:id', component: DetailsComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
