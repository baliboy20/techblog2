import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogListComponent, ConfirmDeleteDialog} from './blog-list.component';
import {MaterialsModule} from "../../materials/materials.module";
import {RouterModule} from "@angular/router";
import {SnackbarService} from "../../materials/shared-services/snackbar.service";

@NgModule({
    imports: [
        CommonModule,
        MaterialsModule,
        RouterModule,
    ],
    declarations: [BlogListComponent, ConfirmDeleteDialog],
    entryComponents: [ConfirmDeleteDialog],
    providers: [SnackbarService]
})
export class BlogListModule {
}
