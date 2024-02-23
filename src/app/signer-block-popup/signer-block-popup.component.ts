// import { APIClientService, StorageService } from '@dewdrops/common/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { finalize, map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  HostListener,
  TemplateRef
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// import { zignAPIConfigs } from '@zign-app/zign-api.config';
import { ceil, cloneDeep, isEmpty, isNull, upperCase } from 'lodash';
import { Observable } from 'rxjs';
import { map as rxjsmap } from 'rxjs/operators';
import { AuthService } from '@app/core/service/app.service';
import {
  blobToBase64String
} from 'blob-util';
// import { ZignUserService } from '@zign-app/services/user.service';
// import { StorageEnum } from '@zign-app/_models/Storage.enum';
// import { IApplyToAllField } from '@zign-app/feature/signer-module/signer-interface';
//  import { E_SignIdentityService } from '../../app/service/esign-identity.service';
 //import { E_SignIdentityService } from '@app/service/esign-identity.service';
// import { ErrorService } from '@zign-app/services/error.service';
// import { DigitalService } from '@zign-app/shared/digital-signature/digital-signature-service';

@Component({
  selector: 'zign-signer-block-popup',
  templateUrl: './signer-block-popup.component.html',
  styleUrls: ['./signer-block-popup.component.scss'],
})

export class SignerBlockPopupComponent implements OnInit {
  @Input() fieldData: any;
  deviceHeight: number;
  deviceOrientation: number;
  selectedOption ='1';

  // @ViewChild('classificationWiz') classificationWiz;

  // @ViewChild('typeCheckBox', { static: true }) typeCheckBox: ElementRef;

  @Input() isCreateNewSignature = false;
  public drawTabCanvasWidth;
  // @Input() savedSignatureArr = [];
    esignatureBlock = true;
  // @Input() esignatureBlock = false;
  // // @Input() applyToAllField: IApplyToAllField;
   isApplyToAllField: boolean = false;
  // @Input() droppedElements: Array<object>;

