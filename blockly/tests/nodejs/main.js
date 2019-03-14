require('./../../blockly_uncompressedNodeJS.js');

require('./../../generators/skoolbot.js');
require('./../../generators/skoolbot/logic.js');
require('./../../generators/skoolbot/loops.js');
require('./../../generators/skoolbot/math.js');
require('./../../generators/skoolbot/text.js');
require('./../../generators/skoolbot/lists.js');
require('./../../generators/skoolbot/colour.js');
require('./../../generators/skoolbot/variables.js');
require('./../../generators/skoolbot/variables_dynamic.js');
require('./../../generators/skoolbot/procedures.js');

require('./../../blocks/logic.js');
require('./../../blocks/loops.js');
require('./../../blocks/math.js');
require('./../../blocks/text.js');
require('./../../blocks/lists.js');
require('./../../blocks/colour.js');
require('./../../blocks/variables.js');
require('./../../blocks/variables_dynamic.js');
require('./../../blocks/procedures.js');
require('./../blocks/test_blocks.js');

var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

global.document = new JSDOM('../../core/xml_utils.js:').window.document;

var workspace = new Blockly.Workspace();

//var parentBlock = workspace.newBlock('controls_if');
var parentBlock = workspace.newBlock('text');
//var parentBlock = workspace.newBlock('text_print');
var json = Blockly.Skoolbot.workspaceToCode(workspace);

//not show the error go to core/block.js line 921, 922 and 1454
console.log(json == "{ \"text\": \"\'\'\" }\n", json);
