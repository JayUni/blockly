/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2016 Google Inc.
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
 * @fileoverview Generating Skoolbot for procedure blocks.
 * @author rodrigoq@google.com (Rodrigo Queiro)
 */
'use strict';

goog.provide('Blockly.Skoolbot.procedures');

goog.require('Blockly.Skoolbot');


Blockly.Skoolbot['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Skoolbot.statementToCode(block, 'STACK');
  if (Blockly.Skoolbot.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Skoolbot.prefixLines(
        Blockly.Skoolbot.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + id + '\''), Blockly.Skoolbot.INDENT) + branch;
  }
  if (Blockly.Skoolbot.INFINITE_LOOP_TRAP) {
    branch = Blockly.Skoolbot.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Skoolbot.valueToCode(block, 'RETURN',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{\"null\": \"NULL\"}';
  if (returnValue) {
    returnValue = Blockly.Skoolbot.INDENT + returnValue;
  }

  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = '{ \"argument' + i + '\": \"' + Blockly.Skoolbot.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE) + '\"}';
  }
  var code = "";
  var description = Blockly.Skoolbot.scrub_(block, code, false);
  description = description.replace(/\n/g, " ");

  code = '{ \"block_name\": \"procedures_statement_defreturn\", \"funcName\": \"' + funcName + '\", \"description\": \"' + description + '\", \"argument\": [' + args.join(', ') + '], \"branch\": [' + branch + '], \"return_value\": ' + returnValue + '}';

  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Skoolbot.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Skoolbot['procedures_defnoreturn'] =
    Blockly.Skoolbot['procedures_defreturn'];

Blockly.Skoolbot['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Skoolbot.valueToCode(block, 'ARG' + i,
        Blockly.Skoolbot.ORDER_ATOMIC) || '{\"null\": \"NULL\"}';
  }
  var code = '{ \"block_name\": \"procedures_statement_callreturn\", \"funcName\": \"' + funcName + '\", \"argument\": [' + args.join(', ') + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Skoolbot.valueToCode(block, 'ARG' + i,
        Blockly.Skoolbot.ORDER_ATOMIC);
  }
  var code = '{ \"block_name\": \"procedures_statement_callnoreturn\", \"funcName\": \"' + funcName + '\", \"argument\": [' + args.join(', ') + ']}';
  return code;
};

Blockly.Skoolbot['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Skoolbot.valueToCode(block, 'CONDITION',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"boolean\": \"FALSE\"}';
  var value = Blockly.Skoolbot.valueToCode(block, 'VALUE',
        Blockly.Skoolbot.ORDER_ATOMIC) || '{\"null\": \"NULL\"}';
  if (block.hasReturnValue_) {

  var code = '{ \"block_name\": \"procedures_statement_ifreturn\", \"condition\": ' + condition + ', \"has_return_value\": { \"boolean\": \"TRUE\"}, \"return\":  [' + value + ']}';
  } else {
  var code = '{ \"block_name\": \"procedures_statement_ifreturn\", \"condition\": ' + condition + ', \"has_return_value\": { \"boolean\": \"FALSE\"}, \"return\":  [' + value + ']}';
  }
  return code;
};
