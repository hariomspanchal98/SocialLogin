import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { NavbarModule } from '../navbar/navbar.module';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllproductsComponent,
    CreateproductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NavbarModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
