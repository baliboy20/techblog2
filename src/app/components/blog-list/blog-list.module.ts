import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list.component';
import {MaterialsModule} from "../../materials/materials.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
      MaterialsModule,
      RouterModule,
  ],
  declarations: [BlogListComponent]
})
export class BlogListModule { }
