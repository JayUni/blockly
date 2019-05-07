# blockly
The web-based visual programming editor.

Json Issues:

1. all blocks need to be on the same order
2. json format double checking
    2.1 Is it good to have json to non-statement blocks
3. test the combination of blocks for example block 1+1 does not work on substring block
4. variable and functions does not work (but we can just refer to the variable in the interpretor)
5. Is it good to do all the logics on the server and the json only has the results

Json solutions:
1. try to have no order of none
2&3. use node js chai and mocha for unit testing
4. We only json the name of the block and args inside the block
5. we do all executions in side the javascript

