/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2018 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Skoolbot for dynamic variable blocks.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.Skoolbot.inputOutput');

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
  //var variable_var = Blockly.Skoolbot.variableDB_.getName(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE);
  //var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble Skoolbot into code variable.
  var code = 'hello';
  return code;
};

Blockly.Skoolbot['delay'] = function(block) {
  var value_name = Blockly.Skoolbot.valueToCode(block, 'NAME', Blockly.Skoolbot.ORDER_ATOMIC);
  // TODO: Assemble Skoolbot into code variable.
  var code = '...\n';
  return code;
};
