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
  if (block.itemCount_ == 0) {
    return ['{ \"text\": \"\'\'\" }', Blockly.Skoolbot.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    var element = Blockly.Skoolbot.valueToCode(block, 'ADD0',
        Blockly.Skoolbot.ORDER_NONE) || '{ \"text\": \"\'\'\" }';
    var code = element;
    return [code, Blockly.Skoolbot.ORDER_HIGH];
  } else if (block.itemCount_ == 2) {
    var element0 = Blockly.Skoolbot.valueToCode(block, 'ADD0',
        Blockly.Skoolbot.ORDER_CONCATENATION) || '{ \"text\": \"\'\'\" }';
    var element1 = Blockly.Skoolbot.valueToCode(block, 'ADD1',
        Blockly.Skoolbot.ORDER_CONCATENATION) || '{ \"text\": \"\'\'\" }';
    var code = '{ \n\t\"functionName\": \"text_join\", \n\t\"text_list\": ['+ element0 +', ' + element1 +']\n}';
    return [code, Blockly.Skoolbot.ORDER_CONCATENATION];
  } else {
    var elements = [];
    for (var i = 0; i < block.itemCount_; i++) {
      elements[i] = Blockly.Skoolbot.valueToCode(block, 'ADD' + i,
          Blockly.Skoolbot.ORDER_NONE) || '{ \"text\": \"\'\'\" }';
    }
    var code = '{ \n\t\"functionName\": \"text_join\", \n\t\"text_list\": [' + elements.join(', ') + ']\n}';
    return [code, Blockly.Skoolbot.ORDER_HIGH];
  }
};

Blockly.Skoolbot['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var value = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_CONCATENATION) || '\'\'';
  // return varName + ' = ' + varName + ' .. ' + value + '\n';
  return '{ \n\t\"functionName\": \"text_append\", \n\t\"variable\": \"'+ varName + '\", \n\t\"value\": ' + value + '\n}';
};

Blockly.Skoolbot['text_length'] = function(block) {
  // String or array length.
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_UNARY) || '\'\'';
  return ['{ \n\t\"functionName\": \"text_length\", \n\t\"argument\": ' + text + '\n}', Blockly.Skoolbot.ORDER_UNARY];
};

Blockly.Skoolbot['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_UNARY) || '\'\'';
  return ['{ \n\t\"functionName\": \"text_isEmpty\", \n\t\"argument\": ' + text + '\n}', Blockly.Skoolbot.ORDER_RELATIONAL];
};

