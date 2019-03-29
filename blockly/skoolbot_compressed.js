// Do not edit this file; automatically generated by build.py.
'use strict';


Blockly.Skoolbot=new Blockly.Generator("Skoolbot");Blockly.Skoolbot.addReservedWords("_,__inext,assert,bit,colors,colours,coroutine,disk,dofile,error,fs,fetfenv,getmetatable,gps,help,io,ipairs,keys,loadfile,loadstring,math,native,next,os,paintutils,pairs,parallel,pcall,peripheral,print,printError,rawequal,rawget,rawset,read,rednet,redstone,rs,select,setfenv,setmetatable,sleep,string,table,term,textutils,tonumber,tostring,turtle,type,unpack,vector,write,xpcall,_VERSION,__indext,HTTP,and,break,do,else,elseif,end,false,for,function,if,in,local,nil,not,or,repeat,return,then,true,until,while,add,sub,mul,div,mod,pow,unm,concat,len,eq,lt,le,index,newindex,call,assert,collectgarbage,dofile,error,_G,getmetatable,inpairs,load,loadfile,next,pairs,pcall,print,rawequal,rawget,rawlen,rawset,select,setmetatable,tonumber,tostring,type,_VERSION,xpcall,require,package,string,table,math,bit32,io,file,os,debug");
Blockly.Skoolbot.ORDER_ATOMIC=0;Blockly.Skoolbot.ORDER_HIGH=1;Blockly.Skoolbot.ORDER_EXPONENTIATION=2;Blockly.Skoolbot.ORDER_UNARY=3;Blockly.Skoolbot.ORDER_MULTIPLICATIVE=4;Blockly.Skoolbot.ORDER_ADDITIVE=5;Blockly.Skoolbot.ORDER_CONCATENATION=6;Blockly.Skoolbot.ORDER_RELATIONAL=7;Blockly.Skoolbot.ORDER_AND=8;Blockly.Skoolbot.ORDER_OR=9;Blockly.Skoolbot.ORDER_NONE=99;
Blockly.Skoolbot.init=function(a){Blockly.Skoolbot.definitions_=Object.create(null);Blockly.Skoolbot.functionNames_=Object.create(null);Blockly.Skoolbot.variableDB_?Blockly.Skoolbot.variableDB_.reset():Blockly.Skoolbot.variableDB_=new Blockly.Names(Blockly.Skoolbot.RESERVED_WORDS_);Blockly.Skoolbot.variableDB_.setVariableMap(a.getVariableMap())};
Blockly.Skoolbot.finish=function(a){var b=[],c;for(c in Blockly.Skoolbot.definitions_)b.push(Blockly.Skoolbot.definitions_[c]);delete Blockly.Skoolbot.definitions_;delete Blockly.Skoolbot.functionNames_;Blockly.Skoolbot.variableDB_.reset();a=b.join(",")+a;a=a.replace(/(\r\n|\n|\r|\s+)/g,"");a=a.replace(/}{/g,"},{");return"["+a+"]"};Blockly.Skoolbot.scrubNakedValue=function(a){return a+"\n"};
Blockly.Skoolbot.quote_=function(a){a=a.replace(/\\/g,"\\\\").replace(/\n/g,"\\\n").replace(/'/g,"\\'");return"'"+a+"'"};
Blockly.Skoolbot.scrub_=function(a,b,c){var d="";if(!a.outputConnection||!a.outputConnection.targetConnection){var e=a.getCommentText();(e=Blockly.utils.wrap(e,Blockly.Skoolbot.COMMENT_WRAP-3))&&(d+=Blockly.Skoolbot.prefixLines(e,"-- ")+"\n");for(var f=0;f<a.inputList.length;f++)a.inputList[f].type==Blockly.INPUT_VALUE&&(e=a.inputList[f].connection.targetBlock())&&(e=Blockly.Skoolbot.allNestedComments(e))&&(d+=Blockly.Skoolbot.prefixLines(e,"-- "))}a=a.nextConnection&&a.nextConnection.targetBlock();
c=c?"":Blockly.Skoolbot.blockToCode(a);a&&(b+=",");return d+b+c};Blockly.Skoolbot.colour={};Blockly.Skoolbot.colour_picker=function(a){return['{"colour": "'+a.getFieldValue("COLOUR")+'"}',Blockly.Skoolbot.ORDER_ATOMIC]};function randomHex(){for(var a="#",b=0;6>b;++b)a+=Math.floor(16*Math.random()).toString(16).toUpperCase();return a}Blockly.Skoolbot.colour_random=function(a){return['{"colour": "'+randomHex()+'"}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.colour_rgb=function(a){var b=Blockly.Skoolbot.valueToCode(a,"RED",Blockly.Skoolbot.ORDER_ATOMIC)||'""',c=Blockly.Skoolbot.valueToCode(a,"GREEN",Blockly.Skoolbot.ORDER_ATOMIC)||'""';a=Blockly.Skoolbot.valueToCode(a,"BLUE",Blockly.Skoolbot.ORDER_ATOMIC)||'""';return['{"colourRGB":[{"red":'+b+'}, {"green": '+c+'}, {"blue": '+a+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.colour_blend=function(a){var b=Blockly.Skoolbot.valueToCode(a,"COLOUR1",Blockly.Skoolbot.ORDER_ATOMIC)||'""',c=Blockly.Skoolbot.valueToCode(a,"COLOUR2",Blockly.Skoolbot.ORDER_ATOMIC)||'""';a=Blockly.Skoolbot.valueToCode(a,"RATIO",Blockly.Skoolbot.ORDER_ATOMIC)||'""';return['{"colourBlend": [{"colour1": '+b+'}, {"colour2": '+c+'}, {"ratio": '+a+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.lists={};Blockly.Skoolbot.lists_create_empty=function(a){return['{ "functionName": "lists_create_empty" }',Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.lists_create_with=function(a){for(var b=Array(a.itemCount_),c=0;c<a.itemCount_;c++)b[c]=Blockly.Skoolbot.valueToCode(a,"ADD"+c,Blockly.Skoolbot.ORDER_NONE)||"{}";return['{ "functionName": "lists_create_with", "argument": ['+b.join(", ")+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
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
Blockly.Skoolbot.controls_if=function(a){var b=0,c='{"controls_type": "controls_if", "structure": [{"statement": "';do{var d=Blockly.Skoolbot.valueToCode(a,"IF"+b,Blockly.Skoolbot.ORDER_ATOMIC)||'{ "boolean": "FALSE"}';var e=Blockly.Skoolbot.statementToCode(a,"DO"+b)||"[]";c=0<b?c+('}, {"statement": "else if", "condition": '+d+', "branchCode":'+e):c+('if", "condition": '+d+', "branchCode": ['+e+"]");++b}while(a.getInput("IF"+b));a.getInput("ELSE")?(e=Blockly.Skoolbot.statementToCode(a,"ELSE")||"[]",
c+='}, {"statement": "else", "branchCode":'+e+"}]"):c+="}]";return c+"}"};Blockly.Skoolbot.controls_ifelse=Blockly.Skoolbot.controls_if;Blockly.Skoolbot.logic_compare=function(a){var b={EQ:"==",NEQ:"!=",LT:"<",LTE:"<=",GT:">",GTE:">="}[a.getFieldValue("OP")],c=Blockly.Skoolbot.valueToCode(a,"A",Blockly.Skoolbot.ORDER_ATOMIC)||'""';a=Blockly.Skoolbot.valueToCode(a,"B",Blockly.Skoolbot.ORDER_ATOMIC)||'""';return['{ "operator": "'+b+'", "argument": ['+c+","+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.logic_operation=function(a){var b="AND"==a.getFieldValue("OP")?"and":"or",c=Blockly.Skoolbot.ORDER_ATOMIC,d=Blockly.Skoolbot.valueToCode(a,"A",c)||'{ "boolean": "FALSE"}';a=Blockly.Skoolbot.valueToCode(a,"B",c)||'{ "boolean": "FALSE"}';return['{ "operator": "'+b+'", "argument": ['+d+","+a+"]}",c]};
Blockly.Skoolbot.logic_negate=function(a){return['{ "operator": "logic_negate", "argument": ['+(Blockly.Skoolbot.valueToCode(a,"BOOL",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "boolean": "TRUE"}')+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.logic_boolean=function(a){return['{"boolean": '+("TRUE"==a.getFieldValue("BOOL")?'"TRUE"':'"FALSE"')+"}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.logic_null=function(a){return['{"null": "NULL"}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.logic_ternary=function(a){var b=Blockly.Skoolbot.valueToCode(a,"IF",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "boolean": "FALSE"}',c=Blockly.Skoolbot.valueToCode(a,"THEN",Blockly.Skoolbot.ORDER_ATOMIC)||'{"null": "NULL"}';a=Blockly.Skoolbot.valueToCode(a,"ELSE",Blockly.Skoolbot.ORDER_ATOMIC)||'{"null": "NULL"}';return['{"statement": "logic_ternary", "if": '+b+', "ifTrue": '+c+', "ifFalse": '+a+"}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.loops={};Blockly.Skoolbot.CONTINUE_STATEMENT="goto continue\n";Blockly.Skoolbot.addContinueLabel=function(a){return-1<a.indexOf(Blockly.Skoolbot.CONTINUE_STATEMENT)?a+Blockly.Skoolbot.INDENT+"::continue::\n":a};Blockly.Skoolbot.controls_repeat=function(a){var b=parseInt(a.getFieldValue("TIMES"),10);a=Blockly.Skoolbot.statementToCode(a,"DO");a=Blockly.Skoolbot.addContinueLabel(a);return'{"loop_style": "controls_repeat", "repeat_times": '+b+', "branch": ['+a+"]}"};
Blockly.Skoolbot.controls_repeat_ext=function(a){var b=Blockly.Skoolbot.valueToCode(a,"TIMES",Blockly.Skoolbot.ORDER_ATOMIC)||"0";b=Blockly.isNumber(b)?parseInt(b,10):'{"operator": "math.floor", "argument": '+b+"}";a=Blockly.Skoolbot.statementToCode(a,"DO");a=Blockly.Skoolbot.addContinueLabel(a);return'{"loop_style": "controls_repeat_ext", "repeat_times": '+b+', "branch": ['+a+"]}"};
Blockly.Skoolbot.controls_whileUntil=function(a){var b="UNTIL"==a.getFieldValue("MODE"),c=Blockly.Skoolbot.valueToCode(a,"BOOL",Blockly.Skoolbot.ORDER_ATOMIC)||'"false"',d=Blockly.Skoolbot.statementToCode(a,"DO");d=Blockly.Skoolbot.addLoopTrap(d,a.id);d=Blockly.Skoolbot.addContinueLabel(d);return'{"loop_style": "controls_whileUntil","repeat_condition": '+c+',"end_type": '+(b?'"until"':'"while"')+',"branch": ['+d+"]}"};
Blockly.Skoolbot.controls_for=function(a){var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Skoolbot.valueToCode(a,"FROM",Blockly.Skoolbot.ORDER_ATOMIC)||"0",d=Blockly.Skoolbot.valueToCode(a,"TO",Blockly.Skoolbot.ORDER_ATOMIC)||"0",e=Blockly.Skoolbot.valueToCode(a,"BY",Blockly.Skoolbot.ORDER_ATOMIC)||"1",f=Blockly.Skoolbot.statementToCode(a,"DO");f=Blockly.Skoolbot.addLoopTrap(f,a.id);f=Blockly.Skoolbot.addContinueLabel(f);return'\n{ "loop_style": "controls_for", "variable": "'+
b+'", "start": '+c+', "end": '+d+', "step": '+e+', "branch": ['+f+"]}"};Blockly.Skoolbot.controls_forEach=function(a){var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE),c=Blockly.Skoolbot.valueToCode(a,"LIST",Blockly.Skoolbot.ORDER_ATOMIC)||"{}";a=Blockly.Skoolbot.statementToCode(a,"DO");a=Blockly.Skoolbot.addContinueLabel(a);return'{"loop_style": "controls_forEach","varName": "'+b+'", "list": '+c+', "branch": ['+a+"]}"};
Blockly.Skoolbot.controls_flow_statements=function(a){switch(a.getFieldValue("FLOW")){case "BREAK":return'{ "controls_flow_statements": "break" }';case "CONTINUE":return'{ "controls_flow_statements": "continue" }'}throw Error("Unknown flow statement.");};Blockly.Skoolbot.math={};Blockly.Skoolbot.math_number=function(a){return['{ "number": "'+parseFloat(a.getFieldValue("NUM"))+'" }',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_arithmetic=function(a){var b={ADD:[" + ",Blockly.Skoolbot.ORDER_ATOMIC],MINUS:[" - ",Blockly.Skoolbot.ORDER_ATOMIC],MULTIPLY:[" * ",Blockly.Skoolbot.ORDER_ATOMIC],DIVIDE:[" / ",Blockly.Skoolbot.ORDER_ATOMIC],POWER:[" ^ ",Blockly.Skoolbot.ORDER_ATOMIC]}[a.getFieldValue("OP")],c=b[0];b=b[1];var d=Blockly.Skoolbot.valueToCode(a,"A",b)||'{ "number": "0"}';a=Blockly.Skoolbot.valueToCode(a,"B",b)||'{ "number": "0"}';return['{ "operator": "'+c+'", "argument": ['+d+","+a+"]}",b]};
Blockly.Skoolbot.math_single=function(a){var b=a.getFieldValue("OP");if("NEG"==b||"POW10"==b)return a=Blockly.Skoolbot.valueToCode(a,"NUM",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}',['{ "operator": "'+b+'","argument": ['+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC];a=Blockly.Skoolbot.valueToCode(a,"NUM",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}';return['{ "operator": "'+b+'", "argument":['+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_constant=function(a){return{PI:['{ "operator": "PI"}',Blockly.Skoolbot.ORDER_ATOMIC],E:['{ "operator": "e" }',Blockly.Skoolbot.ORDER_ATOMIC],GOLDEN_RATIO:['{ "operator": "/", "argument":[{ "operator": "+", "argument": [{ "number": 1} , { "operator": "math.sqrt", "argument":[{ "number": "5"}]}]}, { "number": "2"}]}',Blockly.Skoolbot.ORDER_ATOMIC],SQRT2:['{ "operator": "math.sqrt", "argument": { "number": 2}}',Blockly.Skoolbot.ORDER_ATOMIC],SQRT1_2:['{ "operator": "math.sqrt", "argument": { "number": 0.5}}',
Blockly.Skoolbot.ORDER_ATOMIC],INFINITY:['{ "operator": "INFINITY"}',Blockly.Skoolbot.ORDER_ATOMIC]}[a.getFieldValue("CONSTANT")]};
Blockly.Skoolbot.math_number_property=function(a){var b=Blockly.Skoolbot.valueToCode(a,"NUMBER_TO_CHECK",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}',c=a.getFieldValue("PROPERTY");if("PRIME"==c)return['{ "functionName": "math_isPrime", "argument": ['+b+"]}",Blockly.Skoolbot.ORDER_ATOMIC];switch(c){case "EVEN":var d='{ "functionName": "math_isEven", "argument": ['+b+"]}";break;case "ODD":d='{ "functionName": "math_isOdd", "argument": ['+b+"]}";break;case "WHOLE":d='{ "functionName": "math_isWhole", "argument": ['+
b+"]}";break;case "POSITIVE":d='{ "functionName": "math_isPositive", "argument": ['+b+"]}";break;case "NEGATIVE":d='{ "functionName": "math_isNegative", "argument": ['+b+"]}";break;case "DIVISIBLE_BY":a=Blockly.Skoolbot.valueToCode(a,"DIVISOR",Blockly.Skoolbot.ORDER_ATOMIC),d='{ "operator": "math_isDivisibleBy", "argument":['+b+","+a+"]}"}return[d,Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_change=function(a){var b=Blockly.Skoolbot.valueToCode(a,"DELTA",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}';return'{ "functionName": "math_change", "varName": "'+Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+'", "argument": ['+b+"]}"};Blockly.Skoolbot.math_round=Blockly.Skoolbot.math_single;Blockly.Skoolbot.math_trig=Blockly.Skoolbot.math_single;
Blockly.Skoolbot.math_on_list=function(a){var b=a.getFieldValue("OP");a=Blockly.Skoolbot.valueToCode(a,"LIST",Blockly.Skoolbot.ORDER_ATOMIC)||"{}";return['{ "functionName": "'+b+'", "argument": ['+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_modulo=function(a){var b=Blockly.Skoolbot.valueToCode(a,"DIVIDEND",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}';a=Blockly.Skoolbot.valueToCode(a,"DIVISOR",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}';return['{ "operator": "%", "argument":['+b+","+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_constrain=function(a){var b=Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}',c=Blockly.Skoolbot.valueToCode(a,"LOW",Blockly.Skoolbot.ORDER_ATOMIC)||"-math.huge";a=Blockly.Skoolbot.valueToCode(a,"HIGH",Blockly.Skoolbot.ORDER_ATOMIC)||"math.huge";return['{ "operator": "math_constrain", "argument":['+b+", "+c+", "+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_random_int=function(a){var b=Blockly.Skoolbot.valueToCode(a,"FROM",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}';a=Blockly.Skoolbot.valueToCode(a,"TO",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}';return['{ "functionName": "math_random_int", "argument": ['+b+", "+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.math_random_float=function(a){return['{ "functionName": "math_random_float"}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.math_atan2=function(a){var b=Blockly.Skoolbot.valueToCode(a,"X",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}';a=Blockly.Skoolbot.valueToCode(a,"Y",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "0"}';return['{ "operator": "math_atan2","argument":['+b+","+a+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.procedures={};
Blockly.Skoolbot.procedures_defreturn=function(a){var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=Blockly.Skoolbot.statementToCode(a,"STACK");if(Blockly.Skoolbot.STATEMENT_PREFIX){var d=a.id.replace(/\$/g,"$$$$");c=Blockly.Skoolbot.prefixLines(Blockly.Skoolbot.STATEMENT_PREFIX.replace(/%1/g,"'"+d+"'"),Blockly.Skoolbot.INDENT)+c}Blockly.Skoolbot.INFINITE_LOOP_TRAP&&(c=Blockly.Skoolbot.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+a.id+"'")+c);d=Blockly.Skoolbot.valueToCode(a,
"RETURN",Blockly.Skoolbot.ORDER_ATOMIC)||'{"null": "NULL"}';d=Blockly.Skoolbot.INDENT+d;for(var e=[],f=0;f<a.arguments_.length;f++)e[f]='{ "argument'+f+'": "'+Blockly.Skoolbot.variableDB_.getName(a.arguments_[f],Blockly.Variables.NAME_TYPE)+'"}';a=Blockly.Skoolbot.scrub_(a,"",!1);a=a.replace(/\n/g," ");c='{ "procedures_type": "procedures_defreturn", "funcName": "'+b+'", "description": "'+a+'", "argument": ['+e.join(", ")+'], "branch": ['+c+'], "return_value": '+d+"}";Blockly.Skoolbot.definitions_["%"+
b]=c;return null};Blockly.Skoolbot.procedures_defnoreturn=Blockly.Skoolbot.procedures_defreturn;Blockly.Skoolbot.procedures_callreturn=function(a){for(var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Skoolbot.valueToCode(a,"ARG"+d,Blockly.Skoolbot.ORDER_ATOMIC)||'{"null": "NULL"}';return['{ "procedures_type": "procedures_callreturn", "funcName": "'+b+'", "argument": ['+c.join(", ")+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.procedures_callnoreturn=function(a){for(var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE),c=[],d=0;d<a.arguments_.length;d++)c[d]=Blockly.Skoolbot.valueToCode(a,"ARG"+d,Blockly.Skoolbot.ORDER_ATOMIC);return'{ "procedures_type": "procedures_callnoreturn", "funcName": "'+b+'", "argument": ['+c.join(", ")+"]}"};
Blockly.Skoolbot.procedures_ifreturn=function(a){var b=Blockly.Skoolbot.valueToCode(a,"CONDITION",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "boolean": "FALSE"}',c=Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)||'{"null": "NULL"}';return a.hasReturnValue_?'{ "procedures_type": "procedures_ifreturn", "condition": '+b+', "has_return_value": { "boolean": "TRUE"}, "return":  ['+c+"]}":'{ "procedures_type": "procedures_ifreturn", "condition": '+b+', "has_return_value": { "boolean": "FALSE"}, "return":  ['+
c+"]}"};Blockly.Skoolbot.texts={};Blockly.Skoolbot.text=function(a){return['{ "text": "'+Blockly.Skoolbot.quote_(a.getFieldValue("TEXT"))+'" }',Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.text_join=function(a){for(var b=[],c=0;c<a.itemCount_;c++)b[c]=Blockly.Skoolbot.valueToCode(a,"ADD"+c,Blockly.Skoolbot.ORDER_ATOMIC)||'{ "text": "\'\'" }';return['{ "functionName": "text_join", "text_element_list": ['+b.join(", ")+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_append=function(a){var b=Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE);a=Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)||"''";return'{ "functionName": "text_append", "argument": [{"varName": "'+b+'"}, {"text_append": '+a+"}]}"};
Blockly.Skoolbot.text_length=function(a){return['{ "functionName": "text_length", "argument": [{"varName": '+(Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)||"''")+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.text_isEmpty=function(a){return['{ "functionName": "text_isEmpty", "argument": [{"varName": '+(Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)||"''")+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_indexOf=function(a){var b=Blockly.Skoolbot.valueToCode(a,"FIND",Blockly.Skoolbot.ORDER_ATOMIC)||"''",c=Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)||"''";a=a.getFieldValue("END");return['{ "functionName": "text_indexOf", "argument": ['+c+', {"end": "'+a+'"}, {"substring": '+b+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_charAt=function(a){var b=a.getFieldValue("WHERE")||"FROM_START",c=Blockly.Skoolbot.valueToCode(a,"AT",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "1"}';return['{ "functionName": "text_charAt", "argument": [{"varName": '+(Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"")+'}, {"where": "'+b+'"}, {"index": '+c+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_getSubstring=function(a){var b=Blockly.Skoolbot.valueToCode(a,"STRING",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"",c=a.getFieldValue("WHERE1"),d=Blockly.Skoolbot.valueToCode(a,"AT1",Blockly.Skoolbot.ORDER_ATOMIC)||'{ "number": "1"}',e=a.getFieldValue("WHERE2");a=Blockly.Skoolbot.valueToCode(a,"AT2","FROM_END"==e?Blockly.Skoolbot.ORDER_ATOMIC:Blockly.Skoolbot.ORDER_NONE)||'{ "number": "1"}';return['{ "functionName": "text_getSubstring", "argument": [{"varName": '+b+'}, {"start_where": "'+
c+'"}, {"start_index": '+d+'}, {"end_where": "'+e+'"}, {"end_index": '+a+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.text_changeCase=function(a){var b=a.getFieldValue("CASE");return['{ "functionName": "text_changeCase", "argument": [{"varName": '+(Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"")+'}, {"change_case_type": "'+b+'"}]}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_trim=function(a){var b=a.getFieldValue("MODE");return['{ "functionName": "text_trim", "argument": [{"varName": '+(Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"")+'}, {"which_side": "'+b+'"}]}',Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.text_print=function(a){return'{ "functionName": "text_print", "argument": ['+(Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"")+"]}"};
Blockly.Skoolbot.text_prompt_ext=function(a){var b=a.getField("TEXT")?Blockly.Skoolbot.quote_(a.getFieldValue("TEXT")):Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"",c='{ "functionName": "text_prompt", "argument": ['+b+"] }";"NUMBER"==a.getFieldValue("TYPE")&&(c='{ "functionName": "text_prompt", "argument": ['+('{ "functionName": "text_toNumber", "argument": ['+b+"] }")+"] }");return[c,Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.text_prompt=Blockly.Skoolbot.text_prompt_ext;
Blockly.Skoolbot.text_count=function(a){var b=Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"";a=Blockly.Skoolbot.valueToCode(a,"SUB",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"";return['{ "functionName": "text_count", "argument": ['+b+', {"substring": '+a+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_replace=function(a){var b=Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"",c=Blockly.Skoolbot.valueToCode(a,"FROM",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"";a=Blockly.Skoolbot.valueToCode(a,"TO",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"";return['{ "functionName": "text_replace", "argument": ['+b+', {"from(current)": '+c+'}, {"to(target)": '+a+"}]}",Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.text_reverse=function(a){return['{ "functionName": "text_reverse", "argument": ['+(Blockly.Skoolbot.valueToCode(a,"TEXT",Blockly.Skoolbot.ORDER_ATOMIC)||"\"''\"")+"]}",Blockly.Skoolbot.ORDER_ATOMIC]};Blockly.Skoolbot.variables={};Blockly.Skoolbot.variables_get=function(a){return['{ "functionName": "variables_get", "varName": "'+Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+'"}',Blockly.Skoolbot.ORDER_ATOMIC]};
Blockly.Skoolbot.variables_set=function(a){var b=Blockly.Skoolbot.valueToCode(a,"VALUE",Blockly.Skoolbot.ORDER_ATOMIC)||"0";return'{ "functionName": "variables_set", "varName": "'+Blockly.Skoolbot.variableDB_.getName(a.getFieldValue("VAR"),Blockly.Variables.NAME_TYPE)+'", "argument": ["'+b+'"]}'};
Blockly.Skoolbot.variablesDynamic={};Blockly.Skoolbot.variables_get_dynamic=Blockly.Skoolbot.variables_get;Blockly.Skoolbot.variables_set_dynamic=Blockly.Skoolbot.variables_set;