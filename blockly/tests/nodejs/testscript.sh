#!/bin/bash

# compile the interpreter
g++ ../../SkoolBot/interpreter_binary.cpp -o ../../SkoolBot/interpreter
for xml in xmlToJson_test_cases/*.xml
do
    # convert xml to json
    json="jsonToAddTyepField_test_cases/`basename $xml .xml`.json"

    if [ -e $json ]
      then
        # save the temperary new execute file
        node ../../SkoolBot/xmlToJson.js $xml > compare.json
        # compare the existed file with the new executed one
        result=$(wdiff -3 $json compare.json)
        if [ $? -eq 0 ]
           then
             # \e[42m is green background
             echo -e "$json Test case \e[42mpass\e[0m."
           else
             echo "$result"
             # \e[41m is red background
             echo -e "$json Test case \e[41mfailed\e[0m."
             continue
        fi
    else
       # create a new file to store the results
        node ../../SkoolBot/xmlToJson.js $xml > $json
        echo "created $json."
    fi

    # add type field to json
    addTypeField="addTypeFieldToGenerator_test_cases/`basename $xml .xml`.json"
    if [ -e $addTypeField ]
    then
        node ../../SkoolBot/add_type_field.js $json > compare.json
        result=$(wdiff -3 $addTypeField compare.json)
        if [ $? -eq 0 ]
           then
             echo -e "$addTypeField Test case \e[42mpass\e[0m."
           else
             echo "$result"
             echo -e "$addTypeField Test case \e[41mfailed\e[0m."
             continue
        fi
   else
      node ../../SkoolBot/add_type_field.js $json > $addTypeField
      echo "created $addTypeField."
   fi

   # json to symbolic bytecode generator
   command_generator="symbolic_generator_outputs/`basename $xml .xml`.txt"
   if [ -e $command_generator ]
     then
       node ../../SkoolBot/command_generator.js $addTypeField > compare.txt
       result=$(wdiff -3 $command_generator compare.txt)
       if [ $? -eq 0 ]
         then
            echo -e "$command_generator Test case \e[42mpass\e[0m."
          else
            echo "$result"
            echo -e "$command_generator Test case \e[41mfailed\e[0m."
            continue
       fi
   else
     node ../../SkoolBot/command_generator.js $addTypeField > $command_generator
     echo "created $command_generator."
   fi

   # json to binary bytecode generator
   bin_generator="bin_generator_outputs/`basename $xml .xml`.bin"
   if [ -e $bin_generator ]
    then
      echo -e "\e[42mexisted\e[0m $bin_generator."
   else
     node ../../SkoolBot/bin_generator.js `basename $xml .xml`
     echo -e "\e[5moverwrite\e[0m $bin_generator."
   fi

   # binary bytecode to interpreter
   interpreter="interpreter_final_outputs/`basename $xml .xml`.txt"
   if [ -e $interpreter ]
     then
       ../../SkoolBot/interpreter $bin_generator > compare.txt
       result=$(wdiff -3 $interpreter compare.txt)
       if [ $? -eq 0 ]
          then
            echo -e "$interpreter Test case \e[42mpass\e[0m."
          else
            echo "$result"
            echo -e "$interpreter Test case \e[41mfailed\e[0m."
            continue
       fi
   else
       ../../SkoolBot/interpreter $bin_generator > $interpreter
       echo "created $interpreter."
   fi

   # binary bytecode to symbolic interpreter with execution steps
   interpreter="symbolic_interpreter_outputs/`basename $xml .xml`.txt"
   if [ -e $interpreter ]
     then
       ../../SkoolBot/interpreter $bin_generator -db > compare.txt
       result=$(wdiff -3 $interpreter compare.txt)
       if [ $? -eq 0 ]
          then
            echo -e "$interpreter Test case \e[42mpass\e[0m."
          else
            echo "$result"
            echo -e "$interpreter Test case \e[41mfailed\e[0m."
            continue
       fi
   else
       ../../SkoolBot/interpreter $bin_generator -db > $interpreter
       echo "created $interpreter."
   fi

   echo ""
   echo ""
   echo ""
done
rm compare.txt
rm compare.json
