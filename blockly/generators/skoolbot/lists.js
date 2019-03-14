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
 * @fileoverview Generating Skoolbot for list blocks.
 * @author rodrigoq@google.com (Rodrigo Queiro)
 */
'use strict';

goog.provide('Blockly.Skoolbot.lists');

goog.require('Blockly.Skoolbot');


Blockly.Skoolbot['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['{ \"functionName\": \"lists_create_empty\" }', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Skoolbot.valueToCode(block, 'ADD' + i,
        Blockly.Skoolbot.ORDER_NONE) || '{}';
  }
  var code = '{ \"functionName\": \"lists_create_with\", \"argument\": ['  + elements.join(', ') + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  var element = Blockly.Skoolbot.valueToCode(block, 'ITEM',
      Blockly.Skoolbot.ORDER_NONE) || '{}';
  var repeatCount = Blockly.Skoolbot.valueToCode(block, 'NUM',
      Blockly.Skoolbot.ORDER_NONE) || '0';
  var code = '{ \"functionName\": \"lists_repeat\", \"argument\": [{ \"element\": '  + element + '}, { \"repeat_count\": ' + repeatCount + '}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['lists_length'] = function(block) {
  // String or array length.
  var list = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_UNARY) || '[]';
  var code = '{ \"functionName\": \"lists_length\", \"argument\": [{ \"list\": ' + list + '}]}';
  return [code, Blockly.Skoolbot.ORDER_UNARY];
};

Blockly.Skoolbot['lists_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var list = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_UNARY) || '[]';
  var code = '{ \"functionName\": \"lists_isEmpty\", \"argument\": [{ \"list\": ' + list + '}]}';
  return [code, Blockly.Skoolbot.ORDER_RELATIONAL];
};

Blockly.Skoolbot['lists_indexOf'] = function(block) {
  // Find an item in the list.
  var item = Blockly.Skoolbot.valueToCode(block, 'FIND',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  var list = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_NONE) || '[]';
  var code = '{ \"functionName\": \"lists_indexOf\", \"argument\": [{ \"list\": ' + list + '},{ \"target\": ' + item + '}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['lists_getIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.Skoolbot.valueToCode(block, 'AT',
      Blockly.Skoolbot.ORDER_ADDITIVE) || '{ \"number\": \"1\"}';
  var list = Blockly.Skoolbot.valueToCode(block, 'VALUE', Blockly.Skoolbot.ORDER_HIGH) || '[]';
  if (where == 'RANDOM'){
     var code = '{ \"functionName\": \"lists_getIndex\", \"argument\": [{ \"list\": ' + list + '}, {\"mode\": \"' + mode + '\"}, { \"where\": \"' + where + '\"}]}';
  }
  else {
     var code = '{ \"functionName\": \"lists_getIndex\", \"argument\": [{ \"list\": ' + list + '}, {\"mode\": \"' + mode + '\"}, { \"where\": \"' + where + '\"}, { \"index\": ' + at + '}]}';
  }
  return code;
};

Blockly.Skoolbot['lists_setIndex'] = function(block) {
  // Set element at index.
  // Note: Until February 2013 this block did not have MODE or WHERE inputs.
  var list = Blockly.Skoolbot.valueToCode(block, 'LIST',
      Blockly.Skoolbot.ORDER_HIGH) || '[]';
  var mode = block.getFieldValue('MODE') || 'SET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.Skoolbot.valueToCode(block, 'AT',
      Blockly.Skoolbot.ORDER_ADDITIVE) || '{ \"number\": \"1\"}';
  var value = Blockly.Skoolbot.valueToCode(block, 'TO',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';

  var code = '{ \"functionName\": \"lists_setIndex\", \"argument\": [{ \"list\": ' + list + '}, {\"mode\": \"' + mode + '\"}, { \"where\": \"' + where + '\"}, { \"index\": \"' + at + '\"}, {\"value\": ' + value + '}]}';
  return code;
};

Blockly.Skoolbot['lists_getSublist'] = function(block) {
  // Get sublist.
  var list = Blockly.Skoolbot.valueToCode(block, 'LIST',
      Blockly.Skoolbot.ORDER_NONE) || '[]';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var at1 = Blockly.Skoolbot.valueToCode(block, 'AT1',
      Blockly.Skoolbot.ORDER_NONE) || '{ \"number\": \"1\"}';
  var at2 = Blockly.Skoolbot.valueToCode(block, 'AT2',
      Blockly.Skoolbot.ORDER_NONE) || '{ \"number\": \"1\"}';

  var code = '{ \"functionName\": \"lists_getSublist\", \"argument\": [{ \"list\": ' + list + '}, {\"start_where\": \"' + where1 +'\"}, {\"start_index\": ' + at1 +'}, {\"end_where\": \"' + where2 +'\"}, {\"end_index\": ' + at2 +'}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['lists_sort'] = function(block) {
  // Block for sorting a list.
  var list = Blockly.Skoolbot.valueToCode(
      block, 'LIST', Blockly.Skoolbot.ORDER_NONE) || '[]';
  var direction = block.getFieldValue('DIRECTION') === '1' ? 1 : -1;
  var type = block.getFieldValue('TYPE');

  var code = '{ \"functionName\": \"lists_sort\", \"argument\": [{ \"list\": ' + list + '}, {\"direction\": \"' + direction + '\"}, { \"type\": \"' + type + '\"}]}';

  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['lists_split'] = function(block) {
  // Block for splitting text into a list, or joining a list into text.
  var input = Blockly.Skoolbot.valueToCode(block, 'INPUT',
      Blockly.Skoolbot.ORDER_NONE)||'[]';
  var delimiter = Blockly.Skoolbot.valueToCode(block, 'DELIM',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  var mode = block.getFieldValue('MODE');

  var code = '{ \"functionName\": \"lists_split\", \"argument\": [{ \"list\": ' + input + '}, {\"mode\": \"' + mode + '\"}, { \"delimiter\": ' + delimiter + '}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['lists_reverse'] = function(block) {
  // Block for reversing a list.
  var list = Blockly.Skoolbot.valueToCode(block, 'LIST',
      Blockly.Skoolbot.ORDER_NONE) || '[]';
  var code = '{ \"functionName\": \"lists_reverse\", \"argument\": [{ \"list\": ' + list + '}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};
