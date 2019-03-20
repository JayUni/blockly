///add block with name to workspace///

//var parentBlock = workspace.newBlock('text_print');
//var childBlock = workspace.newBlock('text');

// var parentConnection = parentBlock.getInput('TEXT').connection;
// var childConnection = childBlock.outputConnection;
// parentConnection.connect(childConnection);

// candidate is Blockly.Connection
// isConnectionAllowed(candidate) returns boolean
//Check if the two connections can be dragged to connect to each other

require('./../../blockly_uncompressedNodeJS.js');
require('./../../msg/messages.js');

require('./../../skoolbot_compressed.js');
require('./../../blocks_compressed.js');

require('jsdom-global')()

const fs = require('fs');
const jsdom = require("jsdom");
const xmldom = require('xmldom');
var JSDOM = jsdom.JSDOM;
global.DOMParser = xmldom.DOMParser;

global.document = new JSDOM('../../core/xml_utils.js:').window.document;
global.document = new JSDOM('../../core/xml.js:').window.document;
//fix xml.js 231 and block.js 926-942
//try to go to set style comment from the begining
fs.readFile("./test_cases/test_case_1.xml", "utf8", function(errFile, data) {
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
      // comment out core/block.js line 1454 to ignore the style error
      //solve by checking the environment
  } else {
    console.log(errFile);
  }
});
