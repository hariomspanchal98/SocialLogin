import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { NavbarModule } from '../navbar/navbar.module';
import { DetailsComponent } from './details/details.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator'


@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    UpdateComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule

  ]
})
export class UsersModule { }