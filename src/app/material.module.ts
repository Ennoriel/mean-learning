import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule
} from '@angular/material';

const importsExports = [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule
];

@NgModule({
  imports: importsExports,
  exports: importsExports,
})
export class MaterialModule { }
