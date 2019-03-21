///add block with name to workspace///

//var parentBlock = workspace.newBlock('text_print');
//var childBlock = workspace.newBlock('text');

// var parentConnection = parentBlock.getInput('TEXT').connection;
// var childConnection = childBlock.outputConnection;
// parentConnection.connect(childConnection);

// candidate is Blockly.Connection
// isConnectionAllowed(candidate) returns boolean
//Check if the two connections can be dragged to connect to each other

require("./../../blockly_uncompressed.js");
require('./../../msg/messages.js');

require('./../../skoolbot_compressed.js');
require('./../../blocks_compressed.js');
// require("./../../msg/messages.js");
// require("./../../blocks/logic.js");
// require("./../../blocks/loops.js");
// require("./../../blocks/math.js");
// require("./../../blocks/text.js");
// require("./../../blocks/lists.js");
// require("./../../blocks/colour.js");
// require("./../../blocks/variables.js");
// require("./../../blocks/variables_dynamic.js");
// require("./../../blocks/procedures.js");
//
// require("./../../generators/skoolbot/math.js");
// require("./../../generators/skoolbot.js");
// require("./../../generators/skoolbot/logic.js");
// require("./../../generators/skoolbot/loops.js");
// require("./../../generators/skoolbot/text.js");
// require("./../../generators/skoolbot/lists.js");
// require("./../../generators/skoolbot/colour.js");
// require("./../../generators/skoolbot/variables.js");
// require("./../../generators/skoolbot/variables_dynamic.js");
// require("./../../generators/skoolbot/procedures.js");

require('jsdom-global')()

const fs = require('fs');
const jsdom = require("jsdom");
const xmldom = require('xmldom');
var JSDOM = jsdom.JSDOM;
global.DOMParser = xmldom.DOMParser;

global.document = new JSDOM('../../core/xml_utils.js:').window.document;
global.document = new JSDOM('../../core/xml.js:').window.document;

//GOLDEN_RATIO is wrong
//need to use string raw for text blocks

fs.readFile("./test_cases/test_case_3.xml", "utf8", function(errFile, data) {
  if (!errFile) {
    try {
      //get rid of the non-white space error
      var xmlString = data.replace("\ufeff", "");
      var xml = Blockly.Xml.textToDom(xmlString);
      var workspace = new Blockly.Workspace();

      Blockly.Xml.domToWorkspace(xml, workspace);
      var code = Blockly.Skoolbot.workspaceToCode(workspace);
      console.log(code);
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log(errFile);
  }
});
