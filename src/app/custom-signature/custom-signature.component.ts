import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { AuthService } from "@app/core/service/app.service";
import { FormioCustomComponent } from "angular-formio";
import { DomSanitizer } from "@angular/platform-browser";
import _ from 'lodash';
import { TitleStrategy } from "@angular/router";

@Component({
  selector: "custom-signature",
  templateUrl: "./custom-signature.component.html",
  styleUrls: ["./custom-signature.component.scss"],
})
export class CustomSignatureComponent implements FormioCustomComponent<any> {
  componentKey: Array<any> = [];
  pathName: any;
  esignatureBlock: boolean = false;
  fieldData = { fieldType: 'signature' };
  @ViewChild('canvas',{static:true}) canvas:ElementRef
  private _value: any = {};
  @Input()
  public set value(val: any) {
    if (!val) {
      return;
    }
    this._value = val;
  }

  @Output()
  valueChange = new EventEmitter<any>();

  @Input()
  disabled: boolean;
  signatureTypeTxt: string;
  signatureTypeImg;
  signatureTypeFile: any;
  tabIndex: number = 0;
  signatureValue;
  fontName: string;

  constructor(
    public authService: AuthService
  ) {
    this.pathName = window.location.pathname.split('/');
  }

  uploadFileInput(file: FileList) {
    const fileReader = new FileReader();
    let imageFile, srcData;
    if (file['tab']) {
      imageFile = file['event'].item(0);
      fileReader.onload = (event: any) => {
        this.signatureTypeFile = event.target.result;
        this.tabIndex = file['tab'];
        this.renderImage();
        srcData = fileReader.result;
      };
    } else {
      imageFile = file.item(0);
      fileReader.onload = (event: any) => {
        this.signatureTypeFile = event.target.result;
        srcData = fileReader.result;
      };
    }
    fileReader.readAsDataURL(imageFile);
  }

  showImage(data) {
    this.signatureTypeImg = data;
  }

  closeSignaturePop() {
    this.esignatureBlock = false;
  }

  openDialog(dialog) {
    if (this.pathName[1] === 'form') {
      this.resetDialog();
      dialog.showModal();
    }
  }

  resetDialog() {
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, 308, 150);
    this.signatureTypeFile = '';
    this.signatureTypeImg = '';
    this.signatureTypeTxt = '';
  }

  openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }

  closeDialog(dialog) {
    this.renderImage();
    dialog.close();
  }

  ngAfterContentInit() {
    if (this.pathName[1] !== 'form') {
      this.renderImage(this.authService.submissionData);
    }
  }

  onTabChange(event) {
    this.tabIndex = event.index;
  }

  signatureAdded(event) {
    console.log("=>signature", event);
  }

  async renderImage(submissionData?) {
    if (submissionData) {
      this.authService.componentKeys.forEach(data => {
          let canvas = <HTMLCanvasElement> document.querySelector(`toggle-signature[id*="${data}"] canvas`)
          , ctx = canvas?.getContext('2d');
          this.authService.getCanvasImg(ctx,submissionData[data]);
        });
    } else if (this.pathName[1] !== 'editForm') {
      let ctx = this.canvas.nativeElement.getContext('2d')
      , customComponentKey =  (this.canvas.nativeElement.parentNode.id).split("-").pop()

      if (this.tabIndex === 0) {
        const fontStyle = `normal 12px ${this.fontName}`;
        ctx.font = fontStyle;
        ctx.fillText(this.signatureTypeTxt, 10, 10); 
        ctx.font = fontStyle
        ctx.fillText(this.signatureTypeTxt, 10, 10);
        ctx.canvas.toDataURL();
        this.signatureValue = ctx.canvas.toDataURL()
      } else if (this.tabIndex === 1) {
       console.log(this.signatureTypeImg)
        this.signatureValue = this.signatureTypeImg
        this.authService.drawImageScaled(this.signatureTypeImg, ctx);
      } else {
        this.signatureValue = this.signatureTypeFile
        this.authService.getCanvasImg(ctx, this.signatureTypeFile);
      }
      this.canvas.nativeElement.style.backgroundColor = '#FFFFFF'
      let isKeyPresent = this.authService.submissionPayload.some(obj => obj.hasOwnProperty([customComponentKey])); 
      if (!isKeyPresent) {
        this.authService.componentKeys = [...this.authService.componentKeys, customComponentKey];
        this.authService.submissionPayload = [...this.authService.submissionPayload, {[customComponentKey]: this.signatureValue}];
      } else {
        this.authService.submissionPayload.filter((data) => {
          if (data.hasOwnProperty([customComponentKey])) {
           data[customComponentKey] = this.signatureValue
          }
        });
      }
    }
  }

  resetCanvas() {
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, 308, 150);
  }

  updateSignatureField(event) {
    this.resetCanvas();
    if (event['tabIndex'] === 3 ) {
      const fileReader = new FileReader()
      , imageFile = event['event'].item(0)
      fileReader.onload = (event: any) => {
        this.signatureTypeFile = event.target.result;
        this.tabIndex = event['tab'];
        this.renderImage();
      };
      fileReader.readAsDataURL(imageFile);
    } else if (event['tabIndex'] === 2) {
      this.signatureTypeImg = event['event'];
      this.tabIndex = 1;
      this.renderImage();
    } else if (event['tabIndex'] === 0) {
      this.fontName = event['fontStyle']
      this.signatureTypeTxt = event['event'];
      this.tabIndex = 0;
      this.renderImage();
    }
  }
}
