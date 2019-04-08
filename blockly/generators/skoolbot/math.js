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
 * @fileoverview Generating Skoolbot for math blocks.
 * @author rodrigoq@google.com (Rodrigo Queiro)
 */
'use strict';

goog.provide('Blockly.Skoolbot.math');

goog.require('Blockly.Skoolbot');


Blockly.Skoolbot['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code < 0 ? Blockly.Skoolbot.ORDER_ATOMIC :
              Blockly.Skoolbot.ORDER_ATOMIC;
  return ['{ \"block_name\": \"math_number_number\", \"number\": \"' + code + '\" }', order];
};

Blockly.Skoolbot['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    ADD: [' add ', Blockly.Skoolbot.ORDER_ATOMIC],
    MINUS: [' sub ', Blockly.Skoolbot.ORDER_ATOMIC],
    MULTIPLY: [' mul ', Blockly.Skoolbot.ORDER_ATOMIC],
    DIVIDE: [' div ', Blockly.Skoolbot.ORDER_ATOMIC],
    POWER: [' pow ', Blockly.Skoolbot.ORDER_ATOMIC]
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'A', order) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'B', order) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  var code = '{ \"block_name\": \"math_arithmetic_operator\", \"operator\": \"'+ operator + '\", \"argument\": ['+ argument0 + ',' + argument1 + ']}';
  return [code, order];
};

// Blockly.Skoolbot['math_single'] = function(block) {
//   // Math operators with single operand.
//   var operator = block.getFieldValue('OP');
//   var code;
//   var arg;
//   if (operator == 'NEG') {
//     // Negation is a special case given its different operator precedence.
//     arg = Blockly.Skoolbot.valueToCode(block, 'NUM',
//         Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
//     return ['{ \"block_name\": \"math_number_single\", \"operator\": \"' + operator + '\",\"argument\": [' + arg + ']}', Blockly.Skoolbot.ORDER_ATOMIC];
//   }
//   if (operator == 'POW10') {
//     arg = Blockly.Skoolbot.valueToCode(block, 'NUM',
//         Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
//     return ['{ \"block_name\": \"math_number_single\", \"operator\": \"' + operator + '\",\"argument\": [' + arg + ']}', Blockly.Skoolbot.ORDER_ATOMIC];
//   }
//   if (operator == 'ROUND') {
//     arg = Blockly.Skoolbot.valueToCode(block, 'NUM',
//         Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
//   } else {
//     arg = Blockly.Skoolbot.valueToCode(block, 'NUM',
//         Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
//   }
//   code = '{ \"block_name\": \"math_number_single\", \"operator\": \"' + operator + '\", \"argument\":[' + arg + ']}';
//   return [code, Blockly.Skoolbot.ORDER_ATOMIC];
// };

