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
 * @fileoverview Generating Skoolbot for text blocks.
 * @author rodrigoq@google.com (Rodrigo Queiro)
 */
'use strict';

goog.provide('Blockly.Skoolbot.texts');

goog.require('Blockly.Skoolbot');


Blockly.Skoolbot['text'] = function(block) {
  // Text value.
  var code = Blockly.Skoolbot.quote_(block.getFieldValue('TEXT'));
  return ['{ \"text\": \"' + code + '\" }', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var elements = [];
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Skoolbot.valueToCode(block, 'ADD' + i,
        Blockly.Skoolbot.ORDER_NONE) || '{ \"text\": \"\'\'\" }';
  }
  var code = '{ \"functionName\": \"text_join\", \"text_element_list\": [' + elements.join(', ') + ']}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var value = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_CONCATENATION) || '\'\'';
  return '{ \"functionName\": \"text_append\", \"argument\": [{\"varName\": \"'+ varName + '\"}, {\"text_append\": ' + value + '}]}';
};

Blockly.Skoolbot['text_length'] = function(block) {
  // String or array length.
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_UNARY) || '\'\'';
  return ['{ \"functionName\": \"text_length\", \"argument\": [{\"varName\": ' + text + '}]}', Blockly.Skoolbot.ORDER_UNARY];
};

Blockly.Skoolbot['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_UNARY) || '\'\'';
  return ['{ \"functionName\": \"text_isEmpty\", \"argument\": [{\"varName\": ' + text + '}]}', Blockly.Skoolbot.ORDER_RELATIONAL];
};

Blockly.Skoolbot['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var substring = Blockly.Skoolbot.valueToCode(block, 'FIND',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  var end = block.getFieldValue('END');
  var functionName = 'text_indexOf';
  var code = '{ \"functionName\": \"' + functionName + '\", \"argument\": [' + text +', {\"end\": \"' + end + '\"}, {\"substring\": ' + substring + '}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var atOrder = (where == 'FROM_END') ? Blockly.Skoolbot.ORDER_UNARY :
      Blockly.Skoolbot.ORDER_NONE;
  var at = Blockly.Skoolbot.valueToCode(block, 'AT', atOrder) || '{ \"number\": \"1\"}';
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  var code;
  code = '{ \"functionName\": \"text_charAt\", \"argument\": [{\"varName\": ' + text + '}, {\"where\": \"' + where + '\"}, {\"index\": ' + at +'}]}';

  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.Skoolbot.valueToCode(block, 'STRING',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';

  // Get start index.
  var where1 = block.getFieldValue('WHERE1');
  var at1Order = (where1 == 'FROM_END') ? Blockly.Skoolbot.ORDER_UNARY :
      Blockly.Skoolbot.ORDER_NONE;
  var at1 = Blockly.Skoolbot.valueToCode(block, 'AT1', at1Order) || '{ \"number\": \"1\"}';

  var where2 = block.getFieldValue('WHERE2');
  var at2Order = (where2 == 'FROM_END') ? Blockly.Skoolbot.ORDER_UNARY :
      Blockly.Skoolbot.ORDER_NONE;
  var at2 = Blockly.Skoolbot.valueToCode(block, 'AT2', at2Order) || '{ \"number\": \"1\"}';

  var code = '{ \"functionName\": \"text_getSubstring\", \"argument\": [{\"varName\": ' + text + '}, {\"start_where\": \"' + where1 +'\"}, {\"start_index\": ' + at1 +'}, {\"end_where\": \"' + where2 +'\"}, {\"end_index\": ' + at2 +'}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_changeCase'] = function(block) {
  // Change capitalization.
  var operator = block.getFieldValue('CASE');
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  var code = '{ \"functionName\": \"text_changeCase\", \"argument\": [{\"varName\": '+ text + '}, {\"change_case_type\": \"' + operator + '\"}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_trim'] = function(block) {
  // Trim spaces.
  var whichside = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  var code = '{ \"functionName\": \"text_trim\", \"argument\": [{\"varName\": ' + text + '}, {\"which_side\": \"'+ whichside +'\"}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  return '{ \"functionName\": \"text_print\", \"argument\": [' + msg + ']}';
};

Blockly.Skoolbot['text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.Skoolbot.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.Skoolbot.valueToCode(block, 'TEXT',
        Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  }
  var code = '{ \"functionName\": \"text_prompt\", \"argument\": [' + msg + '] }';

  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    msg = '{ \"functionName\": \"text_toNumber\", \"argument\": [' + msg + '] }'
    code = '{ \"functionName\": \"text_prompt\", \"argument\": [' + msg + '] }';
  }
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_prompt'] = Blockly.Skoolbot['text_prompt_ext'];

Blockly.Skoolbot['text_count'] = function(block) {
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  var sub = Blockly.Skoolbot.valueToCode(block, 'SUB',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  var code = '{ \"functionName\": \"text_count\", \"argument\": [' + text + ', {\"substring\": '+ sub +'}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_replace'] = function(block) {
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  var from = Blockly.Skoolbot.valueToCode(block, 'FROM',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  var to = Blockly.Skoolbot.valueToCode(block, 'TO',
      Blockly.Skoolbot.ORDER_NONE) || '\"\'\'\"';
  var code = '{ \"functionName\": \"text_replace\", \"argument\": [' + text + ', {\"from(current)\": '+ from +'}, {\"to(target)\": '+ to +'}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_reverse'] = function(block) {
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_HIGH) || '\"\'\'\"';
  var code = '{ \"functionName\": \"text_reverse\", \"argument\": [' + text + ']}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};
