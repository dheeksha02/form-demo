import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BuilderComponent } from './builder.component';
import { E_SignIdentityService } from '../core/service/esign-identity.service';
import { FormioModule } from '@formio/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BuilderComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormioModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BuilderComponent
  ],
  providers: [
    E_SignIdentityService
  ]
})
export class BuilderModule { }
