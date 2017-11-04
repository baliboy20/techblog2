import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogEditorComponentV1} from './blog-editor.v1.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialsModule} from '../../materials/materials.module';
import {MarkdownModule} from 'angular2-markdown';
import {ObserversModule} from '@angular/cdk/observers';
import {BlogHttpService} from "../../services/blog-http/blog-http.service";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        MaterialsModule,
        BrowserAnimationsModule,
        FormsModule,
        MarkdownModule.forRoot(),
        ObserversModule,
        RouterModule,
    ],
    declarations: [BlogEditorComponentV1],
    exports: [BlogEditorComponentV1],
    providers: [BlogHttpService],

})
export class BlogEditorModule {
}
