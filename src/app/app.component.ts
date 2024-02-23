import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
// import { FormioResources } from '@formio/angular/resource';
import { FormioAuthService } from '@formio/angular/auth';
import { AuthService } from './core/service/app.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formType: string;
  constructor(
    //public auth: FormioAuthService,
    private router: Router,
    // public resources: FormioResources,
    public _formService: AuthService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en_US', 'de_DE']);
    translate.setDefaultLang('en_US');
    translate.use('en_US');
    let pathData = window.location.pathname.split('/');
    this.formType = pathData[1];
   
  }

  ngOnit() {
  
  }
}