import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formAPIConfigs } from '@app/core/helpers/form-api-config';

@Injectable({
    providedIn: 'root'
  })

export class AuthService {
  public formId: string;
  public dragYPosition: any;
  public dragXPosition: any;
  public submissionData: any;
  public formSchema: any;
  public componentKeys: Array<string> = [];
  public txtSiganture;
  public imageSiganture;
  public esignaturePanel: boolean = false;
  public submissionPayload = [];

  constructor(private http: HttpClient) { }

  createForm(formValue) {
    let url = formAPIConfigs.createForm
    , headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    return this.http.post(url, formValue,  {'headers' : headers});
  }

  getFormJson(pathName) {
    let url = formAPIConfigs.launchForm + pathName
    return this.http.get(url)
  }

  drawImageScaled(img1, ctx) {
    let img = new Image();
    img.width = 40
    img.height = 40
    img.onload = function() {
      ctx?.drawImage(img, 0, 0, img.width,img.height);
    }
    img.src = img1;   
  }

  getCanvasImg(ctx, imageSrc) {
    let img = new Image();
    img.onload = function() {
      ctx?.drawImage(img, 0, 0, img.width, img.height);
    }
    img.src = imageSrc;
  }

  submitForm(responseId, formValue) {
    let url = formAPIConfigs.submitForm;
    url = url.replace('{{responseId}}', responseId);
    return this.http.post(url, formValue);
  }
}
