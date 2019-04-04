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
 * @fileoverview Generating Skoolbot for logic blocks.
 * @author rodrigoq@google.com (Rodrigo Queiro)
 */
'use strict';

goog.provide('Blockly.Skoolbot.logic');

goog.require('Blockly.Skoolbot');


Blockly.Skoolbot['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '{ \"block_name\": \"controls_statement_ifStructure\", \"structure\": [{ \"block_name\": \"controls_statement_if\", \"statements\": \"', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Skoolbot.valueToCode(block, 'IF' + n,
            Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"logic_boolean_boolean\", \"value\": \"FALSE\"}';
    branchCode = Blockly.Skoolbot.statementToCode(block, 'DO' + n);

    if (n > 0) {
      code += '}, { \"block_name\": \"controls_statement_elseif\", \"statements\": \"else if\", ' + '\"condition\": ' + conditionCode + ", " + '\"branchCode\":[' + branchCode + ']';
    } else {
      code += 'if\", ' + '\"condition\": ' + conditionCode + ", " + '\"branchCode\": [' + branchCode + ']';
    }
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Skoolbot.statementToCode(block, 'ELSE') || "[]";
    code += '}, { \"block_name\": \"controls_statement_else\", \"statements\": \"else\", ' + '\"branchCode\": [' + branchCode + ']}]';
  }
  else
  {
    code += '}]';
  }
  code += '}';
  return code;
};

Blockly.Skoolbot['controls_ifelse'] = Blockly.Skoolbot['controls_if'];

Blockly.Skoolbot['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };

  var operator = OPERATORS[block.getFieldValue('OP')];
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'A',
      Blockly.Skoolbot.ORDER_ATOMIC)|| '{ \"block_name\": \"logic_null_null\", \"value\": \"NULL\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'B',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"logic_null_null\", \"value\": \"NULL\"}';
  var code = '{ \"block_name\": \"logic_boolean_compare\", \"operator\": \"'+ operator + '\", \"argument\": ['+ argument0 + ',' + argument1 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = Blockly.Skoolbot.ORDER_ATOMIC;
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'A', order) || '{ \"block_name\": \"logic_boolean_boolean\", \"value\": \"FALSE\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'B', order) || '{ \"block_name\": \"logic_boolean_boolean\", \"value\": \"FALSE\"}';
  var code = '{ \"block_name\": \"logic_boolean_logicOperation\", \"operator\": \"'+ operator + '\", \"argument\": ['+ argument0 + ',' + argument1 + ']}';
  return [code, order];
};

Blockly.Skoolbot['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'BOOL',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"logic_boolean_boolean\", \"value\": \"TRUE\"}';

  var code = '{ \"block_name\": \"logic_boolean_logicNegate\", \"operator\": \"logic_negate\", \"argument\": ['+ argument0 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var tf = (block.getFieldValue('BOOL') == 'TRUE') ? '\"TRUE\"' : '\"FALSE\"';
  var code = '{ \"block_name\": \"logic_boolean_boolean\", \"value\": ' + tf + '}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['logic_null'] = function(block) {
  // Null data type.
  return ['{ \"block_name\": \"logic_null_null\", \"value\": \"NULL\"}', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Skoolbot.valueToCode(block, 'IF',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"logic_boolean_boolean\", \"value\": \"FALSE\"}';
  var value_then = Blockly.Skoolbot.valueToCode(block, 'THEN',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"logic_null_null\", \"value\": \"NULL\"}';
  var value_else = Blockly.Skoolbot.valueToCode(block, 'ELSE',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"logic_null_null\", \"value\": \"NULL\"}';
  var code = '{ \"block_name\": \"logic_statement_logicTernary\", \"if\": ' + value_if + ', \"ifTrue\": ' + value_then + ', \"ifFalse\": ' + value_else + '}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};
