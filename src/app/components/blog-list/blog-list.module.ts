import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list.component';
import {MaterialsModule} from "../../materials/materials.module";

@NgModule({
  imports: [
    CommonModule,
      MaterialsModule,
  ],
  declarations: [BlogListComponent]
})
export class BlogListModule { }
