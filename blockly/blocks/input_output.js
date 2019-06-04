'use strict';

goog.provide('Blockly.Blocks.input_output');  // Deprecated
goog.provide('Blockly.Constants.Input_output');  // deprecated, 2018 April 5

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.Input_output.HUE = 200;

Blockly.defineBlocksWithJsonArray([ // BEGIN JSON EXTRACT
  {
  "type": "digitalread",
  "message0": "digital read pin: %1",
  "args0": [
    {
      "type": "field_variable",
      "name": "var",
      "variable": "item"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": 200,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "digitalwrite",
  "message0": "digital write - pin: %1 , value:  %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "var",
      "variable": "item"
    },
    {
      "type": "field_dropdown",
      "name": "value",
      "options": [
        [
          "HIGH",
          "HIGH"
        ],
        [
          "LOW",
          "LOW"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 200,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "analogread",
  "message0": "analog read pin: %1",
  "args0": [
    {
      "type": "field_variable",
      "name": "var",
      "variable": "item"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 200,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "analogwrite",
  "message0": "analog write - pin: %1 , value:  %2 %3",
  "args0": [
    {
      "type": "field_variable",
      "name": "var",
      "variable": "item"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "value",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 200,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pinmode",
  "message0": "pin mode - set %1 to be %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "var",
      "variable": "item"
    },
    {
      "type": "field_dropdown",
      "name": "IO",
      "options": [
        [
          "INPUT",
          "INPUT"
        ],
        [
          "OUTPUT",
          "OUTPUT"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 200,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "delay",
  "message0": "delay  %1 milliseconds",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 200,
  "tooltip": "",
  "helpUrl": ""
}]);// END JSON EXTRACT (Do not delete this comment.)
