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
  var code = '{ \"block_name\": \"colour_colour_picker\", \"colour\": \"' + block.getFieldValue('COLOUR') + '\"}';
  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

function randomHex() {
  var hex = "#";
  for (var i = 0; i < 6; ++i) {
    hex += Math.floor(Math.random()*16).toString(16).toUpperCase();
  }
  return hex;
}

Blockly.Skoolbot['colour_random'] = function(block) {

  // Generate a random colour.
  // var code = 'string.format("#%06x", math.random(0, 2^24 - 1))';

  var code = "{\"block_name\": \"colour_colour_random\", \"colour\": \"" + randomHex() + "\"}";
  return [code , Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  /* var functionName = Blockly.Skoolbot.provideFunction_(
      'colour_rgb',
      ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ + '(r, g, b)',
       '  r = math.floor(math.min(100, math.max(0, r)) * 2.55 + .5)',
       '  g = math.floor(math.min(100, math.max(0, g)) * 2.55 + .5)',
       '  b = math.floor(math.min(100, math.max(0, b)) * 2.55 + .5)',
       '  return string.format("#%02x%02x%02x", r, g, b)',
       'end']);
  */


  //with operations
  // var r = parseInt(Blockly.Skoolbot.valueToCode(block, 'RED',
  //     Blockly.Skoolbot.ORDER_ATOMIC).split(":")[1]) || 0;
  // var g = parseInt(Blockly.Skoolbot.valueToCode(block, 'GREEN',
  //     Blockly.Skoolbot.ORDER_ATOMIC).split(":")[1]) || 0;
  // var b = parseInt(Blockly.Skoolbot.valueToCode(block, 'BLUE',
  //     Blockly.Skoolbot.ORDER_ATOMIC).split(":")[1]) || 0;
  // //var code = functionName + '(' + r + ', ' + g + ', ' + b + ')';
  // r = Math.floor(Math.min(100, Math.max(0, r)) * 2.55 + .5).toString(16);
  // g = Math.floor(Math.min(100, Math.max(0, g)) * 2.55 + .5).toString(16);
  // b = Math.floor(Math.min(100, Math.max(0, b)) * 2.55 + .5).toString(16);
  //
  // var code  = '{\"colourRGB\": \""#';
  // var rgb = [r, g, b];
  // for (var i in rgb) {
  // 	if (rgb[i].length == 1) { code += '0' + rgb[i];}
  // 	else { code += rgb[i];}
  // }
  // return [code + "\"}", Blockly.Skoolbot.ORDER_ATOMIC];

  //with no operations
  var r = Blockly.Skoolbot.valueToCode(block, 'RED', Blockly.Skoolbot.ORDER_ATOMIC) || "\"\"";
  var g = Blockly.Skoolbot.valueToCode(block, 'GREEN', Blockly.Skoolbot.ORDER_ATOMIC) || "\"\"";
  var b = Blockly.Skoolbot.valueToCode(block, 'BLUE', Blockly.Skoolbot.ORDER_ATOMIC) || "\"\"";
  var code  = '{\"block_name\": \"colour_colour_rgb\", \"argument\":[' + r + ', '+ g + ',' + b + "]}";

  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};

Blockly.Skoolbot['colour_blend'] = function(block) {

  // Blend two colours together.
  /*var functionName = Blockly.Skoolbot.provideFunction_(
      'colour_blend',
      ['function ' + Blockly.Skoolbot.FUNCTION_NAME_PLACEHOLDER_ +
           '(colour1, colour2, ratio)',
       '  local r1 = tonumber(string.sub(colour1, 2, 3), 16)',
       '  local r2 = tonumber(string.sub(colour2, 2, 3), 16)',
       '  local g1 = tonumber(string.sub(colour1, 4, 5), 16)',
       '  local g2 = tonumber(string.sub(colour2, 4, 5), 16)',
       '  local b1 = tonumber(string.sub(colour1, 6, 7), 16)',
       '  local b2 = tonumber(string.sub(colour2, 6, 7), 16)',
       '  local ratio = math.min(1, math.max(0, ratio))',
       '  local r = math.floor(r1 * (1 - ratio) + r2 * ratio + .5)',
       '  local g = math.floor(g1 * (1 - ratio) + g2 * ratio + .5)',
       '  local b = math.floor(b1 * (1 - ratio) + b2 * ratio + .5)',
       '  return string.format("#%02x%02x%02x", r, g, b)',
       'end']);*/
  //with operations
  // var colour1 = Blockly.Skoolbot.valueToCode(block, 'COLOUR1',
  //     Blockly.Skoolbot.ORDER_ATOMIC).split(":")[1].replace(/\s|}/g, '') || '\"#000000\"';
  // var colour2 = Blockly.Skoolbot.valueToCode(block, 'COLOUR2',
  //     Blockly.Skoolbot.ORDER_ATOMIC).split(":")[1].replace(/\s|}/g, '') || '\"#000000\"';
  // var ratio = parseFloat(Blockly.Skoolbot.valueToCode(block, 'RATIO',
  //     Blockly.Skoolbot.ORDER_ATOMIC).split(":")[1]) || 0;
  //
  // var r1 = parseInt(colour1.substring(2, 3), 16);
  // var r2 = parseInt(colour2.substring(2, 3), 16);
  // var g1 = parseInt(colour1.substring(4, 5), 16);
  // var g2 = parseInt(colour2.substring(4, 5), 16);
  // var b1 = parseInt(colour1.substring(6, 7), 16);
  // var b2 = parseInt(colour2.substring(6, 7), 16);
  // var ratio = Math.min(1, Math.max(0, ratio));
  // var r = Math.floor(r1 * (1 - ratio) + r2 * ratio + 0.5).toString(16);
  // var g = Math.floor(g1 * (1 - ratio) + g2 * ratio + 0.5).toString(16);
  // var b = Math.floor(b1 * (1 - ratio) + b2 * ratio + 0.5).toString(16);
  //
  // var code  = '{\"colourBlend\": \"#';
  // var rgb = [r, g, b];
  // for (var i in rgb) {
  // 	if (rgb[i].length == 1) { code += '0' + rgb[i];}
  // 	else { code += rgb[i];}
  // }
  // return [code + "\"}", Blockly.Skoolbot.ORDER_ATOMIC];

  //without operations
  var colour1 = Blockly.Skoolbot.valueToCode(block, 'COLOUR1', Blockly.Skoolbot.ORDER_ATOMIC) || "\"\"";
  var colour2 = Blockly.Skoolbot.valueToCode(block, 'COLOUR2', Blockly.Skoolbot.ORDER_ATOMIC) || "\"\"";
  var ratio = Blockly.Skoolbot.valueToCode(block, 'RATIO', Blockly.Skoolbot.ORDER_ATOMIC) || "\"\"";

  var code  = '{ \"block_name\": \"colour_colour_blend\", \"argument\": [{ \"block_name\": \"colour_picker\", \"colour1\": '+ colour1 + '}, { \"block_name\": \"colour_picker\", \"colour2\": '+
              colour2 + '}, ' + ratio + ']}';

  return [code, Blockly.Skoolbot.ORDER_ATOMIC];
};
