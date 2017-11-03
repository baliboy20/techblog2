import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleComponent} from './simple.component';
import {MaterialsModule} from '../materials/materials.module';
import {RouterModule, Routes} from '@angular/router';
import {BlogEditorModule} from '../components/blog-editor/blog-editor.module';
import {BlogEditorComponent} from '../components/blog-editor/blog-editor.component';

export const SimpleRoutes: Routes =
  [
    {path: 'simple', component: SimpleComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    RouterModule.forChild(SimpleRoutes),
    BlogEditorModule
  ],
  declarations: [
    SimpleComponent,

  ]
})
export class SimpleModule {
}
