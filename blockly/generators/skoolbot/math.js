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
  return ['{ \"number\": \"' + code + '\" }', order];
};

Blockly.Skoolbot['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    ADD: [' + ', Blockly.Skoolbot.ORDER_ATOMIC],
    MINUS: [' - ', Blockly.Skoolbot.ORDER_ATOMIC],
    MULTIPLY: [' * ', Blockly.Skoolbot.ORDER_ATOMIC],
    DIVIDE: [' / ', Blockly.Skoolbot.ORDER_ATOMIC],
    POWER: [' ^ ', Blockly.Skoolbot.ORDER_ATOMIC]
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'A', order) || '{ \"number\": \"0\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'B', order) || '{ \"number\": \"0\"}';
  var code = '{ \"operator\": \"'+ operator + '\", \"argument\": ['+ argument0 + ',' + argument1 + ']}';
  return [code, order];
};

Blockly.Skoolbot['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.Skoolbot.valueToCode(block, 'NUM',
        Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
    return ['{ \"operator\": \"' + operator + '\",\"argument\": [' + arg + ']}', Blockly.Skoolbot.ORDER_ATOMIC];
  }
  if (operator == 'POW10') {
    arg = Blockly.Skoolbot.valueToCode(block, 'NUM',
        Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
    return ['{ \"operator\": \"' + operator + '\",\"argument\": [' + arg + ']}', Blockly.Skoolbot.ORDER_ATOMIC];
  }
  if (operator == 'ROUND') {
    arg = Blockly.Skoolbot.valueToCode(block, 'NUM',
        Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  } else {
    arg = Blockly.Skoolbot.valueToCode(block, 'NUM',
        Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  }
  code = '{ \"operator\": \"' + operator + '\", \"argument\":[' + arg + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {

    PI: ['{ \"operator\": \"PI\"}', Blockly.Skoolbot.ORDER_ATOMIC],

    E: ['{ \"operator\": \"e\" }', Blockly.Skoolbot.ORDER_ATOMIC],

    GOLDEN_RATIO: ['{ \"operator\": \"/\", \"argument\":[{ \"operator\": \"\+\", '+
    '\"argument\": [{ \"number\": 1} , { \"operator\": \"math.sqrt\", \"argument\":[{ \"number\": \"5\"}, { \"number\": \"2\"}]}]}]}', Blockly.Skoolbot.ORDER_ATOMIC],

    SQRT2: ['{ \"operator\": \"math.sqrt\", \"argument\": { \"number\": 2}}', Blockly.Skoolbot.ORDER_ATOMIC],

    SQRT1_2: ['{ \"operator\": \"math.sqrt\", \"argument\": { \"number\": 0.5}}', Blockly.Skoolbot.ORDER_ATOMIC],

    INFINITY: ['{ \"operator\": \"math.huge\"}', Blockly.Skoolbot.ORDER_ATOMIC],

  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Blockly.Skoolbot['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.Skoolbot.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    code = '{ \"functionName\": \"math_isPrime\", \"argument\": [' + number_to_check + ']}';
    return [code, Blockly.Skoolbot.ORDER_ATOMIC];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = '{ \"functionName\": \"math_isEven\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'ODD':
      code = '{ \"functionName\": \"math_isOdd\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'WHOLE':
      code = '{ \"functionName\": \"math_isWhole\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'POSITIVE':
      code = '{ \"functionName\": \"math_isPositive\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'NEGATIVE':
      code = '{ \"functionName\": \"math_isNegative\", \"argument\": [' + number_to_check + ']}';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.Skoolbot.valueToCode(block, 'DIVISOR',
          Blockly.Skoolbot.ORDER_ATOMIC);
      // If 'divisor' is some code that evals to 0, Skoolbot will produce a nan.
      code = '{ \"operator\": \"math_isDivisibleBy\", \"argument\":' + '['+ number_to_check + ',' + divisor + ']}';
      break;
  }
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'DELTA',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  var varName = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // return varName + ' = ' + varName + ' + ' + argument0 + '\n';
  return '{ \"functionName\": \"math_change\", \"varName\": \"' + varName + '\", \"argument\": [' + argument0 + ']}';
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
  return ['{ \"functionName\": \"'+ functionName + '\", \"argument\": ['  + list + ']}', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'DIVIDEND',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'DIVISOR',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  var code = '{ \"operator\": \"%\", \"argument\":' + '['+ argument0 + ',' + argument1 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'LOW',
      Blockly.Skoolbot.ORDER_ATOMIC) || '-math.huge';
  var argument2 = Blockly.Skoolbot.valueToCode(block, 'HIGH',
      Blockly.Skoolbot.ORDER_ATOMIC) || 'math.huge';
  var code = '{ \"operator\": \"math_constrain\", \"argument\":' + '['+ argument0 + ', ' + argument1 + ', ' + argument2 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'FROM',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'TO',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  var code = '{ \"functionName\": \"math_random_int\", \"argument\": [' + argument0 + ', ' + argument1 + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  return ['{ \"functionName\": \"math_random_float\"}', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['math_atan2'] = function(block) {
  // Arctangent of point (X, Y) in degrees from -180 to 180.
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'X',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  var argument1 = Blockly.Skoolbot.valueToCode(block, 'Y',
      Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"number\": \"0\"}';
  return ['{ \"operator\": \"math_atan2\"' + ',\"argument\":[' + argument0 + ',' + argument1 + ']}',
      Blockly.Skoolbot.ORDER_ATOMIC];
};