Blockly.Skoolbot['math_single'] = function(block) {
  // Math operators with single operand.
  var OPERATORS = {
      ABS: 'abs',
      EXP: 'exp',
      LN: 'ln',
      LOG10: 'log10',
      NEG: 'neg',
      POW10: 'pow10',
      ROOT: 'sqrt',
      ROUND: 'round',
      SIN: 'sin',
      COS: 'cos',
      TAN: 'tan',
      ASIN: 'asin',
      ACOS: 'acos',
      ATAN: 'atan'
  };

  var operator = OPERATORS[block.getFieldValue('OP')];
  var code;
  var arg;
  arg = Blockly.Skoolbot.valueToCode(block, 'NUM', Blockly.Skoolbot.ORDER_ATOMIC);
  code = '{ \"block_name\": \"math_number_operator_single\", \"operator\": \"' + operator + '\", \"argument\":[' + arg + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {

    PI: ['{ \"block_name\": \"math_number_number_constant\", \"number\": \"PI\"}', Blockly.Skoolbot.ORDER_ATOMIC],

    E: ['{ \"block_name\": \"math_number_number_constant\", \"number\": \"e\" }', Blockly.Skoolbot.ORDER_ATOMIC],

    GOLDEN_RATIO: ['{ \"block_name\": \"math_arithmetic_operator\", \"operator\": \"div\", \"argument\":[{ \"block_name\": \"math_arithmetic_operator\", \"operator\": \"add\", \"argument\": [{ \"block_name\": \"math_number_number\", \"number\": \"1\"} , { \"block_name\": \"math_number_operator\", \"operator\": \"sqrt\", \"argument\":[{ \"block_name\": \"math_number_number\", \"number\": \"5\"}]}]}, { \"block_name\": \"math_number_number\", \"number\": \"2\"}]}', Blockly.Skoolbot.ORDER_ATOMIC],

    SQRT2: ['{ \"block_name\": \"math_arithmetic_operator\", \"operator\": \"sqrt\", \"argument\": [{ \"block_name\": \"math_number_number\", \"number\": 2}]}', Blockly.Skoolbot.ORDER_ATOMIC],

    SQRT1_2: ['{ \"block_name\": \"math_arithmetic_operator\", \"operator\": \"sqrt\", \"argument\": [{ \"block_name\": \"math_number_number\", \"number\": 0.5}]}', Blockly.Skoolbot.ORDER_ATOMIC],

    INFINITY: ['{ \"block_name\": \"math_number_number_constant\", \"number\": \"INFINITY\"}', Blockly.Skoolbot.ORDER_ATOMIC],

  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Blockly.Skoolbot['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.Skoolbot.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    code = '{ \"block_name\": \"math_boolean_numberProperty\", \"functionName\": \"isPrime\", \"argument\": [' + number_to_check + ']}';
    return [code, Blockly.Skoolbot.ORDER_ATOMIC];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = '{ \"block_name\": \"math_boolean_numberProperty\", \"functionName\": \"isEven\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'ODD':
      code = '{ \"block_name\": \"math_boolean_numberProperty\", \"functionName\": \"isOdd\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'WHOLE':
      code = '{ \"block_name\": \"math_boolean_numberProperty\", \"functionName\": \"isWhole\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'POSITIVE':
      code = '{ \"block_name\": \"math_boolean_numberProperty\", \"functionName\": \"isPositive\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'NEGATIVE':
      code = '{ \"block_name\": \"math_boolean_umberProperty\", \"functionName\": \"isNegative\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.Skoolbot.valueToCode(block, 'DIVISOR',
          Blockly.Skoolbot.ORDER_ATOMIC);
      // If 'divisor' is some code that evals to 0, Skoolbot will produce a nan.
      code = '{ \"block_name\": \"math_boolean_numberProperty\", \"functionName\": \"isDivisibleBy\", \"argument\":' + '['+ number_to_check + ',' + divisor + ']}';
      break;
  }
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'DELTA',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  var varName = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // return varName + ' = ' + varName + ' + ' + argument0 + '\n';
  return '{ \"block_name\": \"math_statement_function_change\", \"functionName\": \"change\", \"varName\": \"' + varName + '\", \"argument\": [' + argument0 + ']}';
};

// Rounding functions have a single operand.
Blockly.Skoolbot['math_round'] = Blockly.Skoolbot['math_single'];
// Trigonometry functions have a single operand.
Blockly.Skoolbot['math_trig'] = Blockly.Skoolbot['math_single'];

Blockly.Skoolbot['math_on_list'] = function(block) {
  // Math functions for lists.
  var functionName = block.getFieldValue('OP');
  var list = Blockly.Skoolbot.valueToCode(block, 'LIST',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{}';
  return ['{ \"block_name\": \"math_statement_function_onList\", \"functionName\": \"'+ functionName + '\", \"argument\": ['  + list + ']}', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'DIVIDEND',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'DIVISOR',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  var code = '{ \"block_name\": \"math_number_operator_modulo\", \"operator\": \"%\", \"argument\":' + '['+ argument0 + ',' + argument1 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'LOW',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var argument2 = Blockly.Skoolbot.valueToCode(block, 'HIGH',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var code = '{ \"block_name\": \"math_number_operator_constrain\", \"operator\": \"constrain\", \"argument\":' + '['+ argument0 + ', ' + argument1 + ', ' + argument2 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'FROM',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'TO',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  var code = '{ \"block_name\": \"math_number_function_randomInt\", \"functionName\": \"randomInt\", \"argument\": [' + argument0 + ', ' + argument1 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  return ['{ \"block_name\": \"math_number_function_randomFloat\", \"number\": \"randomFloat\"}', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_atan2'] = function(block) {
  // Arctangent of point (X, Y) in degrees from -180 to 180.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'X',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'Y',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"math_number_number\", \"number\": \"0\"}';
  return ['{ \"block_name\": \"math_number_operator_atan2\", \"operator\": \"atan2\"' + ',\"argument\":[' + argument0 + ',' + argument1 + ']}',
      Blockly.Skoolbot.ORDER_ATOMIC];
};
