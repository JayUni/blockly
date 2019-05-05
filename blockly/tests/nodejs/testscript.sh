#!/bin/bash

# compile the interpreter
# -std=c++11 -Wall -Werror=format-security 
g++ ../../SkoolBot/interpreter_symbolic.cpp -o ../../SkoolBot/interpreter
for xml in xmlToJson_test_cases/*.xml
do
    # conver xml to json
    json="jsonToAddTyepField_test_cases/`basename $xml .xml`.json"

    if [ -e $json ]
      then
        node ../../SkoolBot/xmlToJson.js $xml > compare.json
        result=$(wdiff -3 $json compare.json)
        if [ $? -eq 0 ]
           then
             echo "$json Test case pass."
           else
             echo "$result"
             echo "$json Test case failed."
             rm compare.json
             continue
        fi
    else
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
             echo "$addTypeField Test case pass."
           else
             echo "$result"
             echo "$addTypeField Test case failed."
             rm compare.json
             continue
        fi
   else
      node ../../SkoolBot/add_type_field.js $json > $addTypeField
      echo "created $addTypeField."
   fi

   # command generator
   generator="generatorToInterpreter_test_cases/`basename $xml .xml`.txt"
   if [ -e $generator ]
     then
       ### execute javascript with $x > $$.out
       node ../../SkoolBot/command_generator.js $addTypeField > compare.json
       result=$(wdiff -3 $generator compare.json)
       if [ $? -eq 0 ]
         then
            echo "$generator Test case pass."
          else
            echo "$result"
            echo "$generator Test case failed."
            rm compare.json
            continue
       fi
       rm compare.json
   else
     node ../../SkoolBot/command_generator.js $addTypeField > $generator
     echo "created $generator."
   fi

   # interpreter
   interpreter="interpreter_final_outputs/`basename $xml .xml`.txt"
   if [ -e $interpreter ]
     then
       ### execute javascript with $x > $$.out
       ../../SkoolBot/interpreter $generator > compare.txt
       result=$(wdiff -3 $interpreter compare.txt)
       if [ $? -eq 0 ]
          then
            echo "$interpreter Test case pass."
          else
            echo "$result"
            echo "$interpreter Test case failed."
            rm compare.txt
            continue
       fi
       rm compare.txt
   else
       ../../SkoolBot/interpreter $generator > $interpreter
       echo "created $interpreter."
   fi
   echo ""
   echo ""
   echo ""
done

# # for testing the interpreter
# # compile
# g++ -o ../../SkoolBot/interpreter ../../SkoolBot/interpreter.cpp
# for x in generatorToInterpreter_test_cases/*.txt
# do
#     interpreter="interpreter_final_outputs/`basename $x .txt`.txt"
#     if [ -e $interpreter ]
#       then
#         ### execute javascript with $x > $$.out
#         ../../SkoolBot/interpreter $x > compare.txt
#         result=$(wdiff -3 $interpreter compare.txt)
#         if [ $? -eq 0 ]
#            then
#              echo -e "$interpreter Test case pass."
#            else
#              echo "$result"
#              echo -e "$interpreter Test case failed."
#         fi
#     else
#         ../../SkoolBot/interpreter $x > $interpreter
#         echo "created $interpreter."
#     fi
# done
