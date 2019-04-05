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
 * @fileoverview Generating Skoolbot for loop blocks.
 * @author rodrigoq@google.com (Rodrigo Queiro)
 */
'use strict';

goog.provide('Blockly.Skoolbot.loops');

goog.require('Blockly.Skoolbot');


/**
 * This is the text used to implement a <pre>continue</pre>.
 * It is also used to recognise <pre>continue</pre>s in generated code so that
 * the appropriate label can be put at the end of the loop body.
 * @const {string}
 */
Blockly.Skoolbot.CONTINUE_STATEMENT = 'goto continue\n';

/**
 * If the loop body contains a "goto continue" statement, add a continue label
 * to the loop body. Slightly inefficient, as continue labels will be generated
 * in all outer loops, but this is safer than duplicating the logic of
 * blockToCode.
 *
 * @param {string} branch Generated code of the loop body
 * @return {string} Generated label or '' if unnecessary
 */
Blockly.Skoolbot.addContinueLabel = function(branch) {
  if (branch.indexOf(Blockly.Skoolbot.CONTINUE_STATEMENT) > -1) {
    return branch + Blockly.Skoolbot.INDENT + '::continue::\n';
  } else {
    return branch;
  }
};

Blockly.Skoolbot['controls_repeat'] = function(block) {
  // Repeat n times (internal number).
  var repeats = parseInt(block.getFieldValue('TIMES'), 10);
  var branch = Blockly.Skoolbot.statementToCode(block, 'DO');
  branch = Blockly.Skoolbot.addContinueLabel(branch)||"";
  // var loopVar = Blockly.Skoolbot.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  // var code = 'for ' + loopVar + ' = 1, ' + repeats + ' do\n' + branch + 'end\n';
  var code = '{ \"block_name\": \"controls_statement_repeat\", \"loop_style\": \"controls_repeat\", \"repeat_times\": '+ repeats + ', \"branch\": ['+ branch + ']}';
  return code;
};

Blockly.Skoolbot['controls_repeat_ext'] = function(block) {
  // Repeat n times (external number).
  var repeats = Blockly.Skoolbot.valueToCode(block, 'TIMES',
      Blockly.Skoolbot.ORDER_ATOMIC) || "";
  if (Blockly.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = '{ \"block_name\": \"controls_statement_repeatExt\", \"operator\": \"math.floor\", \"argument\": '+ repeats + '}';
  }
  var branch = Blockly.Skoolbot.statementToCode(block, 'DO');
  branch = Blockly.Skoolbot.addContinueLabel(branch)||"";
  // var loopVar = Blockly.Skoolbot.variableDB_.getDistinctName(
  //     'count', Blockly.Variables.NAME_TYPE);
  // var code = 'for ' + loopVar + ' = 1, ' + repeats + ' do\n' + branch + 'end\n';
  var code = '{ \"block_name\": \"controls_statement_repeat\", \"loop_style\": \"controls_repeat_ext\", \"repeat_times\": '+ repeats + ', \"branch\": ['+ branch + ']}';
  return code;
};

Blockly.Skoolbot['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'BOOL',
       Blockly.Skoolbot.ORDER_ATOMIC) || '{ \"block_name\": \"logic_boolean_boolean\", \"value\": \"FALSE\"}';
  var branch = Blockly.Skoolbot.statementToCode(block, 'DO');
  branch = Blockly.Skoolbot.addLoopTrap(branch, block.id);
  branch = Blockly.Skoolbot.addContinueLabel(branch) || "";
  if (until) {
    var endType = '\"until\"';
  }
  else{
    var endType = '\"while\"';
  }
  var code = '{ \"block_name\": \"controls_statement_whileUntil\", \"loop_style\": \"controls_whileUntil\",\"repeat_condition\": '+ argument0 + ',\"end_type\": '+ endType + ',\"branch\": ['+ branch + ']}';

  return code;
};

Blockly.Skoolbot['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var startVar = Blockly.Skoolbot.valueToCode(block, 'FROM',
      Blockly.Skoolbot.ORDER_ATOMIC) || '0';
  var endVar = Blockly.Skoolbot.valueToCode(block, 'TO',
      Blockly.Skoolbot.ORDER_ATOMIC) || '0';
  var increment = Blockly.Skoolbot.valueToCode(block, 'BY',
      Blockly.Skoolbot.ORDER_ATOMIC) || '1';
  var branch = Blockly.Skoolbot.statementToCode(block, 'DO');
  branch = Blockly.Skoolbot.addLoopTrap(branch, block.id);
  branch = Blockly.Skoolbot.addContinueLabel(branch) || "";
  var code = '{ \"block_name\": \"controls_statement_for\", \"loop_style\": \"controls_for\"'+', \"variable\": \"' + variable0 + '\", \"start\": '+ startVar +', \"end\": ' + endVar + ', \"step\": ' + increment +', \"branch\": [' + branch + ']}';
  return code;
};

Blockly.Skoolbot['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Skoolbot.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Skoolbot.valueToCode(block, 'LIST',
      Blockly.Skoolbot.ORDER_ATOMIC) || '[]';
  var branch = Blockly.Skoolbot.statementToCode(block, 'DO');
  branch = Blockly.Skoolbot.addContinueLabel(branch)|| "";

  var code = '{ \"block_name\": \"controls_statement_forEach\", \"loop_style\": \"controls_forEach\", \"varName\": \"'+ variable0 + '\", \"list\": '+ argument0 + ', \"branch\": ['+ branch + ']}';
  return code;
};

Blockly.Skoolbot['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return '{ \"block_name\": \"controls_statement_break\", \"statements\": \"break\" }';
    case 'CONTINUE':
      // return Blockly.Skoolbot.CONTINUE_STATEMENT;
      return '{ \"block_name\": \"controls_statement_continue\", \"statements\": \"continue\" }';
  }
  throw Error('Unknown flow statement.');
};
