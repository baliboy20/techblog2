import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import 'hammerjs';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialsModule} from './materials/materials.module';
import {RouterModule, Routes} from '@angular/router';
import {SimpleModule} from './simple/simple.module';
import {SideListModule} from './side-list/side-list.module';
import {RoutedListModule} from './routed-list/routed-list.module';
import {ZzFactoryService, ZzService} from "./services/zz.service";
import {BlogHttpService} from "./services/blog-http/blog-http.service";

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
    bootstrap: [AppComponent],
    providers:[
        BlogHttpService,
        {provide: ZzService, useFactory: ZzFactoryService,deps:[BlogHttpService]}]
})
export class AppModule {
}