Blockly.Skoolbot['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var substring = Blockly.Skoolbot.valueToCode(block, 'FIND',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  if (block.getFieldValue('END') == 'FIRST') {
    // var functionName = Blockly.Skoolbot.provideFunction_(
    //     'firstIndexOf',
    //     ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ +
    //          '(str, substr) ',
    //      '  local i = string.find(str, substr, 1, true)',
    //      '  if i == nil then',
    //      '    return 0',
    //      '  else',
    //      '    return i',
    //      '  end',
    //      'end']);
    var functionName = 'firstIndexOf';
  } else {
    // var functionName = Blockly.Skoolbot.provideFunction_(
    //     'lastIndexOf',
    //     ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ +
    //          '(str, substr)',
    //      '  local i = string.find(string.reverse(str), ' +
    //          'string.reverse(substr), 1, true)',
    //      '  if i then',
    //      '    return #str + 2 - i - #substr',
    //      '  end',
    //      '  return 0',
    //      'end']);
    var functionName = 'lastIndexOf';
  }
  // var code = functionName + '(' + text + ', ' + substring + ')';
  var code = '{ \n\t\"functionName\": \"' + functionName + '\", \n\t\"variable\": \"' + text +'\",\n\t\"substring\": ' + substring + '\n}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var atOrder = (where == 'FROM_END') ? Blockly.Skoolbot.ORDER_UNARY :
      Blockly.Skoolbot.ORDER_NONE;
  var at = Blockly.Skoolbot.valueToCode(block, 'AT', atOrder) || '1';
  var text = Blockly.Skoolbot.valueToCode(block, 'VALUE',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  var code;
  if (where == 'RANDOM') {
    // var functionName = Blockly.Skoolbot.provideFunction_(
    //     'text_random_letter',
    //     ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ + '(str)',
    //      '  local index = math.random(string.len(str))',
    //      '  return string.sub(str, index, index)',
    //      'end']);
    var functionName = 'text_random_letter';
    code = '{ \n\t\"functionName\": \"' + functionName + '\", \n\t\"variable\": \"' + text + '\"\n}';
  }
  else {
    if (where == 'FIRST') {
      var index = '1';
      var order = 'fromStart';
    } else if (where == 'LAST') {
      var index = '1';
      var order = 'fromEnd';
    } else {
      if (where == 'FROM_START') {
        var order = 'fromStart';
        var index = at;
      } else if (where == 'FROM_END') {
        var order = 'fromEnd';
        var index = at;
      } else {
        throw Error('Unhandled option (text_charAt).');
      }

    }
    code = '{ \n\t\"functionName\": \"text_char_at\", \n\t\"variable\": \"' + text + '\",\n\t\"order\": \"' + order + '\",\n\t\"index\": ' + index +' \n}';
    // if (start.match(/^-?\w*$/)) {
    //   code = 'string.sub(' + text + ', ' + start + ', ' + start + ')';
    // } else {
    //   // use function to avoid reevaluation
    //   var functionName = Blockly.Skoolbot.provideFunction_(
    //       'text_char_at',
    //       ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ +
    //            '(str, index)',
    //        '  return string.sub(str, index, index)',
    //        'end']);
    //   code = functionName + '(' + text + ', ' + start + ')';
    // }
  }
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.Skoolbot.valueToCode(block, 'STRING',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';

  // Get start index.
  var where1 = block.getFieldValue('WHERE1');
  var at1Order = (where1 == 'FROM_END') ? Blockly.Skoolbot.ORDER_UNARY :
      Blockly.Skoolbot.ORDER_NONE;
  var at1 = Blockly.Skoolbot.valueToCode(block, 'AT1', at1Order) || '1';
  var jsonIndex = at1;
  jsonIndex = JSON.parse(jsonIndex) || '1';
  var index = jsonIndex.number || '1';
  if (where1 == 'FIRST') {
    var start_index = 0;
    // var start_index_order = 'fromStart';
  } else if (where1 == 'FROM_START') {
    var start_index = index - 1;
    // var start_index_order = 'fromStart';
  } else if (where1 == 'FROM_END') {
    var start_index = - index;
    // var start_index_order = 'fromEnd';
  } else {
    throw Error('Unhandled option (text_getSubstring)');
  }

  // Get end index.
  var where2 = block.getFieldValue('WHERE2');
  var at2Order = (where2 == 'FROM_END') ? Blockly.Skoolbot.ORDER_UNARY :
      Blockly.Skoolbot.ORDER_NONE;
  var at2 = Blockly.Skoolbot.valueToCode(block, 'AT2', at2Order) || '1';
  var jsonIndex = at2;
  jsonIndex = JSON.parse(jsonIndex) || '1';
  var index = jsonIndex.number || '1';
  if (where2 == 'LAST') {
    var end_index = 0;
    // var end_index_order = 'fromEnd';
  } else if (where2 == 'FROM_START') {
    var end_index = index - 1;
    // var end_index_order = 'fromStart';
  } else if (where2 == 'FROM_END') {
    var end_index = - index;
    // var end_index_order = 'fromStart';
  } else {
    throw Error('Unhandled option (text_getSubstring)');
  }
  var code = '{ \n\t\"functionName\": \"text_getSubstring\", \n\t\"variable\": \"' + text + '\",\n\t\"start_index\": ' + start_index +',\n\t\"end_index\": ' + end_index +'\n}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_changeCase'] = function(block) {
  // Change capitalization.
  var operator = block.getFieldValue('CASE');
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  if (operator == 'UPPERCASE') {
    var change_case_type = 'text_uppercase';
  } else if (operator == 'LOWERCASE') {
    var change_case_type = 'text_lowercase';
  } else if (operator == 'TITLECASE') {
    // var functionName = Blockly.Skoolbot.provideFunction_(
    //     'text_titlecase',
    //     // There are shorter versions at
    //     // http://lua-users.org/wiki/SciteTitleCase
    //     // that do not preserve whitespace.
    //     ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ + '(str)',
    //      '  local buf = {}',
    //      '  local inWord = false',
    //      '  for i = 1, #str do',
    //      '    local c = string.sub(str, i, i)',
    //      '    if inWord then',
    //      '      table.insert(buf, string.lower(c))',
    //      '      if string.find(c, "%s") then',
    //      '        inWord = false',
    //      '      end',
    //      '    else',
    //      '      table.insert(buf, string.upper(c))',
    //      '      inWord = true',
    //      '    end',
    //      '  end',
    //      '  return table.concat(buf)',
    //      'end']);
      var change_case_type = 'text_titlecase';
  }
  var code = '{ \n\t\"functionName\": \"text_changeCase\", \n\t\"text\": \"'+ text + '\", \n\t\"change_case_type\": \"' + change_case_type + '\"\n}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    LEFT: 'left',
    RIGHT: 'right',
    BOTH: 'both'
  };
  var whichside = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  var code = '{ \n\t\"functionName\": \"text_trim\", \n\t\"text\": ' + text + ',\n\t\"which_side\": \"'+ whichside +'\"\n}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  return '{ \n\t\"functionName\": \"text_print\", \n\t\"output\": ' + msg + '\n}';
};

Blockly.Skoolbot['text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.Skoolbot.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.Skoolbot.valueToCode(block, 'TEXT',
        Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  }

  // var functionName = Blockly.Skoolbot.provideFunction_(
  //     'text_prompt',
  //     ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ + '(msg)',
  //      '  io.write(msg)',
  //      '  io.flush()',
  //      '  return io.read()',
  //      'end']);
  var code = '{ \n\t\"functionName\": \"text_prompt\", \n\t\"message\": ' + msg + ' \n}';

  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    msg = '{ \n\t\t\"functionName\": \"text_toNumber\", \n\t\t\"text\": ' + msg + ' \n\ta}'
    code = '{ \n\t\"functionName\": \"text_prompt\", \n\t\"message\": ' + msg + ' \n}';
  }
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_prompt'] = Blockly.Skoolbot['text_prompt_ext'];