  device = { height: window.innerHeight, width: window.innerWidth };

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event?) {
    // if (this.userService.isMobileDevice()) {
      this.deviceOrientation = event?.target.screen.orientation.angle;
      this.deviceHeight = this.deviceOrientation === 90 || this.deviceOrientation === 270 ? this.device.width : this.device.height;
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateDrawCanvasWidth();
    if (
      this.signatureBlock.controls?.draw?.value?.signtaure?.length > 0 &&
      this.signatureBlock.controls?.draw?.value?.signtaure !== 'data:,' &&
      this.signatureBlock.controls?.draw?.value?.signtaure !==
      this.blankDrawBlob
    ) {
      const canvas = this.el.nativeElement.getElementsByTagName('canvas')[1];
      //canvas.width = this.drawTabCanvasWidth;
      canvas.height = 137;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        const y = (canvas.height - image.height) / 2;
        ctx.drawImage(image, 0, y);
      };
      image.src = this.signatureBlock.controls?.draw?.value?.signtaure;
    }
  }

  freshJourney = false;

  enterNameErrorType = false;
  enterNameErrorDraw = false;
  enterNameErrorupload = false;

  // @Input() set fieldDatas(val) {
  //    //this.fieldData = cloneDeep(val);
  //   // if (this.fieldData.fieldType === 'DIGITAL_SIGNATURE' && this.fieldData?.digiObj?.imgSelectedObj) {
  //   //   for (const key in this.fieldData?.digiObj?.imgSelectedObj) {
  //   //     this.fieldData[key] = this.fieldData?.digiObj?.imgSelectedObj[key];
  //   //   }
  //   // }
  //   // this.editFlag = this.isCreateNewSignature
  //   //   ? true
  //   //   : this.fieldData.fieldType === 'SIGNATURE_BLOCK'
  //   //     ? this.fieldData.Other.filter((x) => x.id === 'SIGNATURE')[0]
  //   //       .saveSignature
  //   //     : this.fieldData.fieldType === 'DIGITAL_SIGNATURE' ?
  //   //       this.fieldData?.digiObj?.imgSelectedObj?.saveSignature || false : this.fieldData.saveSignature;
  //   // if (this.editFlag) {
  //   //   this.editFlag = true;
  //   //   this.currentEditedSignatureId = this.fieldData.value;
  //   //   this.editTab = this.getTabID();
  //   //   this.fieldData.tabId = this.editTab;
  //   // }
  //   //this.checkDataChange();
  // }

  // @Input() documentDetails: object; /** contains recipient and envelope Id */

  // @Output() selectedSigntureInfo: EventEmitter<any> = new EventEmitter<any>();

  // @Output() savedImagesDelete: EventEmitter<any> = new EventEmitter<any>();

  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() esignatureData: EventEmitter<any> = new EventEmitter<any>();
  // /** field data  */
  // public fieldData: any;

  // /** saved Signature Array of Object */
   public savedSignature = [];

  // /** common Id set */
  private idSet: any;

  /**  Signature Image to upload */
  public uploadImage: any;
  public drawSignature: any = null;
  public signtureImage: any = '';

  // /** save Images Edit */
  // public editTab = '';
  public editFlag = false;
  public currentEditedSignatureId = '';
  public typeFocusInFlag = false;

  /** Signature Canvas clear */
  isClearedCanvas = false;

  // /** Default Font */

  fontDefaultText = 'MST_DANCING_SCRIPT';
  userName = this._translate.instant('MST_YOUR_SIGNATURE');
  fullName = "";
  fontStyleValue = 'Dancing Script';
  public fontSelectBox = new FormControl();
  public fontStyle = [
    {
      id: 'MST_ALLURA',
      value: 'Allura',
      label: this._translate.instant('MST_ALLURA')
    },
    {
      id: 'MST_ARIAL',
      value: 'Arial',
      label: this._translate.instant('MST_ARIAL')
    },
    {
      id:'MST_CAVEAT',
      value: 'Caveat',
      label: this._translate.instant('MST_CAVEAT')
    },
    {
      id:'MST_COURIER_NEW',
      value: 'Courier New',
      label: this._translate.instant('MST_COURIER_NEW')
    },
    {
      id: 'MST_DANCING_SCRIPT',
      value: 'Dancing Script',
      label: this._translate.instant('MST_DANCING_SCRIPT')
    },
    {
      id: 'MST_GEORGIA',
      value: 'Georgia',
      label: this._translate.instant('MST_GEORGIA')
    },
    {
      id: 'MST_SANS_SERIF',
      value: 'sans-serif',
      label: this._translate.instant('MST_SANS_SERIF')
    },
    {
      id: 'MST_TANGERINE',
      value: 'Tangerine',
      label: this._translate.instant('MST_TANGERINE')
    },
    {
      id: 'MST_TIMES_NEW_ROMAN',
      value: 'Times New Roman',
      label: this._translate.instant('MST_TIMES_NEW_ROMAN')
    },
    {
      id: 'MST_VERDANA',
      value: 'verdana',
      label: this._translate.instant('MST_VERDANA')
    },
  ];

  // /** signatureEvent Emitter */
  // public signOPObj = {
  //   imageURL: '',
  //   imageBase64: '',
  //   value: '',
  //   tabId: '',
  //   fontStyle: '',
  //   fontText: '',
  //   type: '',
  //   saveSignature: false,
  //   default: false,
  //   fileName: '',
  // };

  // /** Journey Flag  */
  public journeyFlag = 'SIGNATURE'; // 'INITIAL' / 'SIGNATURE' / 'STAMP'

  // /** Fixed value Data  */
  // public savedImagesObj;
   public activeTabId = 0;
   public signatureBlockUploadIcon: string | SafeUrl =
     '/assets/images/upload.svg';

  // /** Form for SignatureBlock */
    public signatureBlock: FormGroup;

  // /** signature block current tab Data */
   public currentTab: any;

  // /** Disable add Btn */
   public disableAddBtn = true;

  // /** first Time load Component */
  public firstTimeLoad = true;
  public firstTimeEmptyCanvasData = '';

  // /** Logged in user */
  // public loggedInUser: object;

  // /** Hide Default checkbox and title field */
  public showDefaultType = false;
  public showDefaultDraw = false;
  public showDefaultUpload = false;

  // /** Hide Default checkbox and title field */
  public duplicateNmTypeErr = false;
  public duplicateNmDrawErr = false;
  public duplicateNmUploadErr = false;

  // /** Blank Blow  */
   private blankDrawBlob: Blob;

  acceptedFileTypes = '.jpg, .jpeg, .gif, .bmp, .png';
  unsupportedFileExtension = false;
  unsupportedFileSizeErrMSG = false;
  dimensionErr = false;

  //public drawTabCanvasWidth;

  public NameFieldLabel: string;
  public headerLabel: string;
  public defaultLabel: string;
  public saveCheckBoxLabel: string;
  applyToAll = new FormGroup({
    applySignatureToAllField: new FormControl(),
    applyInitialToAllField: new FormControl(),
    applyStampToAllField: new FormControl()
  });

  // applyAllFieldEnableFlag: boolean = false;
  // deleteSavedSignFlag: boolean = false;
  // storeDeleteObjectTemp = { index: null, signatureObj: null };
  isModalOpen = false;
  signatureData: string;
  dialogRef;
  @ViewChild('signerBlockPopup', { static: true }) signerBlockPopup: TemplateRef<any>;
  constructor(
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private sanitizer: DomSanitizer,
    
    //public apiClient: APIClientService,
    //private http: HttpClient,
    // public userService: ZignUserService,
    private _authService: AuthService,
    // private _storage: StorageService,
     private _translate: TranslateService,
    // private _eSignIdentity: E_SignIdentityService,
    // private errorService: ErrorService,
    // private digitalService: DigitalService
     public dialog: MatDialog
  ) { }

  openWidgetEditorDialog() {
    // dialogRef.afterOpened().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.role = "dialog";
    // dialogConfig.width = "460px";
    // dialogConfig.minHeight = "100px";
    // dialogConfig.maxHeight = "86vh";
    // dialogConfig.position = { top: "7vh" };
    // dialogConfig.autoFocus = false;
  }

  openDialogWithoutRef() {
    this.dialogRef = this.dialog.open(this.signerBlockPopup);
  }

  test(event, item) {

 // this.fontDefaultText = item.value;

  }

  ngOnInit(): void {
    this.openWidgetEditorDialog();
    this.setLabels();
    this.setSignatureForm();
    this.checkDataChange();
    this.openDialogWithoutRef();

    this.setDefaultValues();
    this.preloadImage('/assets/images/loading-320x180.svg');
    this.updateDrawCanvasWidth();
    this.isApplyToAllField = false;
    // if (this.applyToAllField) {
    //   this.isApplyToAllField = true;
    //   this.applyToAll.controls.applySignatureToAllField.setValue(this.applyToAllField?.applySignatureToAllField);
    //   this.applyToAll.controls.applyInitialToAllField.setValue(this.applyToAllField?.applyInitialToAllField);
    //   this.applyToAll.controls.applyStampToAllField.setValue(this.applyToAllField?.applyStampToAllField);
    // } else {
    //   this.isApplyToAllField = false;
    // }
    // this.applyAllFieldEnableFlag = JSON.parse(sessionStorage.getItem('signatureAndInitialToggle')) || JSON.parse(sessionStorage.getItem('recipientConsentDetails'))?.signatureAndInitialToggle;
  }

  preloadImage(src) {
    let img = new Image();
    img.src = src;
  }

  updateDrawCanvasWidth() {
    const winWidth = window.innerWidth;
    this.drawTabCanvasWidth = winWidth < 1200 ? winWidth - 32 : 465;
  }

  checkDataChange() {
    // this.setSignatureForm();
     this.setDefaultData();
    //this.setLabels();

    // this.setSavedImages();
    // this.setDefaultValues();
     this.setActiveTab();
    if (!this.isCreateNewSignature) {
      this.savedSignature.map((sign, index) => {
        this.setSavedArray(sign.title, sign.isChecked, index, sign.id);
      });
    }
  }

  // getTabID() {
  //   if (this.fieldData.tabId) {
  //     return this.fieldData.tabId;
  //   } else {
  //     switch (this.fieldData.type) {
  //       case 'FONT':
  //         return 'tab2';
  //       case 'DRAW':
  //         return 'tab3';
  //       case 'IMAGE' || 'UPLOAD':
  //         return 'tab4';
  //     }
  //   }
  // }

   setDefaultData() {
    this.duplicateNmTypeErr = false;
    this.duplicateNmDrawErr = false;
    this.duplicateNmUploadErr = false;
    this.disableAddBtn = false;
    this.showDefaultType = false;
    this.showDefaultDraw = false;
    this.showDefaultUpload = false;
    this.savedSignature = [];
    this.signatureBlockUploadIcon =
      '/assets/images/upload.svg';
      this.signatureBlock?.reset();
    this.signatureBlock.controls['type'].get('fontStyle').setValue('Dancing Script');
   }

  setLabels() {
    if (
      this.fieldData.fieldType === 'INITIALS' ||
      this.fieldData.signType === 'INITIALS'
    ) {
      this.journeyFlag = 'INITIAL';
      this.NameFieldLabel = 'MST_NAME_THE_INITIALS';
      this.headerLabel = 'MST_ADD_INITALS';
      this.defaultLabel = 'MST_MAKE_THIS_AS_MY_DEFAULT_INITIALS';
      this.saveCheckBoxLabel = 'MST_SAVE_INITIALS';
      if (this.isCreateNewSignature) {
        this.NameFieldLabel = 'MST_INITIALS_NAME';
      }
    } else if (
      this.fieldData.fieldType === 'STAMP' ||
      this.fieldData.signType === 'STAMP'
    ) {
      this.journeyFlag = 'STAMP';
      this.headerLabel = 'MST_ADD_STAMP';
      this.defaultLabel = 'MST_MAKE_THIS_AS_MY_DEFAULT_STAMP';
      this.NameFieldLabel = 'MST_NAME_THE_STAMP';
      this.saveCheckBoxLabel = 'MST_SAVE_STAMP';
      if (this.isCreateNewSignature) {
        this.NameFieldLabel = 'MST_STAMP_NAME';
      }
    } else {
      this.journeyFlag = 'SIGNATURE';
      this.headerLabel = 'MST_ADD_ESIGNATURE';
      this.defaultLabel = 'MST_MAKE_THIS_AS_MY_DEFAULT_SIGNATURE';
      this.NameFieldLabel = 'MST_NAME_THE_SIGNATURE';
      this.saveCheckBoxLabel = 'MST_SAVE_SIGNATURE';
      if (this.isCreateNewSignature) {
        this.NameFieldLabel = 'MST_SIGNATURE_NAME';
      }
    }
  }

  // setSavedImages() {
  //   this.idSet = this.savedSignatureArr;
  //   this.idSet.map((sign, index) => {
  //     const temp = {
  //       title: sign.name,
  //       img: '/assets/images/loading-320x180.svg',
  //       id: sign.id || sign.value,
  //       edit: false,
  //       isChecked: sign.default,
  //       originalImg: false
  //     };
  //     for (const data in sign) {
  //       if (data) {
  //         temp[data] = sign[data];
  //       }
  //     }
  //     if (sign.type === 'FONT') {
  //       const selectedFontStyle = this.fontStyle.filter(
  //         (x) => x.id === temp['font'] || x.value === temp['font']
  //       );
  //       temp['cssFontStyle'] = sign['font'];
  //       if (selectedFontStyle.length > 0) {
  //         temp['cssFontStyle'] = selectedFontStyle[0]['value'];
  //       }
  //     }
  //     this.savedSignature.push(temp);
  //   });
  //   this.savedSignature = this.savedSignature?.sort((x, y) => {
  //     return x.default === y.default ? 0 : x.default ? -1 : 1;
  //   });
  //   this.activeTabId = this.savedSignature.length
  //     ? 'tab1'
  //     : this.journeyFlag !== 'STAMP'
  //       ? 'tab2'
  //       : 'tab4';
  //   this.savedSignature.map((sign, index) => {
  //     // this._eSignIdentity.get_eSignIdentity(this.journeyFlag, sign.id).subscribe((data) => {
  //     //   const urlCreator = window.URL;
  //     //   const imageURL = this.sanitizer.bypassSecurityTrustUrl(
  //     //     urlCreator.createObjectURL(data)
  //     //   );
  //     //   this.savedSignature[index]['img'] = imageURL;
  //     //   this.savedSignature[index]['originalImg'] = true;
  //     //   this.validateNEnableAddBtn();
  //     // });
  //   });
  // }

  setSignatureForm() {
    this.signatureBlock = this.formBuilder.group({
      savedSignature: new FormArray([]),
      type: new FormGroup({
        fontStyle: new FormControl(),
        signatureName: new FormControl(),
        saveSignature: new FormControl(false),
      }),
      draw: new FormGroup({
        signtaure: new FormControl(),
        saveSignature: new FormControl(false),
      }),
      upload: new FormGroup({
        uploadSignature: new FormControl(),
        saveSignature: new FormControl(false),
      }),
    });

    
    if (this.isCreateNewSignature) {
      (this.signatureBlock.get('type') as FormGroup).removeControl(
        'saveSignature'
      );
      (this.signatureBlock.get('draw') as FormGroup).removeControl(
        'saveSignature'
      );
      (this.signatureBlock.get('upload') as FormGroup).removeControl(
        'saveSignature'
      );
      this.signatureBlock.removeControl('savedSignature');
    }
    if (this.journeyFlag === 'STAMP') {
      this.signatureBlock.removeControl('type');
      this.signatureBlock.removeControl('draw');
    }
  }

  setDefaultValues() {
    const signName = upperCase(this.journeyFlag);
    if ((this.isCreateNewSignature || this.editFlag)) {
      const fieldName =
        this.fieldData.fieldType === 'SIGNATURE_BLOCK'
          ? this.fieldData.Other.filter((x) => x.id === 'SIGNATURE')[0].name ||
          ''
          : this.fieldData?.name || '';
      const defaultFlag =
        this.fieldData.fieldType === 'SIGNATURE_BLOCK'
          ? this.fieldData.Other.filter((x) => x.id === 'SIGNATURE')[0]
            .default || false
          : this.fieldData?.default || false;
      this.currentEditedSignatureId =
        this.fieldData.fieldType === 'SIGNATURE_BLOCK'
          ? this.fieldData.Other.filter((x) => x.id === 'SIGNATURE')[0].value ||
          ''
          : this.fieldData?.value || '';
      if (this.editFlag || this.fieldData.fieldId === "DIGITAL_SIGNATURE") {
        this.showDefaultDraw = true;
        this.showDefaultType = true;
        this.showDefaultUpload = true;
        if (!this.isCreateNewSignature) {
          this.signatureBlock.controls.type['controls'].saveSignature.setValue(
            true
          );
          this.signatureBlock.controls.draw['controls'].saveSignature.setValue(
            true
          );
          this.signatureBlock.controls.upload[
            'controls'
          ].saveSignature.setValue(true);
        }
      }
      this.freshJourney =
        fieldName === '' && this.isCreateNewSignature ? true : false;
      this.addDefaultFormControl(
        this.signatureBlock.controls.type,
        defaultFlag,
        fieldName === ''
          ? this.checkSignatureNameInUse(
            signName
          )
          : fieldName
      );
      this.addDefaultFormControl(
        this.signatureBlock.controls.draw,
        defaultFlag,
        fieldName === ''
          ? this.checkSignatureNameInUse(
            signName
          )
          : fieldName
      );
      this.addDefaultFormControl(
        this.signatureBlock.controls.upload,
        defaultFlag,
        fieldName === ''
          ? this.checkSignatureNameInUse(
            signName
          )
          : fieldName
      );
    }
  }

  setActiveTab() {
    const setTab = () => {
      if (this.fieldData.fieldId === 'SIGNATURE_BLOCK') {
        const temp = this.fieldData.Other.filter((x) => x.id === 'SIGNATURE');
        return !temp[0]['tabId'] ? this.activeTabId : temp[0]['tabId'];
      } else {
        // return !this.fieldData['tabId']
        //   ? this.activeTabId
        //   : this.fieldData['tabId'];
        return (this.fieldData.fieldId === 'DIGITAL_SIGNATURE' && this.fieldData?.digiObj?.imgSelectedObj) ?
          this.fieldData.digiObj.imgSelectedObj['tabId'] :
          this.fieldData['tabId'] ?
            this.fieldData['tabId'] :
            this.activeTabId;
      }
    };
    this.activeTabId = setTab();
    if (this.fieldData?.saveSignature) {
      this.currentTab = isEmpty(this.currentTab)
        ? { id: this.activeTabId }
        : this.currentTab;
    }
  }
  AfterViewInitCall() {
    let fieldData = this.fieldData;
    if (this.fieldData.fieldId === 'SIGNATURE_BLOCK') {
      const temp = this.fieldData.Other.filter((x) => x.id === 'SIGNATURE');
      if (temp.length) {
        fieldData = temp[0];
      }
    }
    if (this.fieldData?.saveSignature) {
      let fieldName =
        this.fieldData.fieldType === 'SIGNATURE_BLOCK'
          ? this.fieldData.Other.filter((x) => x.id === 'SIGNATURE')[0].name ||
          ''
          : this.fieldData?.name || '';
      const defaultFlag =
        this.fieldData.fieldType === 'SIGNATURE_BLOCK'
          ? this.fieldData.Other.filter((x) => x.id === 'SIGNATURE')[0]
            .default || false
          : this.fieldData?.default || false;
      const signName = upperCase(this.journeyFlag);
      switch (this.currentTab.id) {
        case 0 :
          // this.disableAddBtn = this.atleastOneSavedImageSelected(
          //   this.signatureBlock.controls.savedSignature.value
          // );
          break;
        case 1 :
          {
            if (fieldName === '') {
              fieldName = this.checkSignatureNameInUse(
                signName
              );
            }
            this.addDefaultFormControl(
              this.signatureBlock.controls.type,
              defaultFlag,
              fieldName
            );
            this.showDefaultType = true;
            if (!this.isCreateNewSignature) {
              this.signatureBlock.controls.type[
                'controls'
              ].saveSignature.setValue(true);
            }
          }
          break;
        case 3:
          {
            if (fieldName === '') {
              fieldName = this.checkSignatureNameInUse(
                signName
              );
            }
            this.addDefaultFormControl(
              this.signatureBlock.controls.draw,
              defaultFlag,
              fieldName
            );
            this.showDefaultDraw = true;
            if (!this.isCreateNewSignature) {
              this.signatureBlock.controls.draw[
                'controls'
              ].saveSignature.setValue(true);
            }
          }
          break;
        case 4:
          {
            if (fieldName === '') {
              fieldName = this.checkSignatureNameInUse(
                signName
              );
            }
            this.addDefaultFormControl(
              this.signatureBlock.controls.upload,
              defaultFlag,
              fieldName
            );
            this.showDefaultUpload = true;
            if (!this.isCreateNewSignature) {
              this.signatureBlock.controls.upload[
                'controls'
              ].saveSignature.setValue(true);
            }
          }
          break;
      }
    }
    if (this.activeTabId === 1) {
      document.getElementById("signTextArea").focus();
      this.fontStyleValue = fieldData.font || this.fontStyleValue;
      this.signatureBlock.controls.type.patchValue({
        fontStyle: fieldData.font,
        signatureName: fieldData['signatureText'],
        saveSignature: this.showDefaultType,
      });
      this.checkTypeData();
      if (fieldData['signatureText'] && fieldData['signatureText'].trim()) {
        this.disableAddBtn = false;
      }
    } else if (this.activeTabId === 2) {
      this.updateDrawCanvasWidth();
      const canvas = this.el.nativeElement.getElementsByTagName('canvas')[1];
      canvas.width = this.drawTabCanvasWidth;
      canvas.height = 137;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        const y = (canvas.height - image.height) / 2;
        ctx.drawImage(image, 0, y);
      };
      let tempImage = fieldData['imageURL'];
      this.disableAddBtn = true;
      if (fieldData['imageURL']) {
        this.signtureImage = '';
        this.disableAddBtn = false;
      }
      if (this.fieldData.fieldType === 'DIGITAL_SIGNATURE') {
        tempImage = fieldData['imageURL'];
      }
      image.src = tempImage;
      this.signatureBlock.controls.draw.patchValue({
        saveSignature: this.showDefaultDraw,
        signtaure: tempImage,
      });
    } else if (this.activeTabId === 3) {
      this.signatureBlock.controls.upload['controls'].uploadSignature.setValue(
        fieldData['imageURL']
      );
      this.signatureBlockUploadIcon = fieldData['imageURL'] ? fieldData['imageURL'] : '/assets/images/Signer&Sequencing/upload.svg';
    }
  }
  ngAfterViewInit() {
    this.onOrientationChange();
    this.AfterViewInitCall();
    this.validateNEnableAddBtn();
  }

  // editElement(currentEleDetails: any) {
  //   this.editFlag = true;
  //   this.currentEditedSignatureId = currentEleDetails.id;
  //   if (currentEleDetails.type === 'FONT') {
  //     this.editTab = 'tab2';
  //     const tab =
  //       this.classificationWiz.tabWrapperElement.nativeElement.children[1];
  //     tab.click();
  //     this.disableAddBtn = false;
  //     // this.activeTabId = 'tab2';
  //     this.fontStyleValue = currentEleDetails.font;
  //     this.showDefaultType = true;
  //     this.addDefaultFormControl(this.signatureBlock.controls.type);
  //     this.signatureBlock.controls.type.patchValue({
  //       fontStyle: currentEleDetails.font,
  //       signatureName: currentEleDetails.signatureText,
  //       saveSignature: true,
  //       title: currentEleDetails.name,
  //       defaultCheck: currentEleDetails.isChecked,
  //     });
  //   } else if (currentEleDetails.type === 'DRAW') {
  //     this.signatureBlock.controls.draw.patchValue({
  //       saveSignature: true,
  //       signtaure: '',
  //       title: '',
  //       defaultCheck: false,
  //     });
  //     this.editTab = 'tab3';
  //     const tab =
  //       this.classificationWiz.tabWrapperElement.nativeElement.children[2];
  //     tab.click();
  //     this.disableAddBtn = false;
  //     // this.activeTabId = 'tab3';
  //     this.addDefaultFormControl(this.signatureBlock.controls.draw);
  //     // this.updateDrawCanvasWidth();
  //     const canvas = this.el.nativeElement.getElementsByTagName('canvas')[1];
  //     canvas.width = this.drawTabCanvasWidth;
  //     canvas.height = 137;
  //     const ctx = canvas.getContext('2d');
  //     const image = new Image();
  //     image.onload = () => {
  //       const y = (canvas.height - image.height) / 2;
  //       ctx.drawImage(image, 0, y);
  //     };
  //     this.showDefaultDraw = true;
  //     image.src =
  //       currentEleDetails.img['changingThisBreaksApplicationSecurity'];
  //     this.signatureBlock.controls.draw.patchValue({
  //       saveSignature: true,
  //       signtaure:
  //         currentEleDetails.img['changingThisBreaksApplicationSecurity'],
  //       title: currentEleDetails.name,
  //       defaultCheck: currentEleDetails.isChecked,
  //     });
  //   } else if (
  //     currentEleDetails.type === 'IMAGE' ||
  //     currentEleDetails.type === 'UPLOAD'
  //   ) {
  //     this.editTab = 'tab4';
  //     const tab = this.fieldData.fieldType === 'STAMP' ?
  //       this.classificationWiz.tabWrapperElement.nativeElement.children[1] :
  //       this.classificationWiz.tabWrapperElement.nativeElement.children[3]
  //     tab.click();
  //     this.disableAddBtn = false;
  //     // this.activeTabId = 'tab4';
  //     this.addDefaultFormControl(this.signatureBlock.controls.upload);
  //     this.signatureBlockUploadIcon = currentEleDetails.img;
  //     this.signatureBlock.controls.upload.patchValue({
  //       defaultCheck: currentEleDetails.isChecked,
  //       saveSignature: true,
  //       title: currentEleDetails.name,
  //       uploadSignature: currentEleDetails.img,
  //     });
  //     this.showDefaultUpload = true;
  //   }
  //   this.setAllTabsNameNInitial(currentEleDetails);
  //   this.validateNEnableAddBtn();
  // }

  // setAllTabsNameNInitial(currentEleDetails) {
  //   this.addDefaultFormControl(
  //     this.signatureBlock.controls.type,
  //     currentEleDetails.isChecked,
  //     currentEleDetails.name
  //   );
  //   this.addDefaultFormControl(
  //     this.signatureBlock.controls.draw,
  //     currentEleDetails.isChecked,
  //     currentEleDetails.name
  //   );
  //   this.addDefaultFormControl(
  //     this.signatureBlock.controls.upload,
  //     currentEleDetails.isChecked,
  //     currentEleDetails.name
  //   );
  //   this.signatureBlock.controls.type['controls'].saveSignature.setValue(true);
  //   this.signatureBlock.controls.draw['controls'].saveSignature.setValue(true);
  //   this.signatureBlock.controls.upload['controls'].saveSignature.setValue(
  //     true
  //   );
  //   this.showDefaultType = true;
  //   this.showDefaultDraw = true;
  //   this.showDefaultUpload = true;
  // }

  // /** Tab 2 Type */
  // setSignatureTitle(evt, index: number) {
  //   this.savedSignature[index].edit = false;
  //   if (evt.target.value !== '') {
  //     this.savedSignature[index].title = evt.target.value;
  //   }
  // }

  editSignatureTitle(evt, index: number, signatureDetails) {
    alert("hiii")
    //this.editElement(signatureDetails);
  }

  // /** Form Related Functions  */
  // /** get Form Array */
  get savedSignatureArray() {
    return this.signatureBlock.get('savedSignature') as FormArray;
  }

  // /** push form group with value */
  setSavedArray(title, isChecked, index, Id) {
    title = title ? title : 'Signature ' + (index + 1);
    this.savedSignatureArray.push(
      new FormGroup({
        title: new FormControl(title),
        selectedImage: new FormControl(isChecked, Validators.required),
        id: new FormControl(Id),
      })
    );
  }

   tabChange(evt) {
    this.currentTab = evt;
    this.activeTabId = evt.index;
    this.updateDrawCanvasWidth();
    //const canvasArray = document.querySelectorAll('canvas');
    const targetDiv = document.getElementById("signaturePad");
   
    if (targetDiv) {
      const canvasArray = targetDiv.querySelector('canvas')
      , signaturePadClearBtn = targetDiv.querySelector('button');
      signaturePadClearBtn.style.backgroundColor = "#cccbcb";
      signaturePadClearBtn.style.position = "absolute";
      signaturePadClearBtn.style.right = "10px";
      signaturePadClearBtn.style.top = "10px";
      canvasArray.width = this.drawTabCanvasWidth;
      canvasArray.height = 137;
    }
    
    // if(canvasArray?.length > 0){
    //   canvasArray[0].width = canvasArray[1].width = this.drawTabCanvasWidth;
    //   canvasArray[1].height = 137;
    // }
    this.disableAddBtn = true;
    if (evt.id === 'tab3') {
      const canvas = this.el.nativeElement.getElementsByTagName('canvas')[1];
      if (
        this.signatureBlock.controls.draw['controls'].signtaure.value !=
        'data:,' &&
        this.signatureBlock.controls.draw['controls'].signtaure.value !=
        this.blankDrawBlob
      ) {
        this.disableAddBtn = false;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.onload = () => {
          const y = (canvas.height - image.height) / 2;
          ctx.drawImage(image, 0, y);
        };
        image.src =
          this.signatureBlock.controls.draw['controls'].signtaure.value || '';
      }
      this.activeTabId = evt.id;
      this.validateNEnableAddBtn();
    } else if (evt.id === 'tab1') {
      // this.disableAddBtn = this.atleastOneSavedImageSelected(
      //   this.signatureBlock.controls.savedSignature.value
      // );
    } else if (evt.id === 'tab2') {
      this.checkTypeData();
      this.validateNEnableAddBtn();
    } else if (evt.id === 'tab4') {
      this.validateNEnableAddBtn();
    }
   }

  // alertClosed() {
  //   this.deleteSavedSignFlag = false;
  //   this.storeDeleteObjectTemp.index = null;
  //   this.storeDeleteObjectTemp.signatureObj = null;
  // }

  // yesSelected() {
  //   this.deleteSignature(this.storeDeleteObjectTemp.index, this.storeDeleteObjectTemp.signatureObj);
  //   this.deleteSavedSignFlag = false;
  // }

  // deleteSignatureAPIcall(evt, index, signatureObj) {
  //   if (this.savedSignature[index].id === signatureObj['id']) {
  //     if (signatureObj.digitalLinked) {
  //       this.deleteSavedSignFlag = true;
  //       this.storeDeleteObjectTemp.index = index;
  //       this.storeDeleteObjectTemp.signatureObj = signatureObj;
  //     }
  //     else {
  //       this.deleteSignature(index, signatureObj);
  //     }
  //   }
  // }

  // deleteSignature(index, signatureObj) {
  //   //this.userService.setloader(true);
  //   // this._eSignIdentity.delete_eSignIdentity(this.journeyFlag, signatureObj['id']).subscribe((response: any) => {
  //   //   // if (response.statusCode === 200) {
  //   //   this.savedSignature.splice(index, 1);
  //   //   if (this.applyToAllField.appliedInitialId === signatureObj['id']) {
  //   //     this.applyToAllField.applyInitialToAllField = false;
  //   //     this.applyToAll.controls.applyInitialToAllField.setValue(false);
  //   //   }
  //   //   else if (this.applyToAllField.appliedSignatureId === signatureObj['id']) {
  //   //     this.applyToAllField.applySignatureToAllField = false;
  //   //     this.applyToAll.controls.applySignatureToAllField.setValue(false);
  //   //   } else if (this.applyToAllField.appliedStampId === signatureObj['id']) {
  //   //     this.applyToAllField.applyStampToAllField = false;
  //   //     this.applyToAll.controls.applyStampToAllField.setValue(false);
  //   //   }
  //   //   this.savedSignatureArray.removeAt(index);
  //   //   this.disableAddBtn =
  //   //     this.savedSignature.length > 0 &&
  //   //       this.savedSignature.filter((x) => x.isChecked).length > 0
  //   //       ? false
  //   //       : true;
  //   //   this.savedImagesDelete.emit(signatureObj['id']);
  //   //   if (this.isCreateNewSignature) {
  //   //     this.esignatureBlock = false;
  //   //     this.closeEvent.emit();
  //   //   }
  //   //   this.validateNEnableAddBtn();
  //   //   this.userService.setloader(false);
  //   //   if (this.idSet.findIndex((x) => x.id === signatureObj['id']) > -1) {
  //   //     this.idSet.splice(this.idSet.findIndex((x) => x.id === signatureObj['id']), 1);
  //   //   }
  //   //   if (this.fieldData.value === signatureObj['id']) {
  //   //     this.fieldData.name = '';
  //   //   }
  //   //   // }
  //   // });
  // }

  // onSavedSignSelect(evt, index) {
  //   this.savedSignature[index].isChecked = evt.isChecked;
  //   this.savedSignatureArray.value.map((ele, i) => {
  //     this.savedSignatureArray.at(i).patchValue({
  //       title: ele.title,
  //       selectedImage: index === i ? evt.isChecked : false,
  //     });
  //   });
  //   this.disableAddBtn = this.atleastOneSavedImageSelected(
  //     this.signatureBlock.controls.savedSignature.value
  //   );
  //   const data = this.savedSignature.filter((sign) => sign.isChecked);
  //   this.savedImagesObj = data[0];
  // }

  // /** Disable add BTN */
  atleastOneSavedImageSelected(signatureArr: []) {
    // let imgData = signatureArr.filter((sign) => sign['selectedImage']) || [];
    // let orgImgCheck = false;
    // if (imgData.length > 0 && imgData[0].selectedImage) {
    //   const imgArrCheck = this.savedSignature.filter(x => imgData[0].id === x.id);
    //   orgImgCheck = imgArrCheck[0].originalImg;
    // }
    // return imgData.length > 0 && orgImgCheck
    //   ? false
    //   : true;
  }

  // /** Tab 3 file Upload store Details */
  fileSelected(event, uploadType) {
    this.unsupportedFileExtension = false;
    this.unsupportedFileSizeErrMSG = false;
    this.dimensionErr = false;
    // event.allFiles.forEach((item) => {
      const fileData: File = event.item(0);
      let name = event.item(0).name.split('.');
      name = '.' + name[name.length - 1];
      const tempName = this.acceptedFileTypes.indexOf(name.toLowerCase());
      if (tempName === -1) {
        this.unsupportedFileExtension = true;
        this.disableAddBtn = true;
        return;
      }
      const image = new Image();
      image.src = URL.createObjectURL(fileData);
      image.onload = (e) => {
        const img = e.target as HTMLImageElement;
        if (uploadType !== 'STAMP' &&
          (img.width < 700 ||
          img.width > 800 ||
          img.height < 90 ||
          img.height > 110)
        ) {
          this.dimensionErr = true;
          this.disableAddBtn = true;
        } else {
          const fileSizeInKB = ceil(event.item(0).size/1024);
            if (fileSizeInKB <= 200) {
                    // this.signatureBlock.controls.upload[
                    //   'controls'
                    // ].uploadSignature.patchValue(event.item(0));
              this.signatureBlock.controls.upload[
                'controls'
              ].uploadSignature.patchValue(event);
              
              const formData: File = event.item(0);
              this.uploadImage = formData;
              this.disableAddBtn = false;
              const urlCreator = window.URL;
              const imageURL = this.sanitizer.bypassSecurityTrustUrl(
                urlCreator.createObjectURL(event.item(0))
              );
              this.signatureBlockUploadIcon = imageURL;
              //this.esignatureData.emit({event:event, tabIndex: this.currentTab['index']});
            } else {
              this.unsupportedFileSizeErrMSG = true;
              this.disableAddBtn = true;
            }
          }
        }
    // });
  }

  // submitObjCreation(fieldType, fieldName, formData?) {
  //   const tempObj: any = {};
  //   if (this.isCreateNewSignature) {
  //     tempObj.saveSignature = true;
  //   } else {
  //     tempObj.saveSignature =
  //       this.signatureBlock.value[fieldType].saveSignature;
  //   }
  //   tempObj.defaultValue = this.signatureBlock.value[fieldType].saveSignature ?? this.isCreateNewSignature
  //     ? this.signatureBlock.value[fieldType].defaultCheck
  //     : false;
  //   tempObj.file = formData;
  //   tempObj.fileName = '';
  //   tempObj.httpType = 'post';
  //   if (tempObj.saveSignature) {
  //     tempObj.fileName = this.signatureBlock.value[fieldType].title;
  //     tempObj.httpType = tempObj.fileName === fieldName ? 'put' : 'post';
  //   }
  //   if (fieldType === 'type') {
  //     tempObj.font =
  //       this.signatureBlock.value.type.fontStyle ||
  //       this.fontStyleValue.toLowerCase();
  //   }
  //   return tempObj;
  // }
  // /** Add button */
  // async addESignature() {
  //   let editCaseObject = null;
  //   if (this.editFlag) {
  //     editCaseObject = this.idSet.find(
  //       (x) => x.id === this.currentEditedSignatureId);
  //   }

  //   const fieldName =
  //     editCaseObject && editCaseObject.name
  //       ? editCaseObject.name
  //       : this.fieldData.fieldType === 'SIGNATURE_BLOCK'
  //         ? this.fieldData.Other.filter((x) => x.id === 'SIGNATURE')[0].name || ''
  //         : this.fieldData?.name || '';
  //   const emitObj = this.createSubmitJson(this.currentTab);
  //   if (this.currentTab['id'] === 'tab1') {
  //     const data = this.signatureBlock.value.savedSignature.filter(
  //       (sign) => sign['selectedImage']
  //     );
  //     emitObj['value'] = data[0]['id'];
  //     let tempObj = this.savedSignature.filter(
  //       (x) => x.id === data[0]['id']
  //     )[0];
  //     emitObj['name'] = data[0]['title'];
  //     emitObj['default'] = true;
  //     emitObj['imageURL'] = tempObj['img'];
  //     emitObj['imageBase64'] = tempObj['img'];

  //     this.emitSubmitJson(emitObj);
  //     this.esignatureBlock = false;
  //   } else if (this.currentTab['id'] === 'tab2') {
  //     this.enterNameErrorType = false;
  //     const submitObj: any = this.submitObjCreation(
  //       'type',
  //       fieldName,
  //       this.signatureBlock.value.type.signatureName
  //     );
  //     this.enterNameErrorType = isNull(submitObj) ? true : false;
  //     // const httpType = this.editFlag ? 'put' : 'post';

  //     const imageBase64 = await this._eSignIdentity.convertTextIntoImage(
  //       submitObj.file,
  //       submitObj.font,
  //       'textCanvas'
  //     );
  //     submitObj.file = imageBase64 + ',' + submitObj.file;
  //     this.fileData(submitObj, 'FONT')
  //       // .pipe(finalize(() => this.userService.setloader(false)))
  //       .subscribe((data) => {
  //         if (data.statusCode === 200) {
  //           this.updateSignatureID(data);
  //           if (this.isCreateNewSignature && this.fieldData['isEdit']) {
  //             emitObj['value'] = this.currentEditedSignatureId;
  //           }
  //           emitObj['value'] =
  //             submitObj.httpType === 'put'
  //               ? this.currentEditedSignatureId
  //               : data.data.id;
  //           emitObj['imageURL'] = imageBase64;
  //           // emitObj['signtaure'] = imageBase64;
  //           this.emitSubmitJson(emitObj);
  //           this.esignatureBlock = false;
  //         }
  //       }); // Call font API and get Images details
  //   } else if (this.currentTab['id'] === 'tab3') {
  //     const drawCanvas = document.querySelectorAll('canvas')[1];
  //     const signatureImageDrawed = await this._eSignIdentity.trimCanvas(drawCanvas);
  //     this.enterNameErrorDraw = false;
  //     const formData = signatureImageDrawed.toDataURL(); //   this.signatureBlock.value.draw.signtaure;
  //     const submitObj: any = this.submitObjCreation(
  //       'draw',
  //       fieldName,
  //       formData
  //     );
  //     this.fileData(submitObj, 'DRAW')
  //       //.pipe(finalize(() => this.userService.setloader(false)))
  //       .subscribe((data) => {
  //         if (data.statusCode === 200) {
  //           this.updateSignatureID(data);
  //           if (this.isCreateNewSignature && this.fieldData['isEdit']) {
  //             emitObj['value'] = this.currentEditedSignatureId;
  //           }
  //           emitObj['value'] =
  //             submitObj.httpType === 'put'
  //               ? this.currentEditedSignatureId
  //               : data.data.id;
  //           emitObj['imageURL'] = formData;
  //           emitObj['imageBase64'] = formData;
  //           this.emitSubmitJson(emitObj);
  //           this.esignatureBlock = false;
  //         }
  //       });

  //   } else if (this.currentTab['id'] === 'tab4') {
  //     this.enterNameErrorupload = false;
  //     const submitObj: any = this.submitObjCreation(
  //       'upload',
  //       fieldName,
  //       this.uploadImage?.file ||
  //       this.signatureBlock.value.upload.uploadSignature
  //     );
  //     this.fileData(submitObj, 'IMAGE', emitObj)
  //       //.pipe(finalize(() => this.userService.setloader(false)))
  //       .subscribe((data) => {
  //         if (data.statusCode === 200) {
  //           this.updateSignatureID(data);
  //           this.getImageUrlForAdd(
  //             submitObj.httpType === 'put'
  //               ? this.currentEditedSignatureId
  //               : data.data.id,
  //             emitObj,
  //             submitObj.httpType
  //           );
  //         }
  //       });
  //   }
  // }


  addESignature() {
    switch(this.currentTab.index) {
      case 0:
        // code block
        break;
      case 1:
        this.esignatureData.emit({
          event: this.signatureBlock.controls.type["controls"].signatureName.value,
          tabIndex: 0,
          fontStyle: this._translate.instant(this.fontDefaultText),
        });
        break;
      case 2:
        this.esignatureData.emit({
          event: this.signatureBlock.controls.draw["controls"].signtaure.value,
          tabIndex: this.currentTab?.index,
        });
        break;
      case 3:
        this.esignatureData.emit({
          event:this.signatureBlock.controls.upload['controls'].uploadSignature.value,
          tabIndex: this.currentTab['index']});
        break;
      default:
    }
    this.dialogRef.close();
    this.closeEvent.emit();
    this._authService.esignaturePanel = false;
  }

  typeFocusIn() {

    // if (this.userService.isMobileDevice()) {
    //   this.typeFocusInFlag = true;
    // }
  }

  typeFocusOut() {

    // if (this.userService.isMobileDevice()) {
    //   this.typeFocusInFlag = false;
    // }
  }

  // createSubmitJson(tabType) {
  //   let subObj: any = {};
  //   let data: any;
  //   let type = 'saved';
  //   if (tabType['id'] !== 'tab1') {
  //     if (tabType['id'] === 'tab2') {
  //       data = this.signatureBlock.value['type'];
  //       type = 'FONT';
  //     } else if (tabType['id'] === 'tab3') {
  //       data = this.signatureBlock.value['draw'];
  //       type = 'DRAW';
  //     } else if (tabType['id'] === 'tab4') {
  //       data = this.signatureBlock.value['upload'];
  //       type = 'UPLOAD';
  //     }
  //   } else {
  //     data = this.signatureBlock.value.savedSignature.filter(
  //       (x) => x.selectedImage
  //     )[0];
  //     data = this.idSet.filter((x) => x.id === data.id)[0];
  //     type = data.type;
  //     if (data.type === 'FONT') {
  //       const selectedFontStyle = this.fontStyle.filter(
  //         (x) => x.id === data['font'] || x.value === data['font']
  //       );
  //       this.fontStyleValue = data['font'];
  //       if (selectedFontStyle.length > 0) {
  //         this.fontStyleValue = selectedFontStyle[0]['value'];
  //       }
  //     }
  //   }
  //   subObj = {
  //     imageURL: '',
  //     imageBase64: '',
  //     value: '',
  //     tabId: tabType['id'],
  //     font: this.fontStyleValue,
  //     saveSignature: this.isCreateNewSignature ? true : data.saveSignature,
  //     signatureText: data?.signatureName || data?.signatureText,
  //     type: type,
  //     default:
  //       data.saveSignature || this.isCreateNewSignature
  //         ? data.defaultCheck
  //         : false,
  //     name: data.saveSignature || this.isCreateNewSignature ? data.title : '',
  //   };
  //   return subObj;
  // }

  // public fileData(param, Type: string, emitObj?): Observable<any> {
  //   const {
  //     file,
  //     fileName,
  //     saveSignature,
  //     defaultValue,
  //     httpType = this.isCreateNewSignature && this.fieldData['isEdit']
  //       ? 'put'
  //       : param.httpType,
  //   } = param;

  //   // let url = zignAPIConfigs.signatureUpload;
  //   // url = url.replace('{user_id}', this.loggedInUser['sub']);
  //   // url = url.replace('{type}', this.journeyFlag);
  //   let asyncFlag = false;
  //   const formData: FormData = new FormData();
  //   formData.append('type', Type);
  //   formData.append('save', saveSignature.toString());
  //   if (saveSignature) {
  //     formData.append('isDefault ', defaultValue.toString());
  //   } else {
  //     //formData.append('candidateId ', sessionStorage.getItem(StorageEnum.CANDIDATE_ID));
  //   }
  //   formData.append('fileName', fileName);
  //   if (Type === 'IMAGE' && file) {
  //     if (file && file?.name) {
  //       formData.append('files', file, file.name);
  //     } else {
  //       asyncFlag = true;
  //       const Id = this.currentEditedSignatureId || this.fieldData['value'];
  //       // this._eSignIdentity.get_eSignIdentity(this.journeyFlag, Id).subscribe((data) => {
  //       //   formData.append('files', data as File);
  //       //   const apiResponse = this.submitDataAPIcall(httpType, formData);
  //       //   apiResponse
  //       //     //.pipe(finalize(() => this.userService.setloader(false)))
  //       //     .subscribe((temp) => {
  //       //       if (temp.statusCode === 200) {
  //       //         this.getImageUrlForAdd(
  //       //           param.httpType === 'put'
  //       //             ? this.currentEditedSignatureId
  //       //             : temp.data.id,
  //       //           emitObj,
  //       //           param.httpType
  //       //         );
  //       //       }
  //       //     });
  //       // });
  //     }
  //   } else if (Type === 'DRAW' || Type === 'FONT') {
  //     formData.append('signature', file);
  //     if (Type === 'FONT') {
  //       formData.append('font', param.font);
  //     }
  //   }
  //   if (!asyncFlag) {
  //     return this.submitDataAPIcall(httpType, formData);
  //   }
  // }

  // updateSignatureID(signatureUpdatedRes) {
  //   if (this.droppedElements) {
  //     let IsDigSignature = this.droppedElements.some((obj) =>
  //       obj.hasOwnProperty('digiObj')
  //     );
  //     if (IsDigSignature) {
  //       if (this.fieldData.fieldType !== 'DIGITAL_SIGNATURE') {
  //         // this.digitalService.saveDigitalSignature(signatureUpdatedRes.data.id, this._authService.userInfo).subscribe((res) => {
  //         // this.digitalService.resUpdatedDigi.digitalId = res['data'].id
  //         // }, error => {
  //         //   this.errorService.errorHandling(error.error?.tracerId);
  //         // });
  //       }
  //     }
  //   }
  // }

  // submitDataAPIcall(httpType, formData) {
  //   let apiCall;
  //   if (httpType === 'put' && this.savedSignature.findIndex(x => x.id === this.currentEditedSignatureId) > -1) {
  //     apiCall = this._eSignIdentity.update_eSignIdentity(this.journeyFlag, formData, this.currentEditedSignatureId);
  //   } else {
  //     apiCall = this._eSignIdentity.post_eSignIdentity(this.journeyFlag, formData);
  //   }
  //   return apiCall.pipe(map(val => val))
  // }

  // getImageUrlForAdd(Id, emitObj, httpType) {
  //   this._eSignIdentity.get_eSignIdentity(this.journeyFlag, Id).subscribe((data) => {
  //     const urlCreator = window.URL;
  //     const imageURL = this.sanitizer.bypassSecurityTrustUrl(
  //       urlCreator.createObjectURL(data)
  //     );
  //     this.esignatureBlock = false;
  //     if (this.isCreateNewSignature && this.fieldData['isEdit']) {
  //       emitObj['value'] = this.currentEditedSignatureId;
  //     }
  //     emitObj['value'] =
  //       httpType === 'put' ? this.currentEditedSignatureId : Id;
  //     emitObj['imageURL'] = imageURL;
  //     blobToBase64String(data).then((base64) => {
  //       const base64Var = `data:image/png;base64,${base64}`;
  //       emitObj['imageBase64'] = base64Var;
  //     });

  //     this.emitSubmitJson(emitObj);
  //     this.esignatureBlock = false;
  //   });
  // }

  // /** validate Current selected Tab value and Enable or disbale Add btn */
  validateNEnableAddBtn() {
    this.duplicateNmTypeErr = false;
    this.duplicateNmDrawErr = false;
    this.duplicateNmUploadErr = false;
    this.disableAddBtn = true;
    let containerVal = false;
    let tempflag = false;
    switch (this.activeTabId) {
      case 0:
        {
          // this.disableAddBtn = this.atleastOneSavedImageSelected(
          //   this.signatureBlock.controls.savedSignature.value
          // );
        }
        break;
      case 1:
        {
          this.disableAddBtn = false;
          containerVal = this.mainValueCheck('type');
          const duplicateFlag = this.saveSignatureCheck('type');
          this.duplicateNmTypeErr = duplicateFlag ? true : false;
          tempflag = isNull(duplicateFlag) ? false : true;
          if (
            (tempflag && containerVal && !this.disableAddBtn) ||
            (!tempflag && containerVal)
          ) {
            this.disableAddBtn = false;
          } else {
            this.disableAddBtn = true;
          }
        }
        break;
      case 2:
        {
          this.disableAddBtn = false;
          containerVal = this.mainValueCheck('draw');
          const duplicateFlag = this.saveSignatureCheck('draw');
          this.duplicateNmTypeErr = duplicateFlag ? true : false;
          tempflag = isNull(duplicateFlag) ? false : true;
          if (
            (tempflag && containerVal && !this.disableAddBtn) ||
            (!tempflag && containerVal)
          ) {
            this.disableAddBtn = false;
          } else {
            this.disableAddBtn = true;
          }
        }
        break;
      case 3: {
        {
          this.disableAddBtn = false;
          containerVal = this.mainValueCheck('upload');
          const duplicateFlag = this.saveSignatureCheck('upload');
          this.duplicateNmTypeErr = duplicateFlag ? true : false;
          tempflag = isNull(duplicateFlag) ? false : true;
          if (
            (tempflag && containerVal && !this.disableAddBtn) ||
            (!tempflag && containerVal)
          ) {
            this.disableAddBtn = false;
          } else {
            this.disableAddBtn = true;
          }
        }
      }
    }
  }

  checkTypeData() {
    // let savedUserCreds: User = JSON.parse(
    //   this._storage.readLocal(StorageEnum.USER_CREDS)
    // );
    let blankCheck = this.signatureBlock.controls.type.value['signatureName'] ? this.signatureBlock.controls?.type?.value?.signatureName?.trim() : this.fieldData?.signatureText ? this.fieldData?.signatureText : "";
    this.signatureBlock.controls.type['controls'].signatureName.setValue(blankCheck);
    if (blankCheck === "") {
      if (this.journeyFlag === 'SIGNATURE' || this.journeyFlag === 'SIGNATURE_BLOCK') {
        //this.fullName = savedUserCreds.fn;
        //this.userName = savedUserCreds.fn || this._translate.instant('MST_YOUR_SIGNATURE');
        if (this.fullName.match(/@/g)) {
          this.fullName = '';
          this.userName = this._translate.instant('MST_YOUR_SIGNATURE');
        }
        this.signatureBlock.controls.type['controls'].signatureName.setValue(
          this.fullName
        );
      } else if (this.journeyFlag === 'INITIAL') {
        let skipShorthand = false;
        //this.fullName = savedUserCreds.fn;
        if (this.fullName.match(/@/g) || '' === this.fullName) {
          this.fullName = '';
          this.userName = this._translate.instant('MST_AB');
          skipShorthand = true;
        }
        if (!skipShorthand) {
          let initialArr = this.fullName.split(' ');
          if (initialArr.length > 1) {
            this.userName = (initialArr[0].charAt(0) + initialArr[initialArr.length - 1].charAt(0)).toUpperCase();
          } else {
            this.userName = (initialArr[0].charAt(0)).toUpperCase();
          }
          this.signatureBlock.controls.type['controls'].signatureName.setValue(
            this.userName
          );
        } else {
          this.signatureBlock.controls.type['controls'].signatureName.setValue(
            this.fullName
          );
        }
      }
    }
    else {
      this.userName = blankCheck;
    }
  }

  mainValueCheck(fieldType) {
    switch (fieldType) {
      case 'type': {
        return (
          this.signatureBlock.controls?.type?.value?.signatureName?.trim()
            .length > 0
        );
      }
      case 'draw': {
        return (
          this.signatureBlock.controls?.draw?.value?.signtaure?.length > 0 &&
          this.signatureBlock.controls?.draw?.value?.signtaure !== 'data:,' &&
          this.signatureBlock.controls?.draw?.value?.signtaure !==
          this.blankDrawBlob
        );
      }
      case 'upload': {
        return this.signatureBlock.controls?.upload?.value?.uploadSignature;
      }
    }
  }

  saveSignatureCheck(fieldType) {
    if (
      this.isCreateNewSignature ||
      this.signatureBlock.controls[fieldType]['controls'].saveSignature.value
    ) {
      const duplicateCheck =
        this.checkDuplicateNamePresent(
          this.signatureBlock.controls[fieldType]['controls'].title.value
        ) || false;
      this.disableAddBtn =
        this.checkforCurrentSaveData(
          this.signatureBlock.controls[fieldType]['controls'].title.value
        ) || duplicateCheck;
      return duplicateCheck;
    }
    return null;
  }

  checkDuplicateNamePresent(name) {
    let flag = false;
    this.savedSignature.filter((x) => {
      if (
        this.currentEditedSignatureId !== x.id ||
        (!this.isCreateNewSignature && !this.editFlag)
      ) {
        if (x.title === name.trim()) {
          flag = true;
        }
      }
    });
    return flag;
  }

  // /** check for default  */
  checkforCurrentSaveData(fieldValue) {
    let flag = true;
    if (fieldValue.trim().length > 0) {
      flag = false;
    }
    return flag;
  }

  // /** tab 3 save Drawn Image in base64 */
  async saveImage(blob: Blob) {
    this.disableAddBtn = true;
    let drawCanvas = document.querySelectorAll('canvas')[1];
    if (this.activeTabId === 2) {
      this.signtureImage = drawCanvas.toDataURL();
    }
    if (this.firstTimeLoad) {
      this.firstTimeLoad = false;
      this.firstTimeEmptyCanvasData = this.signtureImage;
      this.validateNEnableAddBtn();
    }

    //this.esignatureData.emit({event: blob, tabIndex: this.currentTab?.index})
    this.signatureBlock.controls.draw['controls'].signtaure.patchValue(
      blob
    );
    // this.signatureBlock.controls.draw['controls'].signtaure.patchValue(
    //   this.signtureImage
    // );
    if (this.isClearedCanvas) {
      this.blankDrawBlob = blob;
      this.isClearedCanvas = false;
      return false;
    }
    this.validateNEnableAddBtn();
  }

  // /** tab 4 font change */
  setFontStyle(evt) {
    this.fontStyleValue = evt.value;
    this.fontDefaultText = evt.value;
    // if (this.signatureBlock.controls.type.value.signatureName.trim() !== '') {
    //   this.disableAddBtn = false;
    // }
  }

  closeSignturePopUp() {
    this._authService.esignaturePanel = false;
    this.dialogRef.close();
    this.closeEvent.emit();
  }

  // /** on initial change */
  onInitialChange(event) {
    this.disableAddBtn = true;
    if (event.target.value.trim() !== '') {
       this.disableAddBtn = false;
      //this.userName = event.target.value.trim();
      this.validateNEnableAddBtn();
    }
  }

  checkTypeField(event) {
    // this.esignatureData.emit({
    //   event: this.signatureBlock.controls.type["controls"].signatureName.value,
    //   tabIndex: 0,
    //   fontStyle: this.fontDefaultText,
    // });
    
    if (event.target.value.trim() === '') {
      // this.userName = this.fullName;
      //this.signatureBlock.controls.type['controls'].signatureName.setValue(this.fullName);
      this.checkTypeData();
      this.validateNEnableAddBtn();
    }
  }

  // /** create Uploaded/Drawn/Typed-Signature initials */
  checkSignatureNameInUse(param) {
    let tempName = this._translate.instant('MST_' + param);
    let no = 0;
    this.idSet.filter((x) => {
      if (x.name.includes(tempName)) {
        const tempo = parseInt(x.name.split('-')[1]);
        no = tempo && tempo > no ? tempo : no;
      }
    });
    return tempName + ' - ' + (no + 1);
  }

  // /**  add default signature checkbox and title input box */
  // checkSaveSignature(event, defaultFlag = false, defaultTitle = '') {
  //   const signName = upperCase(this.journeyFlag);
  //   if (this.currentTab['id'] === 'tab2') {
  //     if (event.isChecked) {
  //       if (defaultTitle === '') {
  //         defaultTitle = this.checkSignatureNameInUse(
  //           signName
  //         );
  //       }
  //       this.addDefaultFormControl(
  //         this.signatureBlock.controls.type,
  //         defaultFlag,
  //         defaultTitle
  //       );
  //       this.showDefaultType = true;
  //       this.scrollToView('type');
  //     } else {
  //       this.disableAddBtn =
  //         this.signatureBlock.controls?.type?.value?.signatureName?.trim()
  //           .length
  //           ? false
  //           : true;
  //       this.removeDefaultFormControl(this.signatureBlock.controls.type);
  //       this.showDefaultType = false;
  //     }
  //   } else if (this.currentTab['id'] === 'tab3') {
  //     if (event.isChecked) {
  //       if (defaultTitle === '') {
  //         defaultTitle = this.checkSignatureNameInUse(
  //           signName
  //         );
  //       }
  //       this.addDefaultFormControl(
  //         this.signatureBlock.controls.draw,
  //         defaultFlag,
  //         defaultTitle
  //       );
  //       this.showDefaultDraw = true;
  //       this.scrollToView('draw');
  //     } else {
  //       this.disableAddBtn =
  //         this.isClearedCanvas ||
  //           this.signatureBlock.controls?.draw?.value?.signtaure === 'data:,' ||
  //           this.signatureBlock.controls?.draw?.value?.signtaure ===
  //           this.blankDrawBlob ||
  //           this.signatureBlock.controls?.draw?.value?.saveSignature
  //           ? true
  //           : false;
  //       this.removeDefaultFormControl(this.signatureBlock.controls.draw);
  //       this.showDefaultDraw = false;
  //     }
  //   } else if (this.currentTab['id'] === 'tab4') {
  //     if (event.isChecked) {
  //       if (defaultTitle === '') {
  //         defaultTitle = this.checkSignatureNameInUse(
  //           signName
  //         );
  //       }
  //       this.addDefaultFormControl(
  //         this.signatureBlock.controls.upload,
  //         defaultFlag,
  //         defaultTitle
  //       );

  //       this.showDefaultUpload = true;
  //       this.scrollToView('upload');
  //     } else {
  //       this.disableAddBtn = this.signatureBlock.controls?.upload?.value
  //         ?.uploadSignature
  //         ? false
  //         : true;
  //       this.removeDefaultFormControl(this.signatureBlock.controls.upload);
  //       this.showDefaultUpload = false;
  //     }
  //   }
  // }

  addDefaultFormControl(field, defaultFlag = false, defaultTitle = '') {
    if (defaultTitle === '') {
      this.disableAddBtn = true;
    }
    if (field.value.hasOwnProperty('defaultCheck')) {
      this.setDefaultControlValue(field, defaultFlag);
      this.setNameofSignValue(field, defaultTitle);
    } else {
      this.addDefaultControl(field, defaultFlag);
      this.addNameOfSignControl(field, defaultTitle);
    }
  }

  addDefaultControl(field, defaultFlag) {
    field.addControl('defaultCheck', new FormControl(defaultFlag));
  }

  addNameOfSignControl(field, defaultTitle) {
    field.addControl('title', new FormControl(defaultTitle));
  }

  setDefaultControlValue(field, defaultFlag) {
    field['controls'].defaultCheck.setValue(defaultFlag);
  }

  setNameofSignValue(field, defaultTitle) {
    field['controls'].title.setValue(defaultTitle);
  }

  // removeDefaultFormControl(field) {
  //   field.removeControl('defaultCheck');
  //   field.removeControl('title');
  // }

  // duplicateNamePresent(name: string) {
  //   // TODO convert into valueChange
  //   this.duplicateNmTypeErr = false;
  //   this.duplicateNmDrawErr = false;
  //   this.duplicateNmUploadErr = false;
  //   this.disableAddBtn = name.trim().length ? false : true;
  //   let flag = false;
  //   this.savedSignature.filter((x) => {
  //     if (
  //       this.currentEditedSignatureId !== x.id ||
  //       (!this.isCreateNewSignature && !this.editFlag)
  //     ) {
  //       if (x.title === name.trim()) {
  //         flag = true;
  //       }
  //     }
  //   });
  //   this.validateNEnableAddBtn();
  //   if (this.editFlag && !this.freshJourney) {
  //     this.setNameSignature(name.trim());
  //   }
  //   this.disableAddBtn = flag || this.disableAddBtn;
  // }

  // defaultValueChange(evt) {
  //   if (this.editFlag) {
  //     this.setDefaultControlValue(
  //       this.signatureBlock.controls.type,
  //       evt.isChecked
  //     );
  //     this.setDefaultControlValue(
  //       this.signatureBlock.controls.draw,
  //       evt.isChecked
  //     );
  //     this.setDefaultControlValue(
  //       this.signatureBlock.controls.upload,
  //       evt.isChecked
  //     );
  //   }
  // }

  // setNameSignature(fieldName) {
  //   this.setNameofSignValue(this.signatureBlock.controls.type, fieldName);
  //   this.setNameofSignValue(this.signatureBlock.controls.draw, fieldName);
  //   this.setNameofSignValue(this.signatureBlock.controls.upload, fieldName);
  // }

  onClearedSignPad(evt) {
    this.isClearedCanvas = true;
  }

  // scrollToView(typeOfTab) {
  //   setTimeout(() => {
  //     const id = `save-form-${typeOfTab}`;
  //     let element = document.getElementById(id);
  //     element.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'end',
  //       inline: 'nearest',
  //     });
  //     const focusItem = `focus-${typeOfTab}`;
  //     let name_autofocus = document.getElementById(focusItem);
  //     name_autofocus.focus();
  //   }, 500);
  // }

  // private emitSubmitJson(emitObj) {
  //   if (this.fieldData.fieldType === 'DIGITAL_SIGNATURE') {
  //     emitObj['isDS'] = true;
  //   }
  //   if (this.isApplyToAllField) {
  //     // emitObj.applySignatureToAllField = (this.applyAllFieldEnableFlag && this.applyToAllField.applySignatureToAllFieldRequiredFlag) ?
  //     //   this.applyToAll.controls.applySignatureToAllField.value : 'NA';
  //     // emitObj.applyInitialToAllField = (this.applyAllFieldEnableFlag && this.applyToAllField.applyInitialToAllFieldRequiredFlag) ?
  //     //                                   this.applyToAll.controls.applyInitialToAllField.value : 'NA';
  //     // emitObj.applyStampToAllField = (this.applyAllFieldEnableFlag && this.applyToAllField.applyStampToAllFieldRequiredFlag) ?
  //     //                                   this.applyToAll.controls.applyStampToAllField.value : 'NA';
  //   }
  //   this.selectedSigntureInfo.emit(emitObj);
  //   //this.userService.setloader(false);
  // }

}
