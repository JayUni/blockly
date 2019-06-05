/**
 * Blockly Demos: Code
 *
 * Copyright 2012 Google Inc.
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
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Code.LANGUAGE_NAME = {
  'ar': 'العربية',
  'be-tarask': 'Taraškievica',
  'br': 'Brezhoneg',
  'ca': 'Català',
  'cs': 'Česky',
  'da': 'Dansk',
  'de': 'Deutsch',
  'el': 'Ελληνικά',
  'en': 'English',
  'es': 'Español',
  'et': 'Eesti',
  'fa': 'فارسی',
  'fr': 'Français',
  'he': 'עברית',
  'hrx': 'Hunsrik',
  'hu': 'Magyar',
  'ia': 'Interlingua',
  'is': 'Íslenska',
  'it': 'Italiano',
  'ja': '日本語',
  'kab': 'Kabyle',
  'ko': '한국어',
  'mk': 'Македонски',
  'ms': 'Bahasa Melayu',
  'nb': 'Norsk Bokmål',
  'nl': 'Nederlands, Vlaams',
  'oc': 'Lenga d\'òc',
  'pl': 'Polski',
  'pms': 'Piemontèis',
  'pt-br': 'Português Brasileiro',
  'ro': 'Română',
  'ru': 'Русский',
  'sc': 'Sardu',
  'sk': 'Slovenčina',
  'sr': 'Српски',
  'sv': 'Svenska',
  'ta': 'தமிழ்',
  'th': 'ภาษาไทย',
  'tlh': 'tlhIngan Hol',
  'tr': 'Türkçe',
  'uk': 'Українська',
  'vi': 'Tiếng Việt',
  'zh-hans': '简体中文',
  'zh-hant': '正體中文'
};

/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if parameter not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function(name, defaultValue) {
  var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function() {
  var lang = Code.getStringParamFromUrl('lang', '');
  if (Code.LANGUAGE_NAME[lang] === undefined) {
    // Default to English.
    lang = 'en';
  }
  return lang;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function() {
  return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function(defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

/**
 * Save the blocks and reload with a different language.
 */
Code.changeLanguage = function() {
  // Store the blocks for the duration of the reload.
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Code.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }

  var languageMenu = document.getElementById('languageMenu');
  var newLang = encodeURIComponent(
      languageMenu.options[languageMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
    search = '?lang=' + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
    search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
  } else {
    search = search.replace(/\?/, '?lang=' + newLang + '&');
  }

  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname + search;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

/**
 * Load the Prettify CSS and JavaScript.
 */
// Code.importPrettify = function() {
//   var script = document.createElement('script');
//   script.setAttribute('src', 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
//   document.head.appendChild(script);
// };

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Code.LANG = Code.getLang();

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'javascript', 'php', 'python', 'dart', 'lua', 'skoolbot', 'xml'];

Code.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function(clickedName) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(MSG['badXml'].replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Code.workspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
    }
  }

  if (document.getElementById('tab_blocks').className == 'tabon') {
    Code.workspace.setVisible(false);
  }
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Code.selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility =
      'visible';
  Code.renderContent();
  if (clickedName == 'blocks') {
    Code.workspace.setVisible(true);
  }
  Blockly.svgResize(Code.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
  var content = document.getElementById('content_' + Code.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  }
  // else if (content.id == 'content_javascript') {
  //   Code.attemptCodeGeneration(Blockly.JavaScript, 'js');
  // }
  // else if (content.id == 'content_python') {
  //   Code.attemptCodeGeneration(Blockly.Python, 'py');
  // }
  // else if (content.id == 'content_php') {
  //   Code.attemptCodeGeneration(Blockly.PHP, 'php');
  // }
  // else if (content.id == 'content_dart') {
  //   Code.attemptCodeGeneration(Blockly.Dart, 'dart');
  // }
  // else if (content.id == 'content_lua') {
  //   Code.attemptCodeGeneration(Blockly.Lua, 'lua');
  // }
  else if (content.id == 'content_skoolbot') {
    Code.attemptCodeGeneration(Blockly.Skoolbot, 'skoolbot');
  }
};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 * @param prettyPrintType {string} The file type key for the pretty printer.
 */
