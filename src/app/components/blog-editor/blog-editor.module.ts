import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogEditorComponent} from './blog-editor.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule,
    MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MaterialsModule} from '../../materials/materials.module';
import {MarkdownModule} from 'angular2-markdown';
import {ObserversModule} from '@angular/cdk/observers';


@NgModule({
    imports: [
        CommonModule,

        MaterialsModule,
        BrowserAnimationsModule,
        FormsModule,
        MarkdownModule.forRoot(),
        ObserversModule,
    ],
    declarations: [BlogEditorComponent],
    exports: [BlogEditorComponent],
    providers: []



})
export class BlogEditorModule {
}
