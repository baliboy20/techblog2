import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import 'hammerjs';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialsModule} from './materials/materials.module';
import {RouterModule, Routes} from '@angular/router';
import {SimpleModule} from './simple/simple.module';
// import {SideListModule} from './side-list/side-list.module';
import {RoutedListModule} from './routed-list/routed-list.module';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {AmsService} from "./services/ams.service";
import { NgTemplateOutletExample} from './tempate-example/ng-template-example';
import {AniModule} from "./ani/ani.module";


export const MainRoutes: Routes = [];

@NgModule({
    declarations: [
        AppComponent, NgTemplateOutletExample,
    ],
    imports: [
        BrowserModule,
        MaterialsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(MainRoutes),
        SimpleModule,
        RoutedListModule,
        AniModule,
        AngularFontAwesomeModule,
    ],
    bootstrap: [AppComponent],
    providers: [AmsService]
})
export class AppModule {
}
