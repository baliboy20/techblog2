import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutedListComponent} from './routed-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialsModule} from "../materials/materials.module";
import {BlogListComponent} from "../components/blog-list/blog-list.component";
import {BlogListModule} from "../components/blog-list/blog-list.module";
import {BlogEditorComponent} from "../components/blog-editor/blog-editor.component";
import {BlogEditorModule} from "../components/blog-editor/blog-editor.module";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {BlogHttpService} from "../services/blog-http/blog-http.service";

const routedRoute: Routes = [
    {path: 'routedlist', component: RoutedListComponent,
        children :[
            {path:'editor', component: BlogEditorComponent},
            {path:'list', component:BlogListComponent },
            {path:'', redirectTo: 'list', pathMatch: 'full'}
        ]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routedRoute),
        MaterialsModule,
        BlogListModule,
        BlogEditorModule,
        HttpClientModule,
    ],
    declarations: [RoutedListComponent],
    providers: [BlogHttpService],
})
export class RoutedListModule {
}
