import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { NavbarModule } from '../navbar/navbar.module';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ReactiveFormsModule } from '@angular/forms';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';


@NgModule({
  declarations: [
    AllproductsComponent,
    CreateproductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NavbarModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    MdbCarouselModule
  ]
})
export class ProductsModule { }