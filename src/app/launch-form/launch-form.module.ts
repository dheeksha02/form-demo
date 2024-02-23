import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LaunchFormComponent } from './launch-form.component';
import { FormioModule } from '@formio/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [LaunchFormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormioModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  exports: [
    LaunchFormComponent,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTabsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    LaunchFormComponent
  ]
})

export class LaunchFormModule { }
