import { Injector } from '@angular/core';
import { FormioCustomComponentInfo, registerCustomFormioComponent } from '@formio/angular';
import { CustomSignatureComponent } from './custom-signature.component';

const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  type: 'signature',
  selector: 'toggle-signature',
  title: 'Signature',
  group: 'custom',
  icon: 'terminal',
  documentation: '/userguide/#signature',
  // extraValidators: [],
  // weight: 10,
  // editForm: editForm,
  // editForm: Componets.components.textfield.editForm,
  schema: {
    type: 'signature',
    label: 'Signature',
    key: 'signature',
    footer: 'Sign above',
    width: '100%',
    height: '150px',
    penColor: 'black',
    backgroundColor: 'rgb(245,245,235)',
    minWidth: '0.5',
    maxWidth: '2.5'
  },
  // fieldOptions: ['numCols', 'numRows', 'key'],
  // changeEvent: 'changeEventTest'
};

function editForm() {
  
  return {
    components: [
      { key: 'signature', type: 'hidden' },
      {
        label: "Tabs",
        components: [
        displayTab(),
        dataTab(),
        validationTab(),
        apiTab(),
        conditionalTab(),
        layoutTab()
        ],
        key: "signature",
        type: "tabs",
        input: false,
        tableView: false
      },
    ],
  };
}

function displayTab() {
  return {
    label: "Basic",
    key: "display",
    components: [
      {
        weight: 0,
        type: 'textfield',
        input: true,
        key: 'label',
        label: 'Label',
        placeholder: 'Signature',
        id: "test",
        validate: {
          required: false
        }
      },
      {
        type: 'select',
        input: true,
        key: 'labelPosition',
        label: 'Label Position',
        tooltip: 'Position for the label for this field.',
        weight: 20,
        defaultValue: 'top',
        dataSrc: 'values',
        display: false,
        data: {
          values: [
            { label: 'Top', value: 'top' },
            { label: 'Left (Left-aligned)', value: 'left-left' },
            { label: 'Left (Right-aligned)', value: 'left-right' },
            { label: 'Right (Left-aligned)', value: 'right-left' },
            { label: 'Right (Right-aligned)', value: 'right-right' },
            { label: 'Bottom', value: 'bottom' }
          ]
        }
      },
      {
        type: 'number',
        input: true,
        key: 'labelWidth',
        label: 'Label Width',
        tooltip: 'The width of label on line in percentages.',
        clearOnHide: false,
        weight: 30,
        placeholder: '30',
        suffix: '%',
        validate: {
          min: 0,
          max: 100
        },
        conditional: {
          json: {
            and: [
              { '!==': [{ var: 'data.labelPosition' }, 'top'] },
              { '!==': [{ var: 'data.labelPosition' }, 'bottom'] },
            ]
          }
        }
      },
      {
        type: 'number',
        input: true,
        key: 'labelMargin',
        label: 'Label Margin',
        tooltip: 'The width of label margin on line in percentages.',
        clearOnHide: false,
        weight: 30,
        placeholder: '3',
        suffix: '%',
        validate: {
          min: 0,
          max: 100
        },
        conditional: {
          json: {
            and: [
              { '!==': [{ var: 'data.labelPosition' }, 'top'] },
              { '!==': [{ var: 'data.labelPosition' }, 'bottom'] },
            ]
          }
        }
      },
      {
        weight: 200,
        type: 'textarea',
        input: true,
        key: 'description',
        label: 'Description',
        placeholder: 'Description for this field.',
        tooltip: 'The description is text that will appear below the input field.',
        editor: 'ace',
        as: 'html',
        wysiwyg: {
          minLines: 3,
          isUseWorkerDisabled: true,
        },
      },
      {
        weight: 300,
        type: 'textarea',
        input: true,
        key: 'tooltip',
        label: 'Tooltip',
        placeholder: 'To add a tooltip to this field, enter text here.',
        tooltip: 'Adds a tooltip to the side of this field.',
        editor: 'ace',
        as: 'html',
        wysiwyg: {
          minLines: 3,
          isUseWorkerDisabled: true,
        },
      },
      {
        weight: 500,
        type: 'textfield',
        input: true,
        key: 'customClass',
        label: 'Custom CSS Class',
        placeholder: 'Custom CSS Class',
        tooltip: 'Custom CSS class to add to this component.'
      },
      {
        weight: 1100,
        type: 'checkbox',
        label: 'Hidden',
        tooltip: 'A hidden field is still a part of the form, but is hidden from view.',
        key: 'hidden',
        input: true
      },
      {
        weight: 1200,
        type: 'checkbox',
        label: 'Hide Label',
        tooltip: 'Hide the label (title, if no label) of this component. This allows you to show the label in the form builder, but not when it is rendered.',
        key: 'hideLabel',
        input: true
      },
      {
        weight: 1400,
        type: 'checkbox',
        label: 'Disabled',
        tooltip: 'Disable the form input.',
        key: 'disabled',
        input: true
      },
    ]
  }
}

