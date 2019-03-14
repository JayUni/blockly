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
 * @fileoverview Generating Skoolbot for colour blocks.
 * @author rodrigoq@google.com (Rodrigo Queiro)
 */
'use strict';

goog.provide('Blockly.Skoolbot.colour');

goog.require('Blockly.Skoolbot');


Blockly.Skoolbot['colour_picker'] = function(block) {
  // Colour picker.
  var code = '{\"colour\": \"' + block.getFieldValue('COLOUR') + '\"';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['colour_random'] = function(block) {
  var code = '{\"functionName\": \"colour_random\"}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.

  var r = parseInt(Blockly.Skoolbot.valueToCode(block, 'RED',
      Blockly.Skoolbot.ORDER_NONE).split(":")[1]) || '{ \"number\": \"100\"}';
  var g = parseInt(Blockly.Skoolbot.valueToCode(block, 'GREEN',
      Blockly.Skoolbot.ORDER_NONE).split(":")[1]) || '{ \"number\": \"50\"}';
  var b = parseInt(Blockly.Skoolbot.valueToCode(block, 'BLUE',
      Blockly.Skoolbot.ORDER_NONE).split(":")[1]) || '{ \"number\": \"0\"}';

  var code = '{\"functionName\": \"colour_rgb\", \"argument\": [{\"red%\": '+ r + '}, {\"green%\": ' + g + '}, {\"blue%\": ' + b + '}]}';
  return [code, Blockly.Skoolbot.ORDER_HIGH];
};

Blockly.Skoolbot['colour_blend'] = function(block) {
  var colour1 = Blockly.Skoolbot.valueToCode(block, 'COLOUR1',
      Blockly.Skoolbot.ORDER_NONE).split(":")[1].replace(/\s|}/g, '') || '\"#000000\"';
  var colour2 = Blockly.Skoolbot.valueToCode(block, 'COLOUR2',
      Blockly.Skoolbot.ORDER_NONE).split(":")[1].replace(/\s|}/g, '') || '\"#000000\"';
  var ratio = parseFloat(Blockly.Skoolbot.valueToCode(block, 'RATIO',
      Blockly.Skoolbot.ORDER_NONE).split(":")[1]) || '{ \"number\": \"0.5\"}';

  var code = '{\"functionName\": \"colour_blend\", \"argument\": [{\"colour1\": '+ colour1 + '}, {\"colour2\": ' + colour2 + '}, {\"ratio\": ' + ratio + '}]}';

  return [code, Blockly.Skoolbot.ORDER_HIGH];
};
