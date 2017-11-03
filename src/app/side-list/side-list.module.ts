import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideListComponent } from './side-list.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialsModule} from '../materials/materials.module';
import {HttpClientModule} from '@angular/common/http';
import {BlogHttpService} from '../services/blog-http/blog-http.service';
import {FlatternTagPipe} from '../components/pipes/flattern-tag.pipe';
import {BlogEditorModule} from '../components/blog-editor/blog-editor.module';

export const SideListRoute: Routes = [
  {path: 'sidelist', component: SideListComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SideListRoute),
    MaterialsModule,
    HttpClientModule,
    BlogEditorModule,
  ],
  declarations: [SideListComponent, FlatternTagPipe],
  providers: [BlogHttpService]
})
export class SideListModule { }