function dataTab() {
  return {
    label: "Data",
    key: "data",
    components: [
      {
        weight: 0,
        type: 'checkbox',
        label: 'Multiple Values',
        tooltip: 'Allows multiple values to be entered for this field.',
        key: 'customOptions.multipleValues',
        input: true
      },
      {
        type: 'textfield',
        label: 'Default Value',
        key: 'defaultValue',
        weight: 5,
        placeholder: 'Default Value',
        tooltip: 'The will be the value for this field, before user interaction.',
        input: true
      },
      {
        weight: 20,
        label: 'Values',
        key: 'customOptions.options',
        tooltip: 'The values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears inside the buttons on the form.',
        type: 'datagrid',
        input: true,
        reorder: true,
        components: [
          {
            label: 'Label',
            key: 'label',
            type: 'textfield',
            input: true,
            validate: {
              required: false,
            }
          },
          {
            label: 'Value',
            key: 'value',
            type: 'textfield',
            input: true,
            allowCalculateOverride: true,
            calculateValue: { _camelCase: [{ var: 'row.label' }] },
            validate: {
              required: false,
            }
          },
          {
            label: 'Icon',
            key: 'icon',
            type: 'select',
            input: true,
            data: {
              values: [
                {
                  label: "People",
                  value: "people"
                },
                {
                  label: "Star",
                  value: "star"
                }
              ]
            },
            validate: {
              required: false,
            }
          }
        ]
      },
      // {
      //   type: 'panel',
      //   title: 'Custom Default Value',
      //   theme: 'default',
      //   collapsible: true,
      //   collapsed: true,
      //   key: `customDefaultValuePanel`,
      //   weight: 1000,
      //   components: [
      //     {
      //       type: 'panel',
      //       title: 'Javascript',
      //       collapsible: true,
      //       collapsed: false,
      //       style: { 'margin-bottom': '10px' },
      //       key: 'customDefaultValue-js',
      //       components: [
      //         {
      //           type: 'textarea',
      //           key: 'customDefaultValue',
      //           rows: 5,
      //           editor: 'ace',
      //           hideLabel: true,
      //           as: 'javascript',
      //           input: true,
      //           defaultValue: 'value = {};\ncomponent.customOptions.options.forEach((option)=>{\n  value[option.value] = false;\n});'
      //         },
      //         {
      //           type: 'htmlelement',
      //           tag: 'div',
      //           content: `<p>Enter custom javascript code.</p><p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>',
      //           '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>`
      //         }
      //       ]
      //     }
      //   ]
      // },
    ]
  }
}

function validationTab() {
  return {
    label: "Validation",
    key: "validation",
    components: [
      {
        weight: 10,
        type: 'checkbox',
        label: 'Required',
        tooltip: 'A required field must be filled in before the form can be submitted.',
        key: 'validate.required',
        input: true
      },
      {
        weight: 190,
        type: 'textfield',
        input: true,
        key: 'errorLabel',
        label: 'Error Label',
        placeholder: 'Error Label',
        tooltip: 'The label for this field when an error occurs.'
      },
      {
        weight: 200,
        key: 'validate.customMessage',
        label: 'Custom Error Message',
        placeholder: 'Custom Error Message',
        type: 'textfield',
        tooltip: 'Error message displayed if any error occurred.',
        input: true
      },
    ]
  }
}

function apiTab() {
  return {
    label: "API",
    key: "api",
    components: [
      {
        weight: 0,
        type: 'textfield',
        input: true,
        key: 'key',
        label: 'Property Name',
        tooltip: 'The name of this field in the API endpoint.',
        validate: {
          pattern: '(\\w|\\w[\\w-.]*\\w)',
          patternMessage: 'The property name must only contain alphanumeric characters, underscores, dots and dashes and should not be ended by dash or dot.',
          required: false
        }
      },
      {
        weight: 100,
        type: 'tags',
        input: true,
        label: 'Field Tags',
        storeas: 'array',
        tooltip: 'Tag the field for use in custom logic.',
        key: 'tags'
      },
      {
        weight: 200,
        type: 'datamap',
        label: 'Custom Properties',
        tooltip: 'This allows you to configure any custom properties for this component.',
        key: 'properties',
        valueComponent: {
          type: 'textfield',
          key: 'value',
          label: 'Value',
          placeholder: 'Value',
          input: true
        }
      },
    ]
  }
}

function conditionalTab() {
  return {
    label: "Conditional",
    key: "conditional",
    components: [
      {
        type: 'panel',
        title: 'Simple',
        key: 'simple-conditional',
        theme: 'default',
        components: [
          {
            type: 'select',
            input: true,
            label: 'This component should Display:',
            key: 'conditional.show',
            dataSrc: 'values',
            data: {
              values: [
                { label: 'True', value: 'true' },
                { label: 'False', value: 'false' }
              ]
            }
          },
          {
            type: 'select',
            input: true,
            label: 'When the form component:',
            key: 'conditional.when',
            dataSrc: 'custom',
            valueProperty: 'value',
            data: {
              custom(context) {
                return getContextComponents(context);
              }
            }
          },
          {
            type: 'textfield',
            input: true,
            label: 'Has the value:',
            key: 'conditional.eq'
          }
        ]
      },
    ]
  }
}

function layoutTab() {
  return {
    label: "Layout",
    key: "layout",
    components: [
      {
        label: 'HTML Attributes',
        type: 'datamap',
        input: true,
        key: 'attributes',
        keyLabel: 'Attribute Name',
        valueComponent: {
          type: 'textfield',
          key: 'value',
          label: 'Attribute Value',
          input: true
        },
        tooltip: 'Provide a map of HTML attributes for component\'s input element (attributes provided by other component settings or other attributes generated by form.io take precedence over attributes in this grid)',
        addAnother: 'Add Attribute',
      },
    ]
  }
}

function getContextComponents(context) {
  const values = [];

  context.utils.eachComponent(context.instance.options.editForm.components, (component, path) => {
    if (component.key !== context.data.key) {
      values.push({
        label: `${component.label || component.key} (${path})`,
        value: path,
      });
    }
  });

  return values;
}

export function registerCustomSignatureComponent(injector: Injector) {

  registerCustomFormioComponent(COMPONENT_OPTIONS, CustomSignatureComponent, injector);
}