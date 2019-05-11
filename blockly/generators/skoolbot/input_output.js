'use strict';

goog.provide('Blockly.Skoolbot.input_output');

goog.require('Blockly.Skoolbot');

Blockly.Skoolbot['digitalread'] = function(block) {
  var variable_name = Blockly.Skoolbot.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Skoolbot into code variable.
  var code = code = 'hello';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['digitalwrite'] = function(block) {
  var variable_var = Blockly.Skoolbot.variableDB_.getName(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE);
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble Skoolbot into code variable.
  var code = '...\n';
  return code;
};

Blockly.Skoolbot['analogread'] = function(block) {
  var variable_name = Blockly.Skoolbot.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Skoolbot into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['analogwrite'] = function(block) {
  var variable_var = Blockly.Skoolbot.variableDB_.getName(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE);
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble Skoolbot into code variable.
  var code = '...\n';
  return code;
};

Blockly.Skoolbot['pinmode'] = function(block) {
  var variable_var = Blockly.Skoolbot.variableDB_.getName(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE);
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble Skoolbot into code variable.
  var code = '...\n';
  return code;
};

Blockly.Skoolbot['delay'] = function(block) {
  var value_name = Blockly.Skoolbot.valueToCode(block, 'NAME', Blockly.Skoolbot.ORDER_ATOMIC);
  // TODO: Assemble Skoolbot into code variable.
  var code = '...\n';
  return code;
};
