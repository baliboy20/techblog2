import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButton,
  MatButtonModule, MatButtonToggleModule, MatCard,
  MatCardModule, MatCheckboxModule, MatChip, MatChipInput,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatExpansionPanel, MatGridListModule,
  MatIcon, MatIconModule,
  MatInput,
  MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatSelectModule, MatSidenavModule, MatSnackBar,
  MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltip,
  MatTooltipModule,

} from '@angular/material';
import {SnackbarService} from "./shared-services/snackbar.service";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    // MatRadioModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    // MatPaginatorModule,
    MatSelectModule,


  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    // MatRadioModule,
    // MatSelectModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    // MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    // MatPaginatorModule,
    MatExpansionModule,
    MatSelectModule,
  ],

})





export class MaterialsModule { }
