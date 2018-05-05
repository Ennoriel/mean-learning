import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatIconModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule
} from '@angular/material';

const importsExports = [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatIconModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule
];

/**
 * Module used to both import and export Material modules
 * not to overload too much the app module
 */
@NgModule({
  imports: importsExports,
  exports: importsExports,
})
export class MaterialModule { }
