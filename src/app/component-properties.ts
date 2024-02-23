
    export const componentProperties = {
        textFieldProperties: [
            {
              weight: 20,
              type: "checkbox",
              label: "Mandatory",
              tooltip:
                "A required field must be filled in before the form can be submitted.",
              key: "validate.required",
              input: true,
            },
            {
              type: "textfield",
              label: "Default Value",
              key: "defaultValue",
              weight: 60,
              placeholder: "Default Value",
              tooltip:
                "The Default Value will be the value for this field, before user interaction. Having a default value will override the placeholder text.",
              input: true,
            },
            {
              key: "widget.type",
              ignore: true,
            },
            {
              key: "inputMask",
              ignore: true,
            },
            {
              key: "displayMask",
              ignore: true,
            },
            {
              key: "allowMultipleMasks",
              ignore: true,
            },
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "showWordCount",
              ignore: true,
            },
            {
              key: "showCharCount",
              ignore: true,
            },
            {
              key: "autofocus",
              ignore: true,
            },
            {
              key: "spellcheck",
              ignore: true,
            },
            {
              key: "disabled",
              ignore: true,
            },
            {
              key: "tableView",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "hideInput",
              ignore: true,
            },
            {
              key: "mask",
              ignore: true,
            },
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "autocomplete",
              ignore: true,
            },
        ],
        numberProperties: [
            {
              weight: 20,
              type: "checkbox",
              label: "Mandatory",
              tooltip:
                "A required field must be filled in before the form can be submitted.",
              key: "validate.required",
              input: true,
            },
            {
              type: "textfield",
              label: "Default Value",
              key: "defaultValue",
              weight: 60,
              placeholder: "Default Value",
              tooltip:
                "The Default Value will be the value for this field, before user interaction. Having a default value will override the placeholder text.",
              input: true,
            },
            {
              key: "customClass",
              ignore: true,
            },
          
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "autofocus",
              ignore: true,
            },
            {
              key: "disabled",
              ignore: true,
            },
            {
              key: "tableView",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "hideInput",
              ignore: true,
            },
            {
              key: "mask",
              ignore: true,
            },
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "autocomplete",
              ignore: true,
            },
        ],
        radioProperties: [
            {
              weight: 20,
              type: "checkbox",
              label: "Mandatory",
              tooltip:
                "A required field must be filled in before the form can be submitted.",
              key: "validate.required",
              input: true,
            },
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "mask",
              ignore: true,
            },
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "tableView",
              ignore: true,
            },
            {
              key: "hideLabel",
              ignore: false,
            },
            {
              key: "autofocus",
              ignore: true,
            },
            {
              key: "disabled",
              ignore: true,
            },
            // {
            //   type: 'datagrid',
            //   input: true,
            //   label: 'Values',
            //   key: 'values',
            //   tooltip: 'The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form.',
            //   weight: 10,
            //   reorder: true,
            //   defaultValue: [{ label: '', value: '' }],
            //   components: [
            //     {
            //       label: 'Label',
            //       key: 'label',
            //       input: true,
            //       type: 'textfield',
            //     },
            //     {
            //       label: 'Value',
            //       key: 'value',
            //       input: true,
            //       type: 'textfield',
            //       allowCalculateOverride: true,
            //       calculateValue: 'value = _.camelCase(row.label);',
            //       validate: {
            //         required: true
            //       }
            //     },
            //     {
            //       type: 'select',
            //       input: true,
            //       weight: 180,
            //       label: 'Shortcut',
            //       key: 'shortcut',
            //       tooltip: 'The shortcut key for this option.',
            //       dataSrc: 'custom',
            //       valueProperty: 'value',
            //       customDefaultValue: () => '',
            //       template: '{{ item.label }}',
            //       data: {
            //         custom(context) {
            //           return BuilderUtils.getAvailableShortcuts(
            //             _.get(context, 'instance.options.editForm', {}),
            //             _.get(context, 'instance.options.editComponent', {})
            //           );
            //         },
            //       },
            //     },
            //   ],
            //   conditional: {
            //     json: { '===': [{ var: 'data.dataSrc' }, 'values'] },
            //   },
            // },
            
        ],
        checkboxProperties: [
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "disabled",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "tableView",
              ignore: true,
            },
            {
              key: "autofocus",
              ignore: true
            },
            {
              key: "customClass",
              ignore: true,
            },
        ],
        selectProperties: [
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "widget",
              ignore: true,
            },
            {
              key: "widget",
              ignore: true,
            },
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "disabled",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "tableView",
              ignore: true,
            },
            {
              key: "autofocus",
              ignore: true
            },
            {
              key: "uniqueOptions",
              ignore: true
            },
            {
              weight: 20,
              type: "checkbox",
              label: "Mandatory",
              tooltip:
                "A required field must be filled in before the form can be submitted.",
              key: "validate.required",
              input: true,
            },
            {
              type: 'checkbox',
              input: true,
              key: 'inline',
              label: 'Inline Layout',
              tooltip: 'Displays the checkboxes/radios horizontally.',
              weight: 650
            }
            // {
            //   type: 'datagrid',
            //   input: true,
            //   label: 'Values',
            //   key: 'values',
            //   tooltip: 'The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form.',
            //   weight: 10,
            //   reorder: true,
            //   defaultValue: [{ label: '', value: '' }],
            //   components: [
            //     {
            //       label: 'Label',
            //       key: 'label',
            //       input: true,
            //       type: 'textfield',
            //     },
            //     {
            //       label: 'Value',
            //       key: 'value',
            //       input: true,
            //       type: 'textfield',
            //       allowCalculateOverride: true,
            //       calculateValue: 'value = _.camelCase(row.label);',
            //       validate: {
            //         required: true
            //       }
            //     },
            //     {
            //       type: 'select',
            //       input: true,
            //       weight: 180,
            //       label: 'Shortcut',
            //       key: 'shortcut',
            //       tooltip: 'The shortcut key for this option.',
            //       dataSrc: 'custom',
            //       valueProperty: 'value',
            //       customDefaultValue: () => '',
            //       template: '{{ item.label }}',
            //       data: {
            //         custom(context) {
            //           return BuilderUtils.getAvailableShortcuts(
            //             _.get(context, 'instance.options.editForm', {}),
            //             _.get(context, 'instance.options.editComponent', {})
            //           );
            //         },
            //       },
            //     },
            //   ],
            //   conditional: {
            //     json: { '===': [{ var: 'data.dataSrc' }, 'values'] },
            //   },
            // },
          
        ],
        dateTimeProperties: [
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "tableView",
              ignore: true,
            },
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "disabled",
              ignore: true,
            },
            {
              key: "autofocus",
              ignore: true
            },
            {
              key: "shortcutButtons",
              ignore: true
            }
        ],
        buttonProperties: [
              {
                key: "customClass",
                ignore: true,
              },
              {
                key: "tabindex",
                ignore: true,
              },
              {
                key: "modalEdit",
                ignore: true,
              },
              {
                key: "tableView",
                ignore: true,
              },
              {
                key: "hidden",
                ignore: true,
              },
              {
                key: "disabled",
                ignore: true,
              },
              {
                key: "disableOnInvalid",
                ignore: true,
              },
              {
                key: "saveOnEnter",
                ignore: true,
              },
              {
                key: "saveOnEnter",
                ignore: true,
              },
              {
                key: "leftIcon",
                ignore: true
              },
              {
                key: "rightIcon",
                ignore: true
              },
              {
                key: "shortcut",
                ignore: true
              }
        ],
        contentProperties: [
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "refreshOnChange",
              ignore: true,
            }
        ],
        surveyProperties: [
            {
              weight: 20,
              type: "checkbox",
              label: "Mandatory",
              tooltip:
                "A required field must be filled in before the form can be submitted.",
              key: "validate.required",
              input: true,
            },
            {
              type: 'datagrid',
              input: true,
              label: 'Questions',
              key: 'questions',
              tooltip: 'The questions you would like to ask in this survey question.',
              weight: 0,
              reorder: true,
              defaultValue: [{ label: '', value: '' }],
              components: [
                {
                  label: 'Label',
                  key: 'label',
                  input: true,
                  type: 'textfield'
                },
                {
                  label: 'Value',
                  key: 'value',
                  input: true,
                  type: 'textfield',
                  allowCalculateOverride: true,
                  calculateValue: { _camelCase: [{ var: 'row.label' }] }
                },
                {
                  label: 'Tooltip',
                  key: 'tooltip',
                  input: true,
                  type: 'textfield',
                },
              ]
            },
            {
              type: 'datagrid',
              input: true,
              label: 'Values',
              key: 'values',
              tooltip: 'The values that can be selected per question. Example: \'Satisfied\', \'Very Satisfied\', etc.',
              weight: 1,
              reorder: true,
              defaultValue: [{ label: '', value: '' }],
              components: [
                {
                  label: 'Label',
                  key: 'label',
                  input: true,
                  type: 'textfield'
                },
                {
                  label: 'Value',
                  key: 'value',
                  input: true,
                  type: 'textfield',
                  allowCalculateOverride: true,
                  calculateValue: { _camelCase: [{ var: 'row.label' }] }
                },
                {
                  label: 'Tooltip',
                  key: 'tooltip',
                  input: true,
                  type: 'textfield',
                },
              ]
            },
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "disabled",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "tableView",
              ignore: true,
            },
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "autofocus",
              ignore: true
            },
            {
              key: "hideLabel",
              ignore: true,
            },
        ],
        addressProperties: [
            {
              weight: 20,
              type: "checkbox",
              label: "Mandatory",
              tooltip:
                "A required field must be filled in before the form can be submitted.",
              key: "validate.required",
              input: true,
            },
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "disabled",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "tableView",
              ignore: true,
            },
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "autofocus",
              ignore: true
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "enableManualMode",
              ignore: true,
            },
            {
              key: "disableClearIcon",
              ignore: true,
            }
        ], 
        currencyProperties: [
            {
              weight: 20,
              type: "checkbox",
              label: "Mandatory",
              tooltip:
                "A required field must be filled in before the form can be submitted.",
              key: "validate.required",
              input: true,
            },
            {
              type: "textfield",
              label: "Default Value",
              key: "defaultValue",
              weight: 60,
              placeholder: "Default Value",
              tooltip:
                "The Default Value will be the value for this field, before user interaction. Having a default value will override the placeholder text.",
              input: true,
            },
            {
              key: "tableView",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "hideInput",
              ignore: true,
            },
            {
              key: "mask",
              ignore: true,
            },
            {
              key: "tabindex",
              ignore: true,
            },
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "autofocus",
              ignore: true
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "spellcheck",
              ignore: true,
            },
            {
              key: "disabled",
              ignore: true,
            },
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "displayMask",
              ignore: true,
            },
            {
              key: "autocomplete",
              ignore: true,
            }
        ],
        columnsProperties: [
            {
              key: "hidden",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "autoAdjust",
              ignore: true
            }
        ],
        tableProperties: [
            {
              key: "modalEdit",
              ignore: true,
            },
            {
              key: "striped",
              ignore: true,
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "condensed",
              ignore: true,
            },
            {
              key: "hover",
              ignore: true,
            },
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "cloneRows",
              ignore: true,
            }
        ],
        tabsProperties: [
            {
              key: "customClass",
              ignore: true,
            },
            {
              key: "hideLabel",
              ignore: true,
            },
            {
              key: "modalEdit",
              ignore: true,
            },
        ]
    };
    // const TextFieldProperties = [
    //     {
    //       weight: 20,
    //       type: "checkbox",
    //       label: "Mandatory",
    //       tooltip:
    //         "A required field must be filled in before the form can be submitted.",
    //       key: "validate.required",
    //       input: true,
    //     },
    //     {
    //       type: "textfield",
    //       label: "Default Value",
    //       key: "defaultValue",
    //       weight: 60,
    //       placeholder: "Default Value",
    //       tooltip:
    //         "The Default Value will be the value for this field, before user interaction. Having a default value will override the placeholder text.",
    //       input: true,
    //     },
    //     {
    //       key: "widget.type",
    //       ignore: true,
    //     },
    //     {
    //       key: "inputMask",
    //       ignore: true,
    //     },
    //     {
    //       key: "displayMask",
    //       ignore: true,
    //     },
    //     {
    //       key: "allowMultipleMasks",
    //       ignore: true,
    //     },
    //     {
    //       key: "customClass",
    //       ignore: true,
    //     },
    //     {
    //       key: "hidden",
    //       ignore: true,
    //     },
    //     {
    //       key: "hideLabel",
    //       ignore: true,
    //     },
    //     {
    //       key: "showWordCount",
    //       ignore: true,
    //     },
    //     {
    //       key: "showCharCount",
    //       ignore: true,
    //     },
    //     {
    //       key: "autofocus",
    //       ignore: true,
    //     },
    //     {
    //       key: "spellcheck",
    //       ignore: true,
    //     },
    //     {
    //       key: "disabled",
    //       ignore: true,
    //     },
    //     {
    //       key: "tableView",
    //       ignore: true,
    //     },
    //     {
    //       key: "modalEdit",
    //       ignore: true,
    //     },
    //     {
    //       key: "hideInput",
    //       ignore: true,
    //     },
    //     {
    //       key: "mask",
    //       ignore: true,
    //     },
    //     {
    //       key: "tabindex",
    //       ignore: true,
    //     },
    //     {
    //       key: "autocomplete",
    //       ignore: true,
    //     },
    //   ];
