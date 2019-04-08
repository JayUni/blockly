// Do not edit this file; automatically generated by build.py.
'use strict';


Blockly.Skoolbot=new Blockly.Generator("Skoolbot");Blockly.Skoolbot.addReservedWords("_,__inext,assert,bit,colors,colours,coroutine,disk,dofile,error,fs,fetfenv,getmetatable,gps,help,io,ipairs,keys,loadfile,loadstring,math,native,next,os,paintutils,pairs,parallel,pcall,peripheral,print,printError,rawequal,rawget,rawset,read,rednet,redstone,rs,select,setfenv,setmetatable,sleep,string,table,term,textutils,tonumber,tostring,turtle,type,unpack,vector,write,xpcall,_VERSION,__indext,HTTP,and,break,do,else,elseif,end,false,for,function,if,in,local,nil,not,or,repeat,return,then,true,until,while,add,sub,mul,div,mod,pow,unm,concat,len,eq,lt,le,index,newindex,call,assert,collectgarbage,dofile,error,_G,getmetatable,inpairs,load,loadfile,next,pairs,pcall,print,rawequal,rawget,rawlen,rawset,select,setmetatable,tonumber,tostring,type,_VERSION,xpcall,require,package,string,table,math,bit32,io,file,os,debug");
Blockly.Skoolbot.ORDER_ATOMIC=0;Blockly.Skoolbot.ORDER_HIGH=1;Blockly.Skoolbot.ORDER_EXPONENTIATION=2;Blockly.Skoolbot.ORDER_UNARY=3;Blockly.Skoolbot.ORDER_MULTIPLICATIVE=4;Blockly.Skoolbot.ORDER_ADDITIVE=5;Blockly.Skoolbot.ORDER_CONCATENATION=6;Blockly.Skoolbot.ORDER_RELATIONAL=7;Blockly.Skoolbot.ORDER_AND=8;Blockly.Skoolbot.ORDER_OR=9;Blockly.Skoolbot.ORDER_NONE=99;
Blockly.Skoolbot.init=function(a){Blockly.Skoolbot.definitions_=Object.create(null);Blockly.Skoolbot.functionNames_=Object.create(null);Blockly.Skoolbot.variableDB_?Blockly.Skoolbot.variableDB_.reset():Blockly.Skoolbot.variableDB_=new Blockly.Names(Blockly.Skoolbot.RESERVED_WORDS_);Blockly.Skoolbot.variableDB_.setVariableMap(a.getVariableMap())};
Blockly.Skoolbot.finish=function(a){var b=[],c;for(c in Blockly.Skoolbot.definitions_)b.push(Blockly.Skoolbot.definitions_[c]);delete Blockly.Skoolbot.definitions_;delete Blockly.Skoolbot.functionNames_;Blockly.Skoolbot.variableDB_.reset();a=b.join(",")+a;a=a.replace(/(\r\n|\n|\r|\s+)/g,"");a=a.replace(/}{/g,"},{");return"["+a+"]"};Blockly.Skoolbot.scrubNakedValue=function(a){return a};
Blockly.Skoolbot.quote_=function(a){a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/"/g,'\\"');return"'"+a+"'"};
Blockly.Skoolbot.scrub_=function(a,b,c){var d="";if(!a.outputConnection||!a.outputConnection.targetConnection){var e=a.getCommentText();(e=Blockly.utils.wrap(e,Blockly.Skoolbot.COMMENT_WRAP-3))&&(d+=Blockly.Skoolbot.prefixLines(e,"-- ")+"\n");for(var f=0;f<a.inputList.length;f++)a.inputList[f].type==Blockly.INPUT_VALUE&&(e=a.inputList[f].connection.targetBlock())&&(e=Blockly.Skoolbot.allNestedComments(e))&&(d+=Blockly.Skoolbot.prefixLines(e,"-- "))}a=a.nextConnection&&a.nextConnection.targetBlock();
c=c?"":Blockly.Skoolbot.blockToCode(a);return d+b+c};Blockly.Skoolbot.colour={};Blockly.Skoolbot.colour_picker=function(a){return['{ "block_name": "colour_colour_picker", "colour": "'+a.getFieldValue("COLOUR")+'"}',Blockly.Skoolbot.ORDER_ATOMIC]};function randomHex(){for(var a="#",b=0;6>b;++b)a+=Math.floor(16*Math.random()).toString(16).toUpperCase();return a}Blockly.Skoolbot.colour_random=function(a){return['{"block_name": "colour_colour_random", "colour": "'+randomHex()+'"}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.colour_rgb=function(a){var b=Blockly.Skoolbot.valueToCode(a,"RED",Blockly.Skoolbot.ORDER_ATOMIC),c=Blockly.Skoolbot.valueToCode(a,"GREEN",Blockly.Skoolbot.ORDER_ATOMIC);a=Blockly.Skoolbot.valueToCode(a,"BLUE",Blockly.Skoolbot.ORDER_ATOMIC);return['{"block_name": "colour_colour_rgb", "argument":['+b+", "+c+","+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.colour_blend=function(a){var b=Blockly.Skoolbot.valueToCode(a,"COLOUR1",Blockly.Skoolbot.ORDER_ATOMIC),c=Blockly.Skoolbot.valueToCode(a,"COLOUR2",Blockly.Skoolbot.ORDER_ATOMIC);a=Blockly.Skoolbot.valueToCode(a,"RATIO",Blockly.Skoolbot.ORDER_ATOMIC);return['{ "block_name": "colour_colour_blend", "argument": [{ "block_name": "colour_picker", "colour1": '+b+'}, { "block_name": "colour_picker", "colour2": '+c+"}, "+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.lists={};Blockly.Skoolbot.lists_create_empty=function(a){return['{ "functionName": "lists_create_empty" }',Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.lists_create_with=function(a){for(var b=Array(a.itemCount_),c=0;c<a.itemCount_;c++)b[c]=Blockly.Skoolbot.valueToCode(a,"ADD"+c,Blockly.Skoolbot.ORDER_NONE)||"{}";return['{ "functionName": "lists_create_with", "argument": ['+b.join(", ")+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.lists_repeat=function(a){var b=Blockly.Skoolbot.valueToCode(a,"ITEM",Blockly.Skoolbot.ORDER_NONE)||"{}";a=Blockly.Skoolbot.valueToCode(a,"NUM",Blockly.Skoolbot.ORDER_NONE)||"0";return['{ "functionName": "lists_repeat", "argument": [{ "element": '+b+'}, { "repeat_count": '+a+"}]}",Blockly.Skoolbot.ORDER_HIGH]};
Blockly.Skoolbot.lists_length=function(a){return['{ "functionName": "lists_length", "argument": [{ "list": '+(Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_UNARY)||"[]")+"}]}",Blockly.Skoolbot.ORDER_UNARY]};Blockly.Skoolbot.lists_isEmpty=function(a){return['{ "functionName": "lists_isEmpty", "argument": [{ "list": '+(Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_UNARY)||"[]")+"}]}",Blockly.Skoolbot.ORDER_RELATIONAL]};
Blockly.Skoolbot.lists_indexOf=function(a){var b=Blockly.Skoolbot.valueToCode(a,"FIND",Blockly.Skoolbot.ORDER_NONE)||"\"''\"";return['{ "functionName": "lists_indexOf", "argument": [{ "list": '+(Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_NONE)||"[]")+'},{ "target": '+b+"}]}",Blockly.Skoolbot.ORDER_HIGH]};
Blockly.Skoolbot.lists_getIndex=function(a){var b=a.getFieldValue("MODE")||"GET",c=a.getFieldValue("WHERE")||"FROM_START",d=Blockly.Skoolbot.valueToCode(a,"AT",Blockly.Skoolbot.ORDER_ADDITIVE)||'{ "number": "1"}';a=Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_HIGH)||"[]";return"RANDOM"==c?'{ "functionName": "lists_getIndex", "argument": [{ "list": '+a+'}, {"mode": "'+b+'"}, { "where": "'+c+'"}]}':'{ "functionName": "lists_getIndex", "argument": [{ "list": '+a+'}, {"mode": "'+b+'"}, { "where": "'+
c+'"}, { "index": '+d+"}]}"};
Blockly.Skoolbot.lists_setIndex=function(a){var b=Blockly.Skoolbot.valueToCode(a,"LIST",Blockly.Skoolbot.ORDER_HIGH)||"[]",c=a.getFieldValue("MODE")||"SET",d=a.getFieldValue("WHERE")||"FROM_START",e=Blockly.Skoolbot.valueToCode(a,"AT",Blockly.Skoolbot.ORDER_ADDITIVE)||'{ "number": "1"}';a=Blockly.Skoolbot.valueToCode(a,"TO",Blockly.Skoolbot.ORDER_NONE)||"\"''\"";return'{ "functionName": "lists_setIndex", "argument": [{ "list": '+b+'}, {"mode": "'+c+'"}, { "where": "'+d+'"}, { "index": "'+e+'"}, {"value": '+
a+"}]}"};
Blockly.Skoolbot.lists_getSublist=function(a){var b=Blockly.Skoolbot.valueToCode(a,"LIST",Blockly.Skoolbot.ORDER_NONE)||"[]",c=a.getFieldValue("WHERE1"),d=a.getFieldValue("WHERE2"),e=Blockly.Skoolbot.valueToCode(a,"AT1",Blockly.Skoolbot.ORDER_NONE)||'{ "number": "1"}';a=Blockly.Skoolbot.valueToCode(a,"AT2",Blockly.Skoolbot.ORDER_NONE)||'{ "number": "1"}';return['{ "functionName": "lists_getSublist", "argument": [{ "list": '+b+'}, {"start_where": "'+c+'"}, {"start_index": '+e+'}, {"end_where": "'+d+
'"}, {"end_index": '+a+"}]}",Blockly.Skoolbot.ORDER_HIGH]};Blockly.Skoolbot.lists_sort=function(a){var b=Blockly.Skoolbot.valueToCode(a,"LIST",Blockly.Skoolbot.ORDER_NONE)||"[]",c="1"===a.getFieldValue("DIRECTION")?1:-1;a=a.getFieldValue("TYPE");return['{ "functionName": "lists_sort", "argument": [{ "list": '+b+'}, {"direction": "'+c+'"}, { "type": "'+a+'"}]}',Blockly.Skoolbot.ORDER_HIGH]};
Blockly.Skoolbot.lists_split=function(a){var b=Blockly.Skoolbot.valueToCode(a,"INPUT",Blockly.Skoolbot.ORDER_NONE)||"[]",c=Blockly.Skoolbot.valueToCode(a,"DELIM",Blockly.Skoolbot.ORDER_NONE)||"''";a=a.getFieldValue("MODE");return['{ "functionName": "lists_split", "argument": [{ "list": '+b+'}, {"mode": "'+a+'"}, { "delimiter": '+c+"}]}",Blockly.Skoolbot.ORDER_HIGH]};
Blockly.Skoolbot.lists_reverse=function(a){return['{ "functionName": "lists_reverse", "argument": [{ "list": '+(Blockly.Skoolbot.valueToCode(a,"LIST",Blockly.Skoolbot.ORDER_NONE)||"[]")+"}]}",Blockly.Skoolbot.ORDER_HIGH]};Blockly.Skoolbot.logic={};
Blockly.Skoolbot.controls_if=function(a){var b=0,c='{ "block_name": "controls_statement_ifStructure", "structure": [{ "block_name": "controls_statement_if", "statements": "';do{var d=Blockly.Skoolbot.valueToCode(a,"IF"+b,Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "logic_boolean_boolean", "value": "FALSE"}';var e=Blockly.Skoolbot.statementToCode(a,"DO"+b)||"";c=0<b?c+('}, { "block_name": "controls_statement_elseif", "statements": "else if", "condition": '+d+', "branchCode":['+e+"]"):c+('if", "condition": '+
d+', "branchCode": ['+e+"]");++b}while(a.getInput("IF"+b));a.getInput("ELSE")?(e=Blockly.Skoolbot.statementToCode(a,"ELSE")||"",c+='}, { "block_name": "controls_statement_else", "statements": "else", "branchCode": ['+e+"]}]"):c+="}]";return c+"}"};Blockly.Skoolbot.controls_ifelse=Blockly.Skoolbot.controls_if;
Blockly.Skoolbot.logic_compare=function(a){var b={EQ:"cmpe",NEQ:"cmpne",LT:"cmpl",LTE:"cmple",GT:"cmpg",GTE:"cmpge"}[a.getFieldValue("OP")],c=Blockly.Skoolbot.valueToCode(a,"A",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "logic_null_null", "value": "NULL"}';a=Blockly.Skoolbot.valueToCode(a,"B",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "logic_null_null", "value": "NULL"}';return['{ "block_name": "logic_boolean_operator_compare", "operator": "'+b+'", "argument": ['+c+","+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.logic_operation=function(a){var b="AND"==a.getFieldValue("OP")?"and":"or",c=Blockly.Skoolbot.ORDER_ATOMIC,d=Blockly.Skoolbot.valueToCode(a,"A",c)||'{ "block_name": "logic_boolean_boolean", "value": "FALSE"}';a=Blockly.Skoolbot.valueToCode(a,"B",c)||'{ "block_name": "logic_boolean_boolean", "value": "FALSE"}';return['{ "block_name": "logic_boolean_operator_logicOperation", "operator": "'+b+'", "argument": ['+d+","+a+"]}",c]};
Blockly.Skoolbot.logic_negate=function(a){return['{ "block_name": "logic_boolean_operator_logicNegate", "operator": "negate", "argument": ['+(Blockly.Skoolbot.valueToCode(a,"BOOL",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "logic_boolean_boolean", "value": "TRUE"}')+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.logic_boolean=function(a){return['{ "block_name": "logic_boolean_boolean", "value": '+("TRUE"==a.getFieldValue("BOOL")?'"TRUE"':'"FALSE"')+"}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.logic_null=function(a){return['{ "block_name": "logic_null_null", "value": "NULL"}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.logic_ternary=function(a){var b=Blockly.Skoolbot.valueToCode(a,"IF",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "logic_boolean_boolean", "value": "FALSE"}',c=Blockly.Skoolbot.valueToCode(a,"THEN",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "logic_null_null", "value": "NULL"}';a=Blockly.Skoolbot.valueToCode(a,"ELSE",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "logic_null_null", "value": "NULL"}';return['{ "block_name": "logic_statement_logicTernary", "if": '+b+', "ifTrue": '+
c+', "ifFalse": '+a+"}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.loops={};Blockly.Skoolbot.CONTINUE_STATEMENT="goto continue\n";Blockly.Skoolbot.addContinueLabel=function(a){return-1<a.indexOf(Blockly.Skoolbot.CONTINUE_STATEMENT)?a+Blockly.Skoolbot.INDENT+"::continue::\n":a};
Blockly.Skoolbot.controls_repeat=function(a){var b=parseInt(a.getFieldValue("TIMES"),10);a=Blockly.Skoolbot.statementToCode(a,"DO");a=Blockly.Skoolbot.addContinueLabel(a)||"";return'{ "block_name": "controls_statement_repeat", "loop_style": "controls_repeat", "repeat_times": '+b+', "branch": ['+a+"]}"};
Blockly.Skoolbot.controls_repeat_ext=function(a){var b=Blockly.Skoolbot.valueToCode(a,"TIMES",Blockly.Skoolbot.ORDER_ATOMIC)||"";b=Blockly.isNumber(b)?parseInt(b,10):'{ "block_name": "controls_statement_repeatExt", "operator": "math.floor", "argument": '+b+"}";a=Blockly.Skoolbot.statementToCode(a,"DO");a=Blockly.Skoolbot.addContinueLabel(a)||"";return'{ "block_name": "controls_statement_repeat", "loop_style": "controls_repeat_ext", "repeat_times": '+b+', "branch": ['+a+"]}"};
Blockly.Skoolbot.controls_whileUntil=function(a){var b="UNTIL"==a.getFieldValue("MODE"),c=Blockly.Skoolbot.valueToCode(a,"BOOL",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "logic_boolean_boolean", "value": "FALSE"}',d=Blockly.Skoolbot.statementToCode(a,"DO");d=Blockly.Skoolbot.addLoopTrap(d,a.id);d=Blockly.Skoolbot.addContinueLabel(d)||"";return'{ "block_name": "controls_statement_whileUntil", "loop_style": "controls_whileUntil","repeat_condition": '+c+',"end_type": '+(b?'"until"':'"while"')+
',"branch": ['+d+"]}"};
Blockly.Skoolbot.controls_for=function(a){var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Skoolbot.valueToCode(a,"FROM",Blockly.Skoolbot.ORDER_ATOMIC)||"0",d=Blockly.Skoolbot.valueToCode(a,"TO",Blockly.Skoolbot.ORDER_ATOMIC)||"0",e=Blockly.Skoolbot.valueToCode(a,"BY",Blockly.Skoolbot.ORDER_ATOMIC)||"1",f=Blockly.Skoolbot.statementToCode(a,"DO");f=Blockly.Skoolbot.addLoopTrap(f,a.id);f=Blockly.Skoolbot.addContinueLabel(f)||"";return'{ "block_name": "controls_statement_for", "loop_style": "controls_for", "variable": "'+
b+'", "start": '+c+', "end": '+d+', "step": '+e+', "branch": ['+f+"]}"};
Blockly.Skoolbot.controls_forEach=function(a){var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Skoolbot.valueToCode(a,"LIST",Blockly.Skoolbot.ORDER_ATOMIC)||"[]";a=Blockly.Skoolbot.statementToCode(a,"DO");a=Blockly.Skoolbot.addContinueLabel(a)||"";return'{ "block_name": "controls_statement_forEach", "loop_style": "controls_forEach", "varName": "'+b+'", "list": '+c+', "branch": ['+a+"]}"};
Blockly.Skoolbot.controls_flow_statements=function(a){switch(a.getFieldValue("FLOW")){case "BREAK":return'{ "block_name": "controls_statement_break", "statements": "break" }';case "CONTINUE":return'{ "block_name": "controls_statement_continue", "statements": "continue" }'}throw Error("Unknown flow statement.");};Blockly.Skoolbot.math={};Blockly.Skoolbot.math_number=function(a){return['{ "block_name": "math_number_number", "number": "'+parseFloat(a.getFieldValue("NUM"))+'" }',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_arithmetic=function(a){var b={ADD:[" add ",Blockly.Skoolbot.ORDER_ATOMIC],MINUS:[" sub ",Blockly.Skoolbot.ORDER_ATOMIC],MULTIPLY:[" mul ",Blockly.Skoolbot.ORDER_ATOMIC],DIVIDE:[" div ",Blockly.Skoolbot.ORDER_ATOMIC],POWER:[" pow ",Blockly.Skoolbot.ORDER_ATOMIC]}[a.getFieldValue("OP")],c=b[0];b=b[1];var d=Blockly.Skoolbot.valueToCode(a,"A",b)||'{ "block_name": "math_number_number", "number": "0"}';a=Blockly.Skoolbot.valueToCode(a,"B",b)||'{ "block_name": "math_number_number", "number": "0"}';
return['{ "block_name": "math_arithmetic_operator", "operator": "'+c+'", "argument": ['+d+","+a+"]}",b]};
Blockly.Skoolbot.math_single=function(a){var b={ABS:"abs",EXP:"exp",LN:"ln",LOG10:"log10",NEG:"neg",POW10:"pow10",ROOT:"sqrt",ROUND:"round",SIN:"sin",COS:"cos",TAN:"tan",ASIN:"asin",ACOS:"acos",ATAN:"atan"}[a.getFieldValue("OP")];a=Blockly.Skoolbot.valueToCode(a,"NUM",Blockly.Skoolbot.ORDER_ATOMIC);return['{ "block_name": "math_number_operator_single", "operator": "'+b+'", "argument":['+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_constant=function(a){return{PI:['{ "block_name": "math_number_number_constant", "value": "PI"}',Blockly.Skoolbot.ORDER_ATOMIC],E:['{ "block_name": "math_number_number_constant", "value": "e" }',Blockly.Skoolbot.ORDER_ATOMIC],GOLDEN_RATIO:['{ "block_name": "math_arithmetic_operator", "operator": "div", "argument":[{ "block_name": "math_arithmetic_operator", "operator": "add", "argument": [{ "block_name": "math_number_number", "number": "1"} , { "block_name": "math_number_operator", "operator": "sqrt", "argument":[{ "block_name": "math_number_number", "number": "5"}]}]}, { "block_name": "math_number_number", "number": "2"}]}',
Blockly.Skoolbot.ORDER_ATOMIC],SQRT2:['{ "block_name": "math_arithmetic_operator", "operator": "sqrt", "argument": [{ "block_name": "math_number_number", "number": 2}]}',Blockly.Skoolbot.ORDER_ATOMIC],SQRT1_2:['{ "block_name": "math_arithmetic_operator", "operator": "sqrt", "argument": [{ "block_name": "math_number_number", "number": 0.5}]}',Blockly.Skoolbot.ORDER_ATOMIC],INFINITY:['{ "block_name": "math_number_number_constant", "value": "INFINITY"}',Blockly.Skoolbot.ORDER_ATOMIC]}[a.getFieldValue("CONSTANT")]};
Blockly.Skoolbot.math_number_property=function(a){var b=Blockly.Skoolbot.valueToCode(a,"NUMBER_TO_CHECK",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "0"}',c=a.getFieldValue("PROPERTY");if("PRIME"==c)return['{ "block_name": "math_boolean_numberProperty", "functionName": "isPrime", "argument": ['+b+"]}",Blockly.Skoolbot.ORDER_ATOMIC];switch(c){case "EVEN":var d='{ "block_name": "math_boolean_numberProperty", "functionName": "isEven", "argument": ['+b+"]}";break;
case "ODD":d='{ "block_name": "math_boolean_numberProperty", "functionName": "isOdd", "argument": ['+b+"]}";break;case "WHOLE":d='{ "block_name": "math_boolean_numberProperty", "functionName": "isWhole", "argument": ['+b+"]}";break;case "POSITIVE":d='{ "block_name": "math_boolean_numberProperty", "functionName": "isPositive", "argument": ['+b+"]}";break;case "NEGATIVE":d='{ "block_name": "math_boolean_umberProperty", "functionName": "isNegative", "argument": ['+b+"]}";break;case "DIVISIBLE_BY":a=
Blockly.Skoolbot.valueToCode(a,"DIVISOR",Blockly.Skoolbot.ORDER_ATOMIC),d='{ "block_name": "math_boolean_numberProperty", "functionName": "isDivisibleBy", "argument":['+b+","+a+"]}"}return[d,Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_change=function(a){var b=Blockly.Skoolbot.valueToCode(a,"DELTA",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "0"}';return'{ "block_name": "math_statement_function_change", "functionName": "change", "varName": "'+Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+'", "argument": ['+b+"]}"};Blockly.Skoolbot.math_round=Blockly.Skoolbot.math_single;Blockly.Skoolbot.math_trig=Blockly.Skoolbot.math_single;
Blockly.Skoolbot.math_on_list=function(a){var b=a.getFieldValue("OP");a=Blockly.Skoolbot.valueToCode(a,"LIST",Blockly.Skoolbot.ORDER_ATOMIC)||"{}";return['{ "block_name": "math_statement_function_onList", "functionName": "'+b+'", "argument": ['+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_modulo=function(a){var b=Blockly.Skoolbot.valueToCode(a,"DIVIDEND",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "0"}';a=Blockly.Skoolbot.valueToCode(a,"DIVISOR",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "0"}';return['{ "block_name": "math_number_operator_modulo", "operator": "%", "argument":['+b+","+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_constrain=function(a){var b=Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC),c=Blockly.Skoolbot.valueToCode(a,"LOW",Blockly.Skoolbot.ORDER_ATOMIC);a=Blockly.Skoolbot.valueToCode(a,"HIGH",Blockly.Skoolbot.ORDER_ATOMIC);return['{ "block_name": "math_number_operator_constrain", "operator": "constrain", "argument":['+b+", "+c+", "+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_random_int=function(a){var b=Blockly.Skoolbot.valueToCode(a,"FROM",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "0"}';a=Blockly.Skoolbot.valueToCode(a,"TO",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "0"}';return['{ "block_name": "math_number_function_randomInt", "functionName": "randomInt", "argument": ['+b+", "+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_random_float=function(a){return['{ "block_name": "math_number_function_randomFloat", "number": "randomFloat"}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_atan2=function(a){var b=Blockly.Skoolbot.valueToCode(a,"X",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "0"}';a=Blockly.Skoolbot.valueToCode(a,"Y",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "0"}';return['{ "block_name": "math_number_operator_atan2", "operator": "atan2","argument":['+b+","+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.procedures={};
Blockly.Skoolbot.procedures_defreturn=function(a){var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=Blockly.Skoolbot.statementToCode(a,"STACK");if(Blockly.Skoolbot.STATEMENT_PREFIX){var d=a.id.replace(/\$/g,"$$$$");c=Blockly.Skoolbot.prefixLines(Blockly.Skoolbot.STATEMENT_PREFIX.replace(/%1/g,"'"+d+"'"),Blockly.Skoolbot.INDENT)+c}Blockly.Skoolbot.INFINITE_LOOP_TRAP&&(c=Blockly.Skoolbot.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+a.id+"'")+c);d=Blockly.Skoolbot.valueToCode(a,
"RETURN",Blockly.Skoolbot.ORDER_ATOMIC)||'{"null": "NULL"}';d=Blockly.Skoolbot.INDENT+d;for(var e=[],f=0;f<a.arguments_.length;f++)e[f]='{ "argument'+f+'": "'+Blockly.Skoolbot.variableDB_.getName(a.arguments_[f],Blockly.Variables.NAME_TYPE)+'"}';a=Blockly.Skoolbot.scrub_(a,"",!1);a=a.replace(/\n/g," ");c='{ "block_name": "procedures_statement_defreturn", "funcName": "'+b+'", "description": "'+a+'", "argument": ['+e.join(", ")+'], "branch": ['+c+'], "return_value": '+d+"}";Blockly.Skoolbot.definitions_["%"+
b]=c;return null};Blockly.Skoolbot.procedures_defnoreturn=Blockly.Skoolbot.procedures_defreturn;Blockly.Skoolbot.procedures_callreturn=function(a){for(var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Skoolbot.valueToCode(a,"ARG"+d,Blockly.Skoolbot.ORDER_ATOMIC)||'{"null": "NULL"}';return['{ "block_name": "procedures_statement_callreturn", "funcName": "'+b+'", "argument": ['+c.join(", ")+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.procedures_callnoreturn=function(a){for(var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Skoolbot.valueToCode(a,"ARG"+d,Blockly.Skoolbot.ORDER_ATOMIC);return'{ "block_name": "procedures_statement_callnoreturn", "funcName": "'+b+'", "argument": ['+c.join(", ")+"]}"};
Blockly.Skoolbot.procedures_ifreturn=function(a){var b=Blockly.Skoolbot.valueToCode(a,"CONDITION",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "boolean": "FALSE"}',c=Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)||'{"null": "NULL"}';return a.hasReturnValue_?'{ "block_name": "procedures_statement_ifreturn", "condition": '+b+', "has_return_value": { "boolean": "TRUE"}, "return":  ['+c+"]}":'{ "block_name": "procedures_statement_ifreturn", "condition": '+b+', "has_return_value": { "boolean": "FALSE"}, "return":  ['+
c+"]}"};Blockly.Skoolbot.texts={};Blockly.Skoolbot.text=function(a){return['{ "block_name": "text_string_text", "text": "'+Blockly.Skoolbot.quote_(a.getFieldValue("TEXT"))+'" }',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_join=function(a){for(var b=[],c=0;c<a.itemCount_;c++)b[c]=Blockly.Skoolbot.valueToCode(a,"ADD"+c,Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "text_string_text", "text": "\'\'" }';return['{ "block_name": "text_string_join", "functionName": "text_join", "argument": ['+b.join(", ")+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_append=function(a){var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE);a=Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC);return'{ "block_name": "text_string_append", "functionName": "text_append", "argument": [{ "varName": "'+b+'"}, { "block_name": "text_string_textAppend", "text_append": '+a+"}]}"};
Blockly.Skoolbot.text_length=function(a){return['{ "block_name": "text_number_length", "functionName": "text_length", "argument": ['+Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.text_isEmpty=function(a){return['{ "block_name": "text_boolean_isEmpty", "functionName": "text_isEmpty", "argument": ['+Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_indexOf=function(a){var b=Blockly.Skoolbot.valueToCode(a,"FIND",Blockly.Skoolbot.ORDER_ATOMIC),c=Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC);a=a.getFieldValue("END");return['{ "block_name": "text_number_indexOf", "functionName": "text_indexOf", "argument": ['+c+', {"end": "'+a+'"}, { "block_name": "text_string_substring", "substring": '+b+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_charAt=function(a){var b=a.getFieldValue("WHERE")||"FROM_START",c=Blockly.Skoolbot.valueToCode(a,"AT",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "1"}';return['{ "block_name": "text_string_chatAt", "functionName": "text_charAt", "argument": ['+Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)+', {"where": "'+b+'"}, {"index": '+c+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_getSubstring=function(a){var b=Blockly.Skoolbot.valueToCode(a,"STRING",Blockly.Skoolbot.ORDER_ATOMIC),c=a.getFieldValue("WHERE1"),d=Blockly.Skoolbot.valueToCode(a,"AT1",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "math_number_number", "number": "1"}',e=a.getFieldValue("WHERE2");a=Blockly.Skoolbot.valueToCode(a,"AT2","FROM_END"==e?Blockly.Skoolbot.ORDER_ATOMIC:Blockly.Skoolbot.ORDER_NONE)||'{ "block_name": "math_number_number", "number": "1"}';return['{ "block_name": "text_string_getSubstring", "functionName": "text_getSubstring", "argument": [{ "block_name": "variables_variable_variable", "text": '+
b+'}, { "start_where": "'+c+'"}, { "block_name": "text_number_startAt", "start_index": '+d+'}, { "end_where": "'+e+'"}, { "block_name": "text_number_endAt", "end_index": '+a+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_changeCase=function(a){var b=a.getFieldValue("CASE");return['{ "block_name": "text_string_join", "functionName": "text_changeCase", "argument": [{ "block_name": "variables_variable_variable", "text": '+Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)+'}, { "block_name": "text_string_changeCaseType", "change_case_type": "'+b+'"}]}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_trim=function(a){var b=a.getFieldValue("MODE");return['{ "block_name": "text_string_trim", "functionName": "text_trim", "argument": [{ "block_name": "variables_variable_variable", "text": '+Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)+'}, { "which_side": "'+b+'"}]}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_print=function(a){return'{ "block_name": "text_statement_print", "functionName": "text_print", "argument": ['+Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)+"]}"};
Blockly.Skoolbot.text_prompt_ext=function(a){var b=a.getField("TEXT")?Blockly.Skoolbot.quote_(a.getFieldValue("TEXT")):Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC),c='{ "block_name": "text_statement_promptExt", "functionName": "text_prompt", "argument": ['+b+"] }";"NUMBER"==a.getFieldValue("TYPE")&&(c='{ "block_name": "text_statement_promptExt", "functionName": "text_prompt", "argument": ['+b+"] }");return[c,Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.text_prompt=Blockly.Skoolbot.text_prompt_ext;
Blockly.Skoolbot.text_count=function(a){var b=Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC);a=Blockly.Skoolbot.valueToCode(a,"SUB",Blockly.Skoolbot.ORDER_ATOMIC);return['{ "block_name": "text_number_count", "functionName": "text_count", "argument": ['+b+', { "block_name": "text_string_substring", "substring": '+a+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_replace=function(a){var b=Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC),c=Blockly.Skoolbot.valueToCode(a,"FROM",Blockly.Skoolbot.ORDER_ATOMIC);a=Blockly.Skoolbot.valueToCode(a,"TO",Blockly.Skoolbot.ORDER_ATOMIC);return['{"block_name": "text_string_replace", "functionName": "text_replace", "argument": ['+b+', { "block_name": "text_string_currentStr", " urrentStr": '+c+'}, { "block_name": "text_string_targetStr", "targetStr": '+a+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_reverse=function(a){return['{ "block_name": "text_string_reverse", "functionName": "text_reverse", "argument": ['+Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.variables={};Blockly.Skoolbot.variables_get=function(a){return['{ "block_name": "variables_statement_get", "functionName": "variables_get", "varName": "'+Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+'"}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.variables_set=function(a){var b=Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "block_name": "logic_null_null", "value": "NULL"}';return'{ "block_name": "variables_statement_set", "functionName": "variables_set", "varName": "'+Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+'", "argument": ['+b+"]}"};
Blockly.Skoolbot.variablesDynamic={};Blockly.Skoolbot.variables_get_dynamic=Blockly.Skoolbot.variables_get;Blockly.Skoolbot.variables_set_dynamic=Blockly.Skoolbot.variables_set;