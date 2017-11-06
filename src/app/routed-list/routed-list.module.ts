import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutedListComponent} from './routed-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialsModule} from "../materials/materials.module";
import {BlogListComponent} from "../components/blog-list/blog-list.component";
import {BlogListModule} from "../components/blog-list/blog-list.module";
import {BlogEditorComponentV1} from "../components/blog-editor-v1/blog-editor.v1.component";
import {BlogEditorModule} from "../components/blog-editor-v1/blog-editor.v1.module";
import {BlogFromIdService} from "../components/resolvers/blog-from-id.service";
import {ZzService} from "../services/zz.service";

const routedRoute: Routes = [
    {
        path: 'routedlist', component: RoutedListComponent,
        children: [
            {path: 'editor/:id', component: BlogEditorComponentV1, resolve:{blogItem: BlogFromIdService} },
            {path: 'list', component: BlogListComponent},
            {path: '', redirectTo: 'list', pathMatch: 'full'}
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routedRoute),
        MaterialsModule,
        BlogListModule,
        BlogEditorModule,
    ],
    declarations: [RoutedListComponent],
    providers: [BlogFromIdService]
})
export class RoutedListModule {
}
//j;lj;;jk