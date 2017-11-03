import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutedListComponent} from './routed-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialsModule} from "../materials/materials.module";
import {BlogListComponent} from "../components/blog-list/blog-list.component";
import {BlogListModule} from "../components/blog-list/blog-list.module";
import {BlogEditorComponent} from "../components/blog-editor/blog-editor.component";
import {BlogEditorModule} from "../components/blog-editor/blog-editor.module";

const routedRoute: Routes = [
    {path: 'routedlist', component: BlogListComponent,
        children :[
            {path:'list', component: RoutedListComponent},
            {path:'editor', component: BlogEditorComponent},
        ]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routedRoute),
        MaterialsModule,
        BlogListModule,
        BlogEditorModule,
    ],
    declarations: [RoutedListComponent]
})
export class RoutedListModule {
}
