require("./../../blockly_uncompressed.js");
require('./../../msg/messages.js');
require('./../../skoolbot_compressed.js');
require('./../../blocks_compressed.js');

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

var addTypeField = require('../../Skoolbot/addTypeField.js');

var JSDOM = jsdom.JSDOM;
global.DOMParser = xmldom.DOMParser;

global.document = new JSDOM('../../core/xml_utils.js:').window.document;
global.document = new JSDOM('../../core/xml.js:').window.document;

fs.readFile("./" + process.argv[2], "utf8", function(errFile, data) {
  if (!errFile) {
    try {
      //get rid of the non-white space error
      var xmlString = data.replace("\ufeff", "");
      var xml = Blockly.Xml.textToDom(xmlString);
      var workspace = new Blockly.Workspace();

      Blockly.Xml.domToWorkspace(xml, workspace);
      var code = Blockly.Skoolbot.workspaceToCode(workspace);
      var codeJson = JSON.parse(code);

      if(process.argv.length == 3) {
        console.log(JSON.stringify(codeJson, null, 4));
      } else if (process.argv.length == 4) {
        if (process.argv[3] == "true") {
          addTypeField.addTypeField(codeJson);
        }
      } else {
        console.log("wrong argument");
      }

    } catch (e) {
      console.log(e);
    }
  } else {
    console.log(errFile);
  }
});
