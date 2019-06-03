module.exports = function (xmlString) {
    return json_generator(xmlString);
};


global.Blockly = require("./../blockly_uncompressed.js");
require('./../msg/messages.js');

require("./../generators/skoolbot.js");
require("./../generators/skoolbot/math.js");
require("./../generators/skoolbot.js");
require("./../generators/skoolbot/logic.js");
require("./../generators/skoolbot/loops.js");
require("./../generators/skoolbot/text.js");
require("./../generators/skoolbot/lists.js");
require("./../generators/skoolbot/colour.js");
require("./../generators/skoolbot/variables.js");
require("./../generators/skoolbot/variables_dynamic.js");
require("./../generators/skoolbot/procedures.js");

require("./../blocks/logic.js");
require("./../blocks/loops.js");
require("./../blocks/math.js");
require("./../blocks/text.js");
require("./../blocks/lists.js");
require("./../blocks/colour.js");
require("./../blocks/input_output.js");
require("./../blocks/variables.js");
require("./../blocks/variables_dynamic.js");
require("./../blocks/procedures.js");

require('jsdom-global')();
const jsdom = require("jsdom");
const xmldom = require('xmldom');

var JSDOM = jsdom.JSDOM;
global.DOMParser = xmldom.DOMParser;
global.document = new JSDOM('../core/xml_utils.js:').window.document;
global.document = new JSDOM('../core/xml.js:').window.document;




function json_generator(xmlString){
    xmlString = xmlString.replace("\ufeff", "");
    var xml = Blockly.Xml.textToDom(xmlString);
    var workspace = new Blockly.Workspace();

    Blockly.Xml.domToWorkspace(xml, workspace);
    var code = Blockly.Skoolbot.workspaceToCode(workspace);
    var codeJson = JSON.parse(code);

    return(codeJson);
}



