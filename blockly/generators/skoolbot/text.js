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
  // if user input }{ will be replace with },{ // look at skoolbot.js line 134
  return ['{ \"block_name\": \"text_string_text\", \"text\": \"' + code + '\" }', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var elements = [];
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Skoolbot.valueToCode(block, 'ADD' + i,
        Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"text_string_text\", \"text\": \"\'\'\" }';
  }
  var code = '{ \"block_name\": \"text_string_join\", \"functionName\": \"text_join\", \"argument\": [' + elements.join(', ') + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var value = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_ATOMIC);
  return '{ \"block_name\": \"text_string_append\", \"functionName\": \"text_append\", \"argument\": [{ \"varName\": \"'+ varName + '\"}, { \"block_name\": \"text_string_textAppend\", \"text_append\": ' + value + '}]}';
};

Blockly.Skoolbot['text_length'] = function(block) {
  // String or array length.
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_ATOMIC);
  return ['{ \"block_name\": \"text_number_length\", \"functionName\": \"text_length\", \"argument\": [' + text + ']}', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_ATOMIC);
  return ['{ \"block_name\": \"text_boolean_isEmpty\", \"functionName\": \"text_isEmpty\", \"argument\": [' + text + ']}', Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var substring = Blockly.Skoolbot.valueToCode(block, 'FIND',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var end = block.getFieldValue('END');
  var functionName = 'text_indexOf';
  var code = '{ \"block_name\": \"text_number_indexOf\", \"functionName\": \"' + functionName + '\", \"argument\": [' + text +', {\"end\": \"' + end + '\"}, { \"block_name\": \"text_string_substring\", \"substring\": ' + substring + '}]}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var atOrder = (where == 'FROM_END') ? Blockly.Skoolbot.ORDER_ATOMIC :
      Blockly.Skoolbot.ORDER_ATOMIC;
  var at = Blockly.Skoolbot.valueToCode(block, 'AT', atOrder) || '{ \"block_name\": \"math_number_number\", \"number\": \"1\"}';
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var code;
  code = '{ \"block_name\": \"text_string_chatAt\", \"functionName\": \"text_charAt\", \"argument\": [' + text + ', {\"where\": \"' + where + '\"}, {\"index\": ' + at +'}]}';

  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.Skoolbot.valueToCode(block, 'STRING',
      Blockly.Skoolbot.ORDER_ATOMIC);

  // Get start index.
  var where1 = block.getFieldValue('WHERE1');
  var at1Order = (where1 == 'FROM_END') ? Blockly.Skoolbot.ORDER_ATOMIC :
      Blockly.Skoolbot.ORDER_ATOMIC;
  var at1 = Blockly.Skoolbot.valueToCode(block, 'AT1', at1Order) || '{ \"block_name\": \"math_number_number\", \"number\": \"1\"}';

  var where2 = block.getFieldValue('WHERE2');
  var at2Order = (where2 == 'FROM_END') ? Blockly.Skoolbot.ORDER_ATOMIC :
      Blockly.Skoolbot.ORDER_NONE;
  var at2 = Blockly.Skoolbot.valueToCode(block, 'AT2', at2Order) || '{ \"block_name\": \"math_number_number\", \"number\": \"1\"}';

  var code = '{ \"block_name\": \"text_string_getSubstring\", \"functionName\": \"text_getSubstring\", \"argument\": [{ \"block_name\": \"variables_variable_variable\", \"text\": ' + text + '}, { \"start_where\": \"' + where1 +'\"}, { \"block_name\": \"text_number_startAt\", \"start_index\": ' + at1 +'}, { \"end_where\": \"' + where2 +'\"}, { \"block_name\": \"text_number_endAt\", \"end_index\": ' + at2 +'}]}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_changeCase'] = function(block) {
  // Change capitalization.
  var operator = block.getFieldValue('CASE');
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var code = '{ \"block_name\": \"text_string_join\", \"functionName\": \"text_changeCase\", \"argument\": [{ \"block_name\": \"variables_variable_variable\", \"text\": '+ text + '}, { \"block_name\": \"text_string_changeCaseType\", \"change_case_type\": \"' + operator + '\"}]}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_trim'] = function(block) {
  // Trim spaces.
  var whichside = block.getFieldValue('MODE');
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var code = '{ \"block_name\": \"text_string_trim\", \"functionName\": \"text_trim\", \"argument\": [{ \"block_name\": \"variables_variable_variable\", \"text\": ' + text + '}, { \"which_side\": \"'+ whichside +'\"}]}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_ATOMIC);
  return '{ \"block_name\": \"text_statement_print\", \"functionName\": \"text_print\", \"argument\": [' + msg + ']}';
};

Blockly.Skoolbot['text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.Skoolbot.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.Skoolbot.valueToCode(block, 'TEXT',
        Blockly.Skoolbot.ORDER_ATOMIC);
  }
  var code = '{ \"block_name\": \"text_statement_promptExt\", \"functionName\": \"text_prompt\", \"argument\": [' + msg + '] }';

  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = '{ \"block_name\": \"text_statement_promptExt\", \"functionName\": \"text_prompt\", \"argument\": [' + msg + '] }';
  }
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_prompt'] = Blockly.Skoolbot['text_prompt_ext'];

Blockly.Skoolbot['text_count'] = function(block) {
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var sub = Blockly.Skoolbot.valueToCode(block, 'SUB',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var code = '{ \"block_name\": \"text_number_count\", \"functionName\": \"text_count\", \"argument\": [' + text + ', { \"block_name\": \"text_string_substring\", \"substring\": '+ sub +'}]}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_replace'] = function(block) {
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var from = Blockly.Skoolbot.valueToCode(block, 'FROM',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var to = Blockly.Skoolbot.valueToCode(block, 'TO',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var code = '{\"block_name\": \"text_string_replace\", \"functionName\": \"text_replace\", \"argument\": [' + text + ', { \"block_name\": \"text_string_currentStr\", \" urrentStr\": '+ from +'}, { \"block_name\": \"text_string_targetStr\", \"targetStr\": '+ to +'}]}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['text_reverse'] = function(block) {
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_ATOMIC);
  var code = '{ \"block_name\": \"text_string_reverse\", \"functionName\": \"text_reverse\", \"argument\": [' + text + ']}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};