Code.attemptCodeGeneration = function(generator, prettyPrintType) {
  var content = document.getElementById('content_' + Code.selected);
  content.textContent = '';
  if (Code.checkAllGeneratorFunctionsDefined(generator)) {
    var code = generator.workspaceToCode(Code.workspace);

    content.textContent = code;
    // if (typeof PR.prettyPrintOne == 'function') {
    //   code = content.textContent;
    //   code = PR.prettyPrintOne(code, prettyPrintType);
    //   content.innerHTML = code;
    // }
  }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function(generator) {
  var blocks = Code.workspace.getAllBlocks(false);
  var missingBlockGenerators = [];
  for (var i = 0; i < blocks.length; i++) {
    var blockType = blocks[i].type;
    if (!generator[blockType]) {
      if (missingBlockGenerators.indexOf(blockType) === -1) {
        missingBlockGenerators.push(blockType);
      }
    }
  }

  var valid = missingBlockGenerators.length == 0;
  if (!valid) {
    var msg = 'The generator code for the following blocks not specified for '
        + generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
    Blockly.alert(msg);  // Assuming synchronous. No callback.
  }
  return valid;
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {
  Code.initLanguage();

  var rtl = Code.isRtl();
  var container = document.getElementById('content_area');
  var onresize = function(e) {
    var bBox = Code.getBBox_(container);
    for (var i = 0; i < Code.TABS_.length; i++) {
      var el = document.getElementById('content_' + Code.TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Code.workspace && Code.workspace.toolbox_.width) {
      document.getElementById('tab_blocks').style.minWidth =
          (Code.workspace.toolbox_.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  // The toolbox XML specifies each category name using Blockly's messaging
  // format (eg. `<category name="%{BKY_CATLOGIC}">`).
  // These message keys need to be defined in `Blockly.Msg` in order to
  // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
  // been defined for each language to import each category name message
  // into `Blockly.Msg`.
  // TODO: Clean up the message files so this is done explicitly instead of
  // through this for-loop.
  for (var messageKey in MSG) {
    if (messageKey.indexOf('cat') == 0) {
      Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
    }
  }

  // Construct the toolbox XML, replacing translated variable names.
  var toolboxText = document.getElementById('toolbox').outerHTML;
  toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g,
      function(m, p1, p2) {return p1 + MSG[p2];});
  var toolboxXml = Blockly.Xml.textToDom(toolboxText);

  Code.workspace = Blockly.inject('content_blocks',
      {grid:
          {spacing: 25,
           length: 3,
           colour: '#ccc',
           snap: true},
       media: './msg_icon/media/',
       rtl: rtl,
       toolbox: toolboxXml,
       zoom:
           {controls: true,
            wheel: true}
      });

  // Add to reserved word list: Local variables in execution environment (runJS)
  // and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  Code.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload(Code.workspace);
  }

  Code.tabClick(Code.selected);

  Code.bindClick('trashButton',
      function() {Code.discard(); Code.renderContent();});
  Code.bindClick('runButton',
      function() {Code.generateHexString();});
  // Disable the link button if page isn't backed by App Engine storage.
  var linkButton = document.getElementById('linkButton');
  if ('BlocklyStorage' in window) {
    BlocklyStorage['HTTPREQUEST_ERROR'] = MSG['httpRequestError'];
    BlocklyStorage['LINK_ALERT'] = MSG['linkAlert'];
    BlocklyStorage['HASH_ERROR'] = MSG['hashError'];
    BlocklyStorage['XML_ERROR'] = MSG['xmlError'];
    Code.bindClick(linkButton,
        function() {BlocklyStorage.link(Code.workspace);});
  } else if (linkButton) {
    linkButton.className = 'disabled';
  }

  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    Code.bindClick('tab_' + name,
        function(name_) {return function() {Code.tabClick(name_);};}(name));
  }
  onresize();
  Blockly.svgResize(Code.workspace);

  // Lazy-load the syntax-highlighting.
  // window.setTimeout(Code.importPrettify, 1);
};

/**
 * Initialize the page language.
 */
Code.initLanguage = function() {
  // Set the HTML's language and direction.
  var rtl = Code.isRtl();
  document.dir = rtl ? 'rtl' : 'ltr';
  document.head.parentElement.setAttribute('lang', Code.LANG);

  // Sort languages alphabetically.
  var languages = [];
  for (var lang in Code.LANGUAGE_NAME) {
    languages.push([Code.LANGUAGE_NAME[lang], lang]);
  }
  var comp = function(a, b) {
    // Sort based on first argument ('English', 'Русский', '简体字', etc).
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  };
  languages.sort(comp);
  // Populate the language selection menu.
  // var languageMenu = document.getElementById('languageMenu');
  // languageMenu.options.length = 0;
  // for (var i = 0; i < languages.length; i++) {
  //   var tuple = languages[i];
  //   var lang = tuple[tuple.length - 1];
  //   var option = new Option(tuple[0], lang);
  //   if (lang == Code.LANG) {
  //     option.selected = true;
  //   }
  //   languageMenu.options.add(option);
  // }
  // languageMenu.addEventListener('change', Code.changeLanguage, true);

  // Inject language strings.
  document.title += ' ' + MSG['title'];
  document.getElementById('title').textContent = MSG['title'];
  document.getElementById('tab_blocks').textContent = MSG['blocks'];

  document.getElementById('linkButton').title = MSG['linkTooltip'];
  document.getElementById('runButton').title = MSG['runTooltip'];
  document.getElementById('trashButton').title = MSG['trashTooltip'];
};

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */

// Code.runJS = function() {
//   Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
//   var timeouts = 0;
//   var checkTimeout = function() {
//     if (timeouts++ > 1000000) {
//       throw MSG['timeout'];
//     }
//   };
//   var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
//   Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
//   try {
//     eval(code);
//   } catch (e) {
//     alert(MSG['badCode'].replace('%1', e));
//   }
// };

var commandList = [];
var L0 = 0;
var L1 = 0;
var loop_val = 0;
var variable_map = {};
var addr = 0;
var jumpaddr = 0;


Code.generateHexString = function() {
  // var xml = Blockly.Xml.workspaceToDom(Code.workspace);
  // var xmlCode = Blockly.Xml.domToPrettyText(xml);
  var json = Blockly['Skoolbot'].workspaceToCode(Code.workspace);
  var add_type_field_json = add_type_field(JSON.parse(json));
  commandList = [];
  L0 = 0;
  L1 = 0;
  loop_val = 0;
  variable_map = {};
  addr = 0;
  jumpaddr = 0;

  var symbolic_command = command_generator(add_type_field_json);
  var hex_commands = bytecode_generator(symbolic_command);
  var hexString = "";
  var string_count = 0;

  for (var i in hex_commands){
    var row = hex_commands[i].split(' ');
    for (var j in row){
      if(row[j] !== '' && row[j] !== undefined){
          hexString += row[j] + ' ';
          string_count += 1;
      }
    }

  }
  string_count = ('00' + string_count.toString()).slice(-3);
  document.getElementById('input').value = 'BLOCKLY ' + string_count + ' '+ hexString;
};


/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {
  var count = Code.workspace.getAllBlocks(false).length;
  if (count < 2 ||
      window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
    Code.workspace.clear();
    if (window.location.hash) {
      window.location.hash = '';
    }
  }
};


// // there are some problems to change languages
// // Load the Code demo's language strings.
// document.write('<script src="msg/' + Code.LANG + '.js"></script>\n');
// // Load Blockly's language strings.
// document.write('<script src="./msg_icon/msg/js/' + Code.LANG + '.js"></script>\n');

window.addEventListener('load', Code.init);
//
// var connectionId;
//
// $(document).ready(function() {
//     chrome.serial.getDevices(function(devices) {
//
//         for (var i = 0; i < devices.length; i++) {
//             $('select#portList').append('<option value="' + devices[i].path + '">' + devices[i].path + '</option>');
//         }
//     });
//
//     // ui hook
//     $('button#runButton').click(function() {
//         var clicks = $(this).data('clicks');
//
//         if (!clicks) {
//             var port = $('select#portList').val();
//             chrome.serial.connect(port, {bitrate: 9600}, function(info) {
//                 connectionId = info.connectionId;
//                 $("button#runButton").html("Close Port");
//                 console.log('Connection opened with id: ' + connectionId + ', Bitrate: ' + info.bitrate);
//             });
//         } else {
//             chrome.serial.disconnect(connectionId, function(result) {
//                 $("button#runButton").html("Open Port");
//                 console.log('Connection with id: ' + connectionId + ' closed');
//             });
//         }
//
//         $(this).data("clicks", !clicks);
//     });
// });

function add_type_field(jsonList){
    for (var element in jsonList) {
        if ((jsonList[element] instanceof Object)){
            jsonList[element].valueType = "";
            add_type_field(jsonList[element]);
        }
        else{
            var blockName = jsonList.block_name;
            if(blockName!==undefined){
                var block_type = blockName.split('_')[1];

                switch (block_type) {
                    case 'arithmetic':
                        var type_list = [];
                        for (var j in jsonList.argument){
                            // console.log(jsonList.argument[j]);
                            type_list.push(jsonList.argument[j].valueType);
                        }
                        // console.log(type_list);
                        jsonList.valueType = checkTypeList(type_list);
                        break;
                    default:
                        jsonList.valueType = block_type;
                        break;
                }
            }
        }
    }
    return jsonList;
}

function checkTypeList(typeList){
    var type = typeList[0];
    for (var i in typeList){
        if(typeList[i] !== type && typeList[i] !== undefined){
            return '';
        }
    }
    return type;
}


function command_generator(jsonList){

    if (!hasChild(jsonList)[0]) {
        addCommand(jsonList);
    }
    return commandList;
}

function hasChild(jsonList) {
    var keys = [];
    var hasChild = false;
    for (var val of Object.values(jsonList)){
        if (val instanceof Object){
            command_generator(val);
            addCommand(jsonList);// This statement runs more than one time
            hasChild = true;
        }
        else{
            jsonList = addLabel(jsonList);


        }
    }

    return [hasChild, keys]
}

function addCommand(jsonList){
    for (var [key, val] of Object.entries(jsonList)) {

        // console.log(i, key, val);

        // for (var property in jsonList) {
        //     if (jsonList.hasOwnProperty(property)) {
        //         console.log(jsonList[property])
        //     }
        // }

        // console.log(JSON.stringify(jsonList[key])+ '\n');

        if (key === 'block_name' && val !== undefined) {
            var block_type = val.split('_')[0];
            var command = val.split('_')[2];
            switch (block_type) {
                case 'math':
                    switch (command) {
                        case 'operator':
                            commandList.push(jsonList.operator);
                            break;
                        case 'number':
                            commandList.push(jsonList.valueType + ' ' + jsonList.number);
                            break;
                        case 'numberProperty':
                            commandList.push(jsonList.functionName);
                            break;
                        case 'constant':
                            commandList.push(command + ' ' + jsonList.number);
                            break;
                        case 'function':
                            commandList.push(jsonList.functionName);
                            break;
                        default:
                            commandList.push("ERROR, UNDEFINED");
                            break;
                    }
                    break;
                case 'logic':
                    switch(command){
                        case 'operator':
                            commandList.push(jsonList.operator);
                            break;
                        case 'boolean':
                            commandList.push(jsonList.valueType + ' ' + jsonList.value);
                            break;
                        case 'null':
                            commandList.push(jsonList.value);
                            break;
                        default:
                            commandList.push("ERROR, UNDEFINED");
                            break;
                    }
                    break;
                case 'variables':
                    switch(command){
                        case 'set':
                            commandList.push('set ' + jsonList.varName);
                            break;
                        case 'get':
                            commandList.push('get ' + jsonList.varName);
                            break;
                        case 'change':
                            commandList.push('change ' + jsonList.varName);
                            break;
                    }
                    break;
                case 'text':
                    switch(command){
                        case 'text':
                            commandList.push(jsonList.valueType + ' ' + jsonList.text);
                            break;
                        case 'print':
                            commandList.push('print');
                            break;

                    }
                    break;
                case 'controls':
                    switch(command){
                        case 'if':
                            if(jsonList.statements === 'if'){
                                commandList.push('JUMPNZ L0_' + jsonList.label_0);

                                jsonList.statements = 'if_checked';
                            }
                            if(jsonList.statements ==='if_checked'){
                                jsonList.statements = 'if_branchCode';
                                break;
                            }
                            if(jsonList.statements ==='if_branchCode'){
                                commandList.push('JUMP L1_' + (parseInt(jsonList.label_num)+(parseInt(jsonList.label_0)-1)));
                                jsonList.label_num = parseInt(jsonList.label_num);
                            }
                            commandList.push('L0_' + jsonList.label_0);
                            break;
                        case 'elseif':
                            // commandList.push('L1_' + jsonList.label_0);
                            // console.log(jsonList.statements);
                            if(jsonList.statements === 'elseif'){
                                commandList.push('JUMPNZ L0_' + jsonList.label_0);
                                jsonList.statements = 'if_checked';
                            }
                            if(jsonList.statements ==='if_checked'){
                                jsonList.statements = 'if_branchCode';
                                break;
                            }
                            if(jsonList.statements ==='if_branchCode'){
                                commandList.push('JUMP L1_' + (parseInt(jsonList.label_num)+(parseInt(jsonList.label_0)-1)));
                            }
                            commandList.push('L0_' + jsonList.label_0);
                            break;
                        case 'else':
                            // console.log('else', jsonList.label_1);
                            commandList.push('L1_' + jsonList.label_1);
                            break;
                        case 'whileUntil':
                            if (jsonList.label === 'added'){
                                if(jsonList.end_type === 'until'){
                                    commandList.push('negate');
                                }
                                commandList.push('JUMPNZ L1_' + jsonList.label_1);
                                jsonList.label = 'conditionAdded';
                                break;
                            }
                            if (jsonList.label === 'conditionAdded'){
                                commandList.push('JUMP L0_' + jsonList.label_0);
                                commandList.push('L1_' + jsonList.label_1);
                            }
                            break;
                        case 'repeat':
                            if (jsonList.label === 'added'){
                                commandList.push('set repeat_control_variable_'+ jsonList.loop_val);
                                commandList.push('L0_' + jsonList.label_0);
                                jsonList.label = 'variableAdded';
                                break;
                            }
                            if (jsonList.label === 'variableAdded'){
                                commandList.push('get repeat_control_variable_'+ jsonList.loop_val, 'number 1', 'sub', 'set repeat_control_variable_' + jsonList.loop_val, 'get repeat_control_variable_' + jsonList.loop_val, 'number 0', 'cmpg');
                                commandList.push('JUMPNZ L1_' + jsonList.label_1);
                                commandList.push('JUMP L0_' + jsonList.label_0);
                                commandList.push('L1_' + jsonList.label_1);
                                jsonList.label = 'finished';
                            }
                            break;
                        case 'for':
                            if (jsonList.label === 'added'){
                                commandList.push('set for_start_variable_' + jsonList.loop_val);
                                commandList.push('boolean TRUE');
                                commandList.push('set for_control_variable_' + jsonList.loop_val);
                                jsonList.label = 'variableInit';
                                break;
                            }
                            if (jsonList.label === 'variableInit'){
                                commandList.push('set for_step_variable_' + jsonList.loop_val);
                                commandList.push('L0_' + jsonList.label_0);
                                commandList.push('get for_control_variable_' + jsonList.loop_val);
                                commandList.push('JUMPNZ L1_' + jsonList.loop_L1);
                                jsonList.label = 'jumpAdded';
                                break;
                            }
                            if (jsonList.label === 'jumpAdded'){

                                commandList.push('set for_end_variable_' + jsonList.loop_val);
                                commandList.push('get for_start_variable_' + jsonList.loop_val);
                                commandList.push('set for_i_variable_' + jsonList.loop_val);
                                commandList.push('get for_start_variable_' + jsonList.loop_val);
                                commandList.push('set ' + jsonList.variable);
                                commandList.push('boolean FALSE');
                                commandList.push('set for_control_variable_' + jsonList.loop_val);
                                commandList.push('JUMP L0_' + jsonList.loop_L0);
                                commandList.push('L1_' + jsonList.loop_L1);
                                commandList.push('get for_i_variable_' + jsonList.loop_val);
                                commandList.push('get for_step_variable_' + jsonList.loop_val);
                                commandList.push('add');
                                commandList.push('set for_i_variable_' + jsonList.loop_val);
                                commandList.push('get for_i_variable_' + jsonList.loop_val);
                                commandList.push('set ' + jsonList.variable);
                                commandList.push('L0_' + jsonList.loop_L0);
                                commandList.push('get for_i_variable_' + jsonList.loop_val);
                                commandList.push('get for_end_variable_' + jsonList.loop_val);
                                var loop_start = jsonList.start[0].number;
                                var loop_end = jsonList.end[0].number;
                                if(loop_start <= loop_end){
                                    commandList.push('cmple');
                                }
                                else{
                                    commandList.push('cmpge');
                                }
                                // commandList.push('cmple');
                                commandList.push('JUMPNZ L1_' + jsonList.label_1);
                                jsonList.label = 'variableChanged';
                                break;
                            }
                            if (jsonList.label === 'variableChanged'){
                                commandList.push('JUMP L0_' + jsonList.label_0);
                                commandList.push('L1_' + jsonList.label_1);
                                jsonList.label = 'finished';
                                break;
                            }

                            break;
                        case 'continue':
                            commandList.push('JUMP L0_' + jsonList.label_0);
                            break;
                        case 'break':
                            commandList.push('JUMP L1_' + jsonList.label_1);
                            break;
                    }
                case 'io':
                    switch (command) {
                        case 'dread':
                            commandList.push('dread ' + jsonList.arguments[0].varName);
                            break;
                        case 'dwrite':
                            if(jsonList.arguments[1].value === 'HIGH'){
                                commandList.push('number 0');
                            }else{
                                commandList.push('number 1');
                            }
                            commandList.push('dwrite ' + jsonList.arguments[0].varName);
                            break;
                        case 'aread':
                            commandList.push('aread ' + jsonList.arguments[0].varName);
                            break;
                        case 'awrite':
                            commandList.push('awrite ' + jsonList.arguments[0].varName);
                            break;
                        case 'pinmode':
                            if(jsonList.arguments[1].pinmode === 'INPUT'){
                                commandList.push('number 0');
                            }else{
                                commandList.push('number 1');
                            }
                            commandList.push('pinmode ' + jsonList.arguments[0].varName);
                            break;
                        case 'delay':
                            commandList.push('delay');
                            break;
                    }
                    break;
                break;
            }
        }
    }
}

function addLabel(jsonList) {
    for (var [key, val] of Object.entries(jsonList)) {
        if (key === 'block_name' && val !== undefined) {
            var block_type = val.split('_')[0];
            var command = val.split('_')[2];
            switch (block_type) {
                case 'controls':
                    switch(command){
                        case 'ifelse':
                            if (!jsonList.label){
                                var branch_num = jsonList.structure.length;

                                for (var i = 0; i < branch_num-1; i++) {
                                    jsonList.structure[i].label_0 = L0;
                                    jsonList.structure[i].label_1 = L1;
                                    jsonList.structure[i].label_num = branch_num - i;
                                    L0 += 1;
                                    L1 += 1;
                                }
                                if(jsonList.structure[branch_num-1].block_name === 'controls_statement_else'){
                                    jsonList.structure[branch_num-1].label_0 = L0;
                                    jsonList.structure[branch_num-1].label_1 = L1;
                                    jsonList.structure[branch_num-2].has_else = true;
                                    jsonList.structure[0].has_else = true;

                                }
                                jsonList.label = "added";
                            }
                            break;
                        case 'whileUntil':
                            switch(jsonList.end_type){
                                case 'while':
                                    if (!jsonList.label){
                                        jsonList.label_0 = L0;
                                        jsonList.label_1 = L1;
                                        continueBreak(jsonList.branch, L0, L1);
                                        L0 += 1;
                                        L1 += 1;
                                        jsonList.label = "added";
                                        commandList.push('L0_' + jsonList.label_0);
                                    }
                                    break;
                                case 'until':
                                    if (!jsonList.label){
                                        jsonList.label_0 = L0;
                                        jsonList.label_1 = L1;
                                        continueBreak(jsonList.branch, L0, L1);
                                        L0 += 1;
                                        L1 += 1;
                                        jsonList.label = "added";
                                        commandList.push('L0_' + jsonList.label_0);
                                    }
                                    break;
                            }
                            break;
                        case 'repeat':
                            if (!jsonList.label){
                                jsonList.label_0 = L0;
                                jsonList.label_1 = L1;
                                continueBreak(jsonList.branch, L0, L1);
                                L0 += 1;
                                L1 += 1;
                                jsonList.label = "added";
                                jsonList.loop_val = loop_val;
                                loop_val += 1;
                            }
                            break;
                        case 'for':
                            if (!jsonList.label){
                                jsonList.label_0 = L0;
                                jsonList.label_1 = L1;
                                continueBreak(jsonList.branch, L0, L1);
                                L0 += 1;
                                L1 += 1;
                                jsonList.label = "added";
                                jsonList.loop_val = loop_val;
                                jsonList.loop_L0 = L0;
                                jsonList.loop_L1 =L1;
                                L0 += 1;
                                L1 += 1;
                                loop_val += 1;

                            }
                            break;
                    }
                    break;
            }
        }
    }
    return jsonList;
}

function continueBreak(jsonList, L0, L1) {
    for(var j in jsonList){
        if(jsonList[j].block_name === 'controls_statement_continue' || jsonList[j].block_name === 'controls_statement_break'){
            jsonList[j].label_0 = L0;
            jsonList[j].label_1 = L1;
        }

        if(jsonList[j].block_name === 'controls_statement_ifelse') {
            continueBreak(jsonList[j].structure[0].branchCode, L0, L1);
        }

    }
}


function bytecode_generator(commands) {
    return generator(commands);
}


function generator(commands) {
    var commandMap = {
        'command':{
            'print': '0x1f',
            'add': '0x02',
            'sub': '0x03',
            'mul': '0x04',
            'div': '0x05',
            'pow': '0x06',
            'abs': '0x07',
            'neg': '0x08',
            'isEven': '0x09',
            'isOdd': '0x0a',
            'isPositive': '0x0b',
            'isNegative': '0x0c',
            'isDivisibleBy': '0x0d',
            'remainder': '0x0e',
            'constrain': '0x0f',
            'randomInt': '0x10',
            'cmpe': '0x11',
            'cmpne': '0x12',
            'cmpl': '0x13',
            'cmple': '0x14',
            'cmpg': '0x15',
            'cmpge': '0x16',
            'negate': '0x19',
            'null': '0x1a',
            'stop': '0x21',
            'and': '0x24',
            'or': '0x25',
            'pinmode': '0x26',
            'dread': '0x27',
            'dwrite': '0x28',
            'aread': '0x29',
            'awrite': '0x2a',
            'delay': '0x2b'

        },
        'single_value':{
            'boolean': '0x20',
            'set': '0x1c',  // need an additional argument of address
            'get': '0x1b',
            'number': '0x01',
            'JUMPZ': '0x1d',
            'JUMP': '0x1e',
            'JUMPNZ': '0x22',
            'change': '0x23'
        },
        'label':{
            'L0': '0x00', // destination of jump, nothing to do
            'L1': '0x00' // destination of jump, nothing to do
        }
    };

    variable_map = {};
    addr = 0;
    jumpaddr = 0;

    // commands = commands.split("\n");

    var resultList = [];
    var command = '';
    var value = '';
    var index = {};
    for (var i in commands){
        command = commands[i].split(' ')[0];
        switch (command){
            case 'number':
                jumpaddr += 3;
                break;
            case 'set':
                jumpaddr += 3;
                break;
            case 'get':
                jumpaddr += 3;
                break;
            case 'change':
                jumpaddr += 3;
                break;
            case 'boolean':
                jumpaddr += 2;
                break;
            case 'JUMP':
                jumpaddr += 3;
                break;
            case 'JUMPZ':
                jumpaddr += 3;
                break;
            case 'JUMPNZ':
                jumpaddr += 3;
                break;
            case 'pinmode':
                jumpaddr += 3;
                break;
            case 'dread':
                jumpaddr += 3;
                break;
            case 'dwrite':
                jumpaddr += 3;
                break;
            case 'aread':
                jumpaddr += 3;
                break;
            case 'awrite':
                jumpaddr += 3;
                break;
            case 'delay':
                jumpaddr += 1;
                break;
            default:
                jumpaddr += 1;

        }

        if(command.split('_')[0] === 'L0' || command.split('_')[0] === 'L1'){

            index[command] = jumpaddr - 1;
            // console.log(index);
        }
    }

    for (var j in commands){
        if (commands[j] !== '' && commands[j] !== undefined){
            command = commands[j].split(' ')[0];
            value = '';
            if (commands[j].split(' ')[1]){
                value = commands[j].split(' ')[1];
            }

            resultList.push(getCommandByteCode(command, commandMap) + processValue(command, value, index));
            // console.log(getCommandByteCode(command, commandMap) + processValue(command, value, index)); //

        }
    }
    resultList.push('0x21');
    // console.log('0x21');

    return resultList;
}



function getCommandByteCode(command, commandMap){

    if (commandMap.command[command]){
        for (var [key, val] of Object.entries(commandMap.command)){
            if (key === command){
                return val;
            }
        }
    }
    else if(commandMap.single_value[command]){
        for (var [key, val] of Object.entries(commandMap.single_value)){
            if (key === command){
                return val;
            }
        }
    }
    else if(command.split('_')[0] === 'L0' || command.split('_')[0] === 'L1'){
        return commandMap.label[command.split('_')[0]];
    }
    else if(command == ''){
        return '';
    }

}

function processValue(command, value, index){
    if(command === 'number'){

        return int2Hex(parseInt(value));

    }
    else if(value === 'TRUE'|| value === 'FALSE'){
        switch (value){
            case 'TRUE':
                return ' 0x17';
            case 'FALSE':
                return ' 0x18';
        }
    }
    else if(value.split('_')[0] === 'L0' || value.split('_')[0] === 'L1'){
        return int2Hex(parseInt(index[value]));
    }
    else if(value !== ''){
        if (variable_map[value]){
            return variable_map[value];
        }
        else {
            variable_map[value] = int2Hex(parseInt(addr));
            addr += 2;
            return variable_map[value];
        }
    }
    else {
        return '';
    }
}

function int2Hex(value) {
    if(value < 0){
        value = (Math.pow(2, 16) + value).toString(16);

        for (var i = 0; i < (4 - value.length); i++){
            low_byte = '0' + low_byte;
        }

        var high_byte = value.substring(0,2);

        var low_byte = value.substring(2,4);


    }else{
        var val = value.toString(16);
        var val_len = val.length;
        if(val_len <= 4){
            for (var i = 0; i < (4 - val_len); i++){
                val = '0' + val;
            }
            var high_byte = val.substring(0, 2);
            var low_byte = val.substring(2, 4);

            return ' 0x' + low_byte + ' 0x' + high_byte;

        }
    }
    return ' 0x' + low_byte + ' 0x' + high_byte;
}
