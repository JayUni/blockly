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
 * @fileoverview Generating Skoolbot for unit test blocks.
 * @author rodrigoq@google.com (Rodrigo Queiro)
 */
'use strict';

Blockly.Skoolbot['unittest_main'] = function(block) {
  // Container for unit tests.
  var resultsVar = Blockly.Skoolbot.variableDB_.getName('unittestResults',
      Blockly.Names.DEVELOPER_VARIABLE_TYPE);
  var functionName = Blockly.Skoolbot.provideFunction_(
      'unittest_report',
      ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ + '()',
       '  -- Create test report.',
       '  local report = {}',
       '  local summary = {}',
       '  local fails = 0',
       '  for _, v in pairs(' + resultsVar + ') do',
       '    if v["success"] then',
       '      table.insert(summary, ".")',
       '    else',
       '      table.insert(summary, "F")',
       '      fails = fails + 1',
       '      table.insert(report, "FAIL: " .. v["title"])',
       '      table.insert(report, v["log"])',
       '    end',
       '  end',
       '  table.insert(report, 1, table.concat(summary))',
       '  table.insert(report, "")',
       '  table.insert(report, "Number of tests run: " .. #' + resultsVar + ')',
       '  table.insert(report, "")',
       '  if fails > 0 then',
       '    table.insert(report, "FAILED (failures=" .. fails .. ")")',
       '  else',
       '    table.insert(report, "OK")',
       '  end',
       '  return table.concat(report, "\\n")',
       'end']);
  // Setup global to hold test results.
  var code = resultsVar + ' = {}\n';
  // Say which test suite this is.
  code += 'print(\'\\n====================\\n\\n' +
      'Running suite: ' +
      block.getFieldValue('SUITE_NAME') +
       '\')\n';
  // Run tests (unindented).
  code += Blockly.Skoolbot.statementToCode(block, 'DO')
      .replace(/^  /, '').replace(/\n  /g, '\n');
  // Print the report.
  code += 'print(' + functionName + '())\n';
  // Destroy results.
  code += resultsVar + ' = nil\n';
  return code;
};

Blockly.Skoolbot['unittest_main'].defineAssert_ = function(block) {
  var resultsVar = Blockly.Skoolbot.variableDB_.getName('unittestResults',
      Blockly.Names.DEVELOPER_VARIABLE_TYPE);
  var functionName = Blockly.Skoolbot.provideFunction_(
      'assertEquals',
      ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ +
           '(actual, expected, message)',
       '  -- Asserts that a value equals another value.',
       '  assert(' + resultsVar + ' ~= nil, ' +
           '"Orphaned assert equals: " ..  message)',
       '  if type(actual) == "table" and type(expected) == "table" then',
       '    local lists_match = #actual == #expected',
       '    if lists_match then',
       '      for i, v1 in ipairs(actual) do',
       '        local v2 = expected[i]',
       '        if type(v1) == "number" and type(v2) == "number" then',
       '          if math.abs(v1 - v2) > 1e-9 then',
       '            lists_match = false',
       '          end',
       '        elseif v1 ~= v2 then',
       '          lists_match = false',
       '        end',
       '      end',
       '    end',
       '    if lists_match then',
       '      table.insert(' + resultsVar +
           ', {success=true, log="OK", title=message})',
       '      return',
       '    else',
       '      -- produce the non-matching strings for a human-readable error',
       '      expected = "{" .. table.concat(expected, ", ") .. "}"',
       '      actual = "{" .. table.concat(actual, ", ") .. "}"',
       '    end',
       '  end',
       '  if actual == expected or (type(actual) == "number" and ' +
          'type(expected) == "number" and math.abs(actual - expected) < ' +
          '1e-9) then ',
       '    table.insert(' + resultsVar +
           ', {success=true, log="OK", title=message})',
       '  else',
       '    table.insert(' + resultsVar + ', {success=false, ' +
           'log=string.format("Expected: %s\\nActual: %s"' +
               ', tostring(expected), tostring(actual)), title=message})',
       '  end',
       'end']);
  return functionName;
};

Blockly.Skoolbot['unittest_assertequals'] = function(block) {
  // Asserts that a value equals another value.
  var message = Blockly.Skoolbot.valueToCode(block, 'MESSAGE',
      Blockly.Skoolbot.ORDER_NONE) || '';
  var actual = Blockly.Skoolbot.valueToCode(block, 'ACTUAL',
      Blockly.Skoolbot.ORDER_NONE) || 'nil';
  var expected = Blockly.Skoolbot.valueToCode(block, 'EXPECTED',
      Blockly.Skoolbot.ORDER_NONE) || 'nil';
  return Blockly.Skoolbot['unittest_main'].defineAssert_() +
      '(' + actual + ', ' + expected + ', ' + message + ')\n';
};

Blockly.Skoolbot['unittest_assertvalue'] = function(block) {
  // Asserts that a value is true, false, or null.
  var message = Blockly.Skoolbot.valueToCode(block, 'MESSAGE',
      Blockly.Skoolbot.ORDER_NONE) || '';
  var actual = Blockly.Skoolbot.valueToCode(block, 'ACTUAL',
      Blockly.Skoolbot.ORDER_NONE) || 'nil';
  var expected = block.getFieldValue('EXPECTED');
  if (expected == 'TRUE') {
    expected = 'true';
  } else if (expected == 'FALSE') {
    expected = 'false';
  } else if (expected == 'NULL') {
    expected = 'nil';
  }
  return Blockly.Skoolbot.unittest_main.defineAssert_() +
      '(' + actual + ', ' + expected + ', ' + message + ')\n';
};

Blockly.Skoolbot['unittest_fail'] = function(block) {
  // Always assert an error.
  var resultsVar = Blockly.Skoolbot.variableDB_.getName('unittestResults',
      Blockly.Names.DEVELOPER_VARIABLE_TYPE);
  var message = Blockly.Skoolbot.quote_(block.getFieldValue('MESSAGE'));
  var functionName = Blockly.Skoolbot.provideFunction_(
      'unittest_fail',
      ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ + '(message)',
       '  -- Always assert an error.',
       '  assert(' + resultsVar +
           ' ~= nil, "Orphaned assert fail: " .. message)',
       '  table.insert(' + resultsVar +
           ', {success=false, log="Fail.", title=message})',
       'end']);
  return functionName + '(' + message + ')\n';
};

Blockly.Skoolbot['unittest_adjustindex'] = function(block) {
  var index = Blockly.Skoolbot.valueToCode(block, 'INDEX',
      Blockly.Skoolbot.ORDER_ADDITIVE) || '0';
  if (Blockly.isNumber(index)) {
    // If the index is a naked number, adjust it right now.
    return [parseFloat(index) + 1, Blockly.Skoolbot.ORDER_ATOMIC];
  }
  // If the index is dynamic, adjust it in code.
  return [index + ' + 1', Blockly.Skoolbot.ORDER_ATOMIC];
};
