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
 * @fileoverview Helper functions for generating Skoolbot for blocks.
 * @author rodrigoq@google.com (Rodrigo Queiro)
 * Based on Ellen Spertus's blocky-lua project.
 */
'use strict';

goog.provide('Blockly.Skoolbot');

goog.require('Blockly.Generator');


/**
 * Skoolbot code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Skoolbot = new Blockly.Generator('Skoolbot');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Skoolbot.addReservedWords(
    // Special character
    '_,' +
    // From theoriginalbit's script:
    // https://github.com/espertus/blockly-lua/issues/6
    '__inext,assert,bit,colors,colours,coroutine,disk,dofile,error,fs,' +
    'fetfenv,getmetatable,gps,help,io,ipairs,keys,loadfile,loadstring,math,' +
    'native,next,os,paintutils,pairs,parallel,pcall,peripheral,print,' +
    'printError,rawequal,rawget,rawset,read,rednet,redstone,rs,select,' +
    'setfenv,setmetatable,sleep,string,table,term,textutils,tonumber,' +
    'tostring,turtle,type,unpack,vector,write,xpcall,_VERSION,__indext,' +
    // Not included in the script, probably because it wasn't enabled:
    'HTTP,' +
    // Keywords (http://www.lua.org/pil/1.3.html).
    'and,break,do,else,elseif,end,false,for,function,if,in,local,nil,not,or,' +
    'repeat,return,then,true,until,while,' +
    // Metamethods (http://www.lua.org/manual/5.2/manual.html).
    'add,sub,mul,div,mod,pow,unm,concat,len,eq,lt,le,index,newindex,call,' +
    // Basic functions (http://www.lua.org/manual/5.2/manual.html, section 6.1).
    'assert,collectgarbage,dofile,error,_G,getmetatable,inpairs,load,' +
    'loadfile,next,pairs,pcall,print,rawequal,rawget,rawlen,rawset,select,' +
    'setmetatable,tonumber,tostring,type,_VERSION,xpcall,' +
    // Modules (http://www.lua.org/manual/5.2/manual.html, section 6.3).
    'require,package,string,table,math,bit32,io,file,os,debug'
);

/**
 * Order of operation ENUMs.
 * http://www.lua.org/manual/5.3/manual.html#3.4.8
 */
Blockly.Skoolbot.ORDER_ATOMIC = 0;          // literals
// The next level was not explicit in documentation and inferred by Ellen.
Blockly.Skoolbot.ORDER_HIGH = 1;            // Function calls, tables[]
Blockly.Skoolbot.ORDER_EXPONENTIATION = 2;  // ^
Blockly.Skoolbot.ORDER_UNARY = 3;           // not # - ~
Blockly.Skoolbot.ORDER_MULTIPLICATIVE = 4;  // * / %
Blockly.Skoolbot.ORDER_ADDITIVE = 5;        // + -
Blockly.Skoolbot.ORDER_CONCATENATION = 6;   // ..
Blockly.Skoolbot.ORDER_RELATIONAL = 7;      // < > <=  >= ~= ==
Blockly.Skoolbot.ORDER_AND = 8;             // and
Blockly.Skoolbot.ORDER_OR = 9;              // or
Blockly.Skoolbot.ORDER_NONE = 99;

/**
 * Note: Skoolbot is not supporting zero-indexing since the language itself is
 * one-indexed, so the generator does not repoct the oneBasedIndex configuration
 * option used for lists and text.
 */

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Skoolbot.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Skoolbot.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Skoolbot.functionNames_ = Object.create(null);

  if (!Blockly.Skoolbot.variableDB_) {
    Blockly.Skoolbot.variableDB_ =
        new Blockly.Names(Blockly.Skoolbot.RESERVED_WORDS_);
  } else {
    Blockly.Skoolbot.variableDB_.reset();
  }
  Blockly.Skoolbot.variableDB_.setVariableMap(workspace.getVariableMap());
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Skoolbot.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Skoolbot.definitions_) {
    definitions.push(Blockly.Skoolbot.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.Skoolbot.definitions_;
  delete Blockly.Skoolbot.functionNames_;
  Blockly.Skoolbot.variableDB_.reset();
  // add comma between functions
  return definitions.join('') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything. In Skoolbot, an expression is not a legal statement, so we must assign
 * the value to the (conventionally ignored) _.
 * http://lua-users.org/wiki/ExpressionsAsStatements
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Skoolbot.scrubNakedValue = function(line) {
  return line;
};

/**
 * Encode a string as a properly escaped Skoolbot string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Skoolbot string.
 * @private
 */
Blockly.Skoolbot.quote_ = function(string) {
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Skoolbot from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Skoolbot code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} Skoolbot code with comments and subsequent blocks added.
 * @private
 */
Blockly.Skoolbot.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Skoolbot.COMMENT_WRAP - 3);
    if (comment) {
      commentCode += Blockly.Skoolbot.prefixLines(comment, '-- ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.Skoolbot.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Skoolbot.prefixLines(comment, '-- ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.Skoolbot.blockToCode(nextBlock);
  // add
  // if(nextBlock){
  //   code += '\,';
  // }
  return commentCode + code + nextCode;
};
