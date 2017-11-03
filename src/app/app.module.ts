import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import 'hammerjs';
import {AppComponent} from './app.component';
// import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import {
//     MatButtonModule,
//     MatCardModule, MatChipsModule, MatExpansionModule, MatIconModule,
//     MatInputModule,
//     MatSnackBarModule, MatTooltipModule
// } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MyHttpInterceptorService} from './services/my-http-interceptor.service';
import {BlogEditorModule} from './components/blog-editor/blog-editor.module';
import {MaterialsModule} from './materials/materials.module';
import {RouterModule, Routes} from '@angular/router';
import {SimpleModule} from './simple/simple.module';
import {SideListModule} from './side-list/side-list.module';
import {BlogHttpService} from './services/blog-http/blog-http.service';
import {RoutedListModule} from "./routed-list/routed-list.module";

export const MainRoutes: Routes = [];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        MaterialsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(MainRoutes),
        SimpleModule,
        SideListModule,
        RoutedListModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
