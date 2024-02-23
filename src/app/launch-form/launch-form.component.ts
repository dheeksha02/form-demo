import { Component, ElementRef, ViewChild, Renderer2, OnInit, EventEmitter, Output, inject } from '@angular/core';
//import BuilderUtils from '../../../../utils/builder';
import { componentProperties } from '../component-properties';
import { Router , ActivatedRoute, ActivationStart, ActivationEnd} from '@angular/router';
import { AuthService } from '../core/service/app.service';
import { Location } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { formAPIConfigs } from '@app/core/helpers/form-api-config';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrls: [
    './launch-form.component.scss'
  ]
})

export class LaunchFormComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  @Output()
  refreshForm = new EventEmitter<any>();
  public formUrl: string;
  formId;
  formSchema: any;
  public formConfig = {
    options: {
      //noDefaultSubmitButton: true,
      hooks: {
        beforeSubmit: (submission, callback) => {
          // this.authService.componentKeys.map(key => {
          //   let checkKeyVal = this.authService.submissionPayload.find(data => {
          //     if (data[key]) {
          //       return data[key]; 
          //     }
          //   });
          //   if (checkKeyVal) {
          //     submission.data[key] = checkKeyVal[key]
          //   } else {
          //     submission.data[key] = ''
          //   }
          // });
          console.log("==> submission payload", submission.data)
        //   submission.data.signature = 'data:image/png;base64,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';
        //  submission.data.witness="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";
        //   submission.data.signature = this.authService.txtSiganture;
        //   submission.data.witness = this.authService.imageSiganture;
       
          setTimeout(function() {
          
          callback(null, submission);
        }, 1000);
        }
      }
    }
  };

  dropdownMenu = [
    { label: 'Copy URL', param: 'COPY' },
    { label: 'Share URL', param: 'SHARE' },
    { label: 'Bookmark URL', param: 'BOOKMARK' }
  ];
  durationInSeconds = 5;
  // snackBarRef = inject(MatSnackBarRef);

  constructor (
    private renderer: Renderer2,
    private _formService: AuthService,
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
      // let formId;
      // this.router.events.pipe( filter(event => event instanceof ActivationEnd) ).subscribe(event => { 
      //   this.formId = event['snapshot'].params['formId'];
        
      // });
  }

  ngOnInit() {
    const params = new URLSearchParams(window.location.search)
    let formID= params.get('formId');

    this._formService.getFormJson(formID).subscribe(data => {
      this.formSchema = data['components'];
    });
  }

  onSubmit($event) {
    const params = new URLSearchParams(window.location.search)
    let responseID = params.get('responseId')
    , payload = {
      "status": "SUBMIT",
      data : $event.data
    }
    this._formService.submitForm(responseID, payload).subscribe(data => {
      console.log("form submiited")
    });
  }

  saveForm() {

  }

  onChangeDesign(event) {
    console.log(event)
    if (event.form) {
      console.log("event=?", event)
    }
  }

  downloadForm() {
    console.log('Download Form');
  }

  menuAction($event, action) {
    switch(action) {
      case 'COPY': 
        this.actionFunction(action);
        break;
      case 'SHARE':
        this.actionFunction(action);
        break;
      case 'BOOKMARK':
        this.actionFunction(action);
        break;
    }
  }

  actionFunction(action) {
    if (action === 'COPY') {
      console.log('This is copy');
      // this._snackBar.openFromComponent(LaunchFormComponent, {
      //   duration: this.durationInSeconds * 1000,
      // });
    }
    if (action === 'SHARE') {
      console.log('This is share');
    }
    if (action === 'BOOKMARK') {
      console.log('This is bookmark');
    }
  }

  // dismissSnackBar() {
  //   this.snackBarRef.dismissWithAction();
  // }

}
