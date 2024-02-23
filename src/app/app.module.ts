import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppConfig } from './config';
import { FormioAppConfig } from '@formio/angular';
import { FormioResources } from '@formio/angular/resource';
import { FormioAuthService, FormioAuthConfig } from '@formio/angular/auth';
import { BuilderComponent } from '@app/builder/builder.component';
import { CustomSignatureComponent } from '@app/custom-signature/custom-signature.component';
import { registerCustomSignatureComponent } from '@app/custom-signature/custom-signature.formio';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormioModule } from '@formio/angular';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { FormsModule } from '@angular/forms';
import { BuilderModule } from '@app/builder/builder.module';
import { HeaderComponent } from '@app/header/header.component';
import { LaunchFormModule } from '@app/launch-form/launch-form.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptor } from '@app/core/helpers/addHeaderInterceptor';
import { LaunchFormComponent } from '@app/launch-form/launch-form.component';
import { SignerBlockPopupComponent } from '@app/signer-block-popup/signer-block-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule,TranslateLoader  } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatLineModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CustomSignatureComponent,
    SignerBlockPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgbModule,
    FormioModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    HttpClientModule,
    SignaturePadModule,
    FormsModule,
    BuilderModule,
    LaunchFormModule,
    MatSelectModule,
    MatCheckboxModule,
    MatLineModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true},
    // {provide: FormioAppConfig, useValue: AppConfig},
    //FormioResources,
    //FormioAuthService,
    // {provide: FormioAuthConfig, useValue: {
    //   login: {
    //     form: 'user/login'
    //   },
    //   register: {
    //     form: 'user/register'
    //   }
    // }}
  ],
  entryComponents: [LaunchFormComponent, CustomSignatureComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(injector: Injector) {
    registerCustomSignatureComponent(injector);
  }
}