Blockly.Skoolbot['text_count'] = function(block) {
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  var sub = Blockly.Skoolbot.valueToCode(block, 'SUB',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  // var functionName = Blockly.Skoolbot.provideFunction_(
  //     'text_count',
  //     ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_
  //       + '(haystack, needle)',
  //       '  if #needle == 0 then',
  //       '    return #haystack + 1',
  //       '  end',
  //       '  local i = 1',
  //       '  local count = 0',
  //       '  while true do',
  //       '    i = string.find(haystack, needle, i, true)',
  //       '    if i == nil then',
  //       '      break',
  //       '    end',
  //       '    count = count + 1',
  //       '    i = i + #needle',
  //       '  end',
  //       '  return count',
  //       'end',
  //     ]);
  // var code = functionName + '(' + text + ', ' + sub + ')';
  var code = '{ \n\t\"functionName\": \"text_count\", \n\t\"text\": ' + text + ',\n\t\"sub\": '+ sub +' \n}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_replace'] = function(block) {
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  var from = Blockly.Skoolbot.valueToCode(block, 'FROM',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  var to = Blockly.Skoolbot.valueToCode(block, 'TO',
      Blockly.Skoolbot.ORDER_NONE) || '\'\'';
  // var functionName = Blockly.Skoolbot.provideFunction_(
  //     'text_replace',
  //     ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_
  //       + '(haystack, needle, replacement)',
  //       '  local buf = {}',
  //       '  local i = 1',
  //       '  while i <= #haystack do',
  //       '    if string.sub(haystack, i, i + #needle - 1) == needle then',
  //       '      for j = 1, #replacement do',
  //       '        table.insert(buf, string.sub(replacement, j, j))',
  //       '      end',
  //       '      i = i + #needle',
  //       '    else',
  //       '      table.insert(buf, string.sub(haystack, i, i))',
  //       '      i = i + 1',
  //       '    end',
  //       '  end',
  //       '  return table.concat(buf)',
  //       'end',
  //     ]);
  // var code = functionName + '(' + text + ', ' + from + ', ' + to + ')';
  var code = '{ \n\t\"functionName\": \"text_replace\", \n\t\"text\": ' + text + ',\n\t\"from\": '+ from +',\n\t\"to\": '+ to +' \n}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['text_reverse'] = function(block) {
  var text = Blockly.Skoolbot.valueToCode(block, 'TEXT',
      Blockly.Skoolbot.ORDER_HIGH) || '\'\'';
  var code = 'string.reverse(' + text + ')';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};
