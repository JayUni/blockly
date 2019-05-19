#!/bin/bash

# compile the interpreter
# -std=c++11 -Wall -Werror=format-security
g++ ../../SkoolBot/interpreter_binary.cpp -o ../../SkoolBot/interpreter
# for xml in xmlToJson_test_cases/*.xml
# do
    # conver xml to json
    xml="xmlToJson_test_cases/fib_22.xml"
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
             continue
        fi
   else
      node ../../SkoolBot/add_type_field.js $json > $addTypeField
      echo "created $addTypeField."
   fi

   # command generator
   generator="bin_generator_outputs/`basename $xml .xml`.bin"
   if [ -e $generator ]
     then
       ### execute javascript with $x > $$.out
       node ../../SkoolBot/bin_generator.js `basename $xml .xml`_test
       result=$(diff -3 $generator "`basename $xml .xml`_test.bin")
       if [ $? -eq 0 ]
         then
            echo "$generator Test case pass."
          else
            echo "$result"
            echo "$generator Test case failed."
       fi
       rm "`basename $xml .xml`_test.bin"
       continue
   else
     node ../../SkoolBot/bin_generator.js `basename $xml .xml`
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
            continue
       fi
   else
       ../../SkoolBot/interpreter $generator > $interpreter
       echo "created $interpreter."
   fi
   echo ""
   echo ""
   echo ""
# done
rm compare.txt
rm compare.json
