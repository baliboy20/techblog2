import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SnackbarService} from "./snackbar.service";
import {MatSnackBarModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
      MatSnackBarModule,
  ],
  declarations: [SnackbarService],
    exports: [SnackbarService]
})
export class SharedServicesModule { }
