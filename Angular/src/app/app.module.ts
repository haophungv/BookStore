import { MaterialExampleModule } from './../material.module';
import { RegisterComponent } from './component/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './component/book/create/create.component';
import { UpdateComponent } from './component/book/update/update.component';
import { ListComponent } from './component/book/list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemComponent } from './component/book/item/item.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DetailsComponent } from './component/book/details/details.component';
import { CartComponent } from './component/book/cart/cart.component';
import { CartButtonComponent } from './component/cart-button/cart-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    UpdateComponent,
    ListComponent,
    ItemComponent,
    DetailsComponent,
    CartComponent,
    CartButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialExampleModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
