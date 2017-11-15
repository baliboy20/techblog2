import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AniComponent } from './ani.component';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialsModule} from "../materials/materials.module";

export const aniRoute: Routes = [
    {path:'ani', component: AniComponent}
]
@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(aniRoute),
      MaterialsModule,
      ],
  declarations: [AniComponent],

})
export class AniModule { }
