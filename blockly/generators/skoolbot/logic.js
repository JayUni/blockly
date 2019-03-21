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
  var code = '{\"controls_type\": \"controls_if\", \"structure\": [{\"statement\": \"', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Skoolbot.valueToCode(block, 'IF' + n,
    Blockly.Skoolbot.ORDER_ATOMIC) || "[]";
    branchCode = Blockly.Skoolbot.statementToCode(block, 'DO' + n) || "[]";

    if (n > 0) {
      code += '}, {\"statement\": \"else if\", ' + '\"condition\": ' + conditionCode + ", " + '\"branchCode\":' + branchCode;
    } else {
      code += 'if\", ' + '\"condition\": ' + conditionCode + ", " + '\"branchCode\": [' + branchCode + ']';
    }
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {

    branchCode = Blockly.Skoolbot.statementToCode(block, 'ELSE') || "[]";
    code += '}, {\"statement\": \"else\", ' + '\"branchCode\":' + branchCode + '}]';
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
      Blockly.Skoolbot.ORDER_ATOMIC) || "\"\"";
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'B',
      Blockly.Skoolbot.ORDER_ATOMIC) || "\"\"";
  var code = '{ \"operator\": \"'+ operator + '\", \"argument\": ['+ argument0 + ',' + argument1 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = Blockly.Skoolbot.ORDER_ATOMIC;
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'A', order) || '{ \"boolean\": \"FALSE\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'B', order) || '{ \"boolean\": \"FALSE\"}';
  var code = '{ \"operator\": \"'+ operator + '\", \"argument\": ['+ argument0 + ',' + argument1 + ']}';
  return [code, order];
};

Blockly.Skoolbot['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'BOOL',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"boolean\": \"TRUE\"}';

  var code = '{ \"operator\": \"logic_negate\", \"argument\": ['+ argument0 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var tf = (block.getFieldValue('BOOL') == 'TRUE') ? '\"TRUE\"' : '\"FALSE\"';
  var code = '{\"boolean\": ' + tf + '}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['logic_null'] = function(block) {
  // Null data type.
  return ['{\"null\": \"NULL\"}', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Skoolbot.valueToCode(block, 'IF',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"boolean\": \"FALSE\"}';
  var value_then = Blockly.Skoolbot.valueToCode(block, 'THEN',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{\"null\": \"NULL\"}';
  var value_else = Blockly.Skoolbot.valueToCode(block, 'ELSE',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{\"null\": \"NULL\"}';
  var code = '{\"statement\": \"logic_ternary\", \"if\": ' + value_if + ', ' + '\"ifTrue\": ' + value_then + ', \"ifFalse\": ' + value_else + '}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};
