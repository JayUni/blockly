
// try {
require('./../../blockly_uncompressedNodeJS.js');
require('./../../msg/messages.js');

require('./../../skoolbot_compressed.js');
// require('./../../generators/skoolbot.js');
// require('./../../generators/skoolbot/logic.js');
// require('./../../generators/skoolbot/loops.js');
// require('./../../generators/skoolbot/math.js');
// require('./../../generators/skoolbot/text.js');
// require('./../../generators/skoolbot/lists.js');
// require('./../../generators/skoolbot/colour.js');
// require('./../../generators/skoolbot/variables.js');
// require('./../../generators/skoolbot/variables_dynamic.js');
// require('./../../generators/skoolbot/procedures.js');

require('./../../blocks_compressed.js');
// require('./../../blocks/logic.js');
// require('./../../blocks/loops.js');
// require('./../../blocks/math.js');
// require('./../../blocks/text.js');
// require('./../../blocks/lists.js');
// require('./../../blocks/colour.js');
// require('./../../blocks/variables.js');
// require('./../../blocks/variables_dynamic.js');
// require('./../../blocks/procedures.js');
// require('./../blocks/test_blocks.js');

var fs = require('fs');
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

global.DOMParser = require('xmldom').DOMParser;
global.document = new JSDOM('../../core/xml_utils.js:').window.document;

var workspace = new Blockly.Workspace();

fs.readFile("./test.xml", "utf8", function(errFile, data) {
  if (!errFile) {
      //get rid of the non-white space error
      var xmlString = data.replace("\ufeff", "");
      var xml = Blockly.Xml.textToDom(xmlString);
      Blockly.Xml.domToWorkspace(xml, workspace);
      var code = Blockly.Skoolbot.workspaceToCode(workspace);
      console.log(code);
    } else {
      //console.log(errFile);
    }
});



//var parentBlock = workspace.newBlock('controls_if');
//var parentBlock = workspace.newBlock('text');
//var parentBlock = workspace.newBlock('text_print');

// var parentConnection = parentBlock.getInput('TEXT').connection;
// var childConnection = childBlock.outputConnection;
// parentConnection.connect(childConnection);

// candidate is Blockly.Connection
// isConnectionAllowed(candidate) returns boolean
//Check if the two connections can be dragged to connect to each other

//not show the error go to core/block.js line 921, 922 and 1454
//console.log(json == "{ \"text\": \"\'\'\" }\n", json);
// }
// catch (e) {
// console.log('oh no big error');
// console.log(e);
// }
