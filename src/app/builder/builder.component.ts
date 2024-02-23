import { Component, ElementRef, ViewChild,Renderer2, OnInit } from '@angular/core';
//import BuilderUtils from '../../../../utils/builder';
import { componentProperties } from '../component-properties';
import { AuthService } from '../core/service/app.service';
@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent {
  @ViewChild('div') div: ElementRef;
  formJson: any;
  dispTitleEdit: boolean = false;
  public form: Object = {
    components: []
    };

  public options = {
    
    builder: {
      basic: false,
      advanced: false,
      data: false,
      premium: false,
      layout: false,
      customBasic: {
        title: 'Basic Components',
        default: true,
        weight: 0,
        components: {
          content: true,
          textfield: true,
          number: true,
          checkbox: true,
          radio: true,
          select: true,
          datetime: true,
          button: true  /* submit not working*/
        }
      },
      custom: {
        title: 'Signature Fields',
        weight: 20,
        default: true,
        components: {
          signatureBlock: {
            title: 'Signature Block',
            key: 'signatureBlock',
            icon: 'phone-square',
            schema: {
              label: 'Mobile Phone',
              type: 'phoneNumber',
              key: 'signatureBlock',
              input: true
            }
          }
        },
      },
      customSigner: {
        title: 'Signer Details',
        weight: 20,
        components: {
          title: {
            title: 'Title',
            key: 'Title',
            icon: 'terminal',
            schema: {
              label: 'Title',
              type: 'textfield',
              key: 'title',
              input: true
            }
          },
          companyName: {
            title: 'Company Name',
            key: 'companyName',
            icon: 'terminal',
            schema: {
              label: 'Company Name',
              type: 'textfield',
              key: 'companyName',
              input: true
            }
          },
          signerName: {
            title: 'Signer Name',
            key: 'signerName',
            icon: 'at',
            schema: {
              label: 'Signer Name',
              type: 'textfield',
              key: 'signerName',
              input: true
            }
          },
          signerEmail: {
            title: 'Signer Email',
            key: 'signerEmail',
            icon: 'phone-square',
            schema: {
              label: 'Signer Email',
              type: 'textfield',
              key: 'signerEmail',
              input: true
            }
          },
          signerDate: {
            title: 'Signer Date',
            key: 'signerDate',
            icon: 'phone-square',
            schema: {
              label: 'Signer Date',
              type: 'datetime',
              key: 'signerDate',
              input: true
            }
          },
          reasonForSigning: {
            title: 'Reason For Signing',
            key: 'reasonForSigning',
            icon: 'phone-square',
            schema: {
              label: 'Reason For Signing',
              type: 'textfield',
              key: 'reasonForSigning',
              input: true
            }
          }
        }, 
      },
      customAdvance: {
        title: 'Advance',
        default: true,
        weight: 30,
        components: {
          survey: true,
          address: true,
          currency: true
        }
      },
      customLayout: {
        title: 'Layout',
        default: true,
        weight: 40,
        components: {
          columns: true,
          table: true,
          //section: true,
         // group: true,
          tabs: true,
         // hiddenField: true
        }
      }
    },
    editForm: {
      textfield: [
        {
          key: "display",
          components: componentProperties.textFieldProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
      ],
      number: [
        {
          key: "display",
          components: componentProperties.numberProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
      ],
      radio: [
        {
          key: "display",
          components: componentProperties.radioProperties,
        },
        {
          key: "data",
          ignore: false,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
      ],
      checkbox: [
        {
          key: "display",
          components: componentProperties.checkboxProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
      ],
      select: [
        {
          key: "display",
          components: componentProperties.selectProperties,
        },
        {
          key: "data",
          ignore: false,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
      ],
      datetime: [
        {
          key: "display",
          components: componentProperties.dateTimeProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "date",
          ignore: true
        },
        {
          key: "time",
          ignore: true
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
      ],
      button: [
        {
          key: "display",
          components: componentProperties.buttonProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
      ],
      content: [
        {
          key: "display",
          components: componentProperties.contentProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
      ],
      survey: [
        {
          key: "display",
          components: componentProperties.surveyProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
      ],
      address: [
        {
          key: "display",
          components: componentProperties.addressProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        },
        {
          key: "provider",
          ignore: true,
        }
      ],
      currency: [
        {
          key: "display",
          components: componentProperties.currencyProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        }
      ],
      columns: [
        {
          key: "display",
          components: componentProperties.columnsProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        }
      ],
      table: [
        {
          key: "display",
          components: componentProperties.tableProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        }
      ],
      tabs: [
        {
          key: "display",
          components: componentProperties.tabsProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        }
      ],
      signatureBlock: [
        {
          key: "display",
          components: componentProperties.tabsProperties,
        },
        {
          key: "data",
          ignore: true,
        },
        {
          key: "api",
          ignore: true,
        },
        {
          key: "conditional",
          ignore: true,
        },
        {
          key: "logic",
          ignore: true,
        },
        {
          key: "validation",
          Component: {},
          ignore: true,
        },
        {
          key: "layout",
          ignore: true,
        }
      ]
    },
  };

  constructor (private renderer: Renderer2, private formService: AuthService) {
  }

  ngOnInit() {
  }

  public onChangeDesign($event: any): void {
    if ($event.form) {
      const params = new URLSearchParams(window.location.search)
      this.formJson = $event.form;
      this.formJson.title = params.get('title').split(' ').join('-');
      this.formJson.name = params.get('title').split(' ').join('-');
      this.formJson.path = params.get('title').split(' ').join('-');
    }
  }

  public onSubmit($event): void {
    console.log("on submit");
  }

  public cancel() {
  }

  public onsubmitForm(): void {
    this.formService.createForm(this.formJson).subscribe((res: any) => {
      alert("Submitted");
      window.open('http://localhost:4209/manage-forms/listing', "_parent",);
    });
  }

  public titleAccordian(): void {
   this.dispTitleEdit = true
  }
}
