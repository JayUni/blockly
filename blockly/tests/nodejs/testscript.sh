#!/bin/bash

## compile the interpreter
#g++ -o ../../SkoolBot/interpreter ../../SkoolBot/interpreter.cpp
#
#for xml in test_cases/*.xml
#do
#    # conver xml to json
#    json="test_jsons/`basename $xml .xml`.json"
#
#    if [ -e $json ]
#      then
#        node ../../SkoolBot/xmlToJson.js $xml > compare.json
#        result=$(wdiff -3 $json compare.json)
#        if [ $? -eq 0 ]
#           then
#             echo -e "$json Test case pass."
#           else
#             echo "$result"
#             echo -e "$json Test case failed."
#             break
#        fi
#    else
#        node ../../SkoolBot/xmlToJson.js $xml > $json
#        echo "created $json."
#    fi
#
#   #  # add type field to json
#   #  addTypeField="test_typeField/`basename $xml .xml`.json"
#   #  if [ -e $addTypeField ]
#   #  then
#   #      node main.js $xml true > compare.json
#   #      result=$(wdiff -3 $addTypeField compare.json)
#   #      if [ $? -eq 0 ]
#   #         then
#   #           echo -e "$addTypeField Test case pass."
#   #         else
#   #           echo "$result"
#   #           echo -e "$addTypeField Test case failed."
#   #           break
#   #      fi
#   # else
#   #    node main.js $xml true > $addTypeField
#   #    echo "created $addTypeField."
#   # fi
#
#   # byte code generator
#   # generator="generator_test_jsons/`basename $xml .xml`.json"
#   # if [ -e $generator ]
#   #   then
#   #     ### execute javascript with $x > $$.out
#   #     node main.js $x> compare.json
#   #     result=$(wdiff -3 $generator compare.json)
#   #     if [ $? -eq 0 ]
#   #       then
#   #          echo -e "$generator Test case pass.\n"
#   #        else
#   #          echo "$result"
#   #          echo -e "$generator Test case failed.\n"
#   #          break
#   #     fi
#   # else
#   #   node main.js $x > $generator
#   #   echo "created $generator"
#   # fi
#   # rm compare.json
#   # echo -e ""
#   #
#   # # interpreter
#   # interpreter="interpreter_outputs/`basename $x .txt`.txt"
#   # if [ -e $interpreter ]
#   #   then
#   #     ### execute javascript with $x > $$.out
#   #     ../../SkoolBot/interpreter $x > compare.txt
#   #     result=$(wdiff -3 $interpreter compare.txt)
#   #     if [ $? -eq 0 ]
#   #        then
#   #          echo -e "$interpreter Test case pass."
#   #        else
#   #          echo "$result"
#   #          echo -e "$interpreter Test case failed."
#   #          break
#   #     fi
#   # else
#   #     ../../SkoolBot/interpreter $x > $interpreter
#   #     echo "created $interpreter."
#   # fi
#   # rm compare.txt
#   # echo -e ""
#   # echo -e ""
#   # echo -e ""
#done

# # bytecode generater
#
# #!/bin/bash
# for x in generator_test_cases/*.xml
# do
#     generator="generator_test_jsons/`basename $x .xml`.json"
#     if [ -e $generator ]
#       then
#         ### execute javascript with $x > $$.out
#         node main.js $x true> compare.json
#         result=$(wdiff -3 $generator compare.json)
#         if [ $? -eq 0 ]
#           then
#              echo -e "$generator Test case pass.\n"
#            else
#              echo "$result"
#              echo -e "$generator Test case failed.\n"
#         fi
#     else
#       node main.js $x > $generator
#       echo "created $generator"
#     fi
# done
#
#
 # for testing the interpreter
 # compile
 g++ -o ../../SkoolBot/interpreter ../../SkoolBot/interpreter.cpp
 for x in generator_outputs/*.txt
 do
     interpreter="interpreter_outputs/`basename $x .txt`.txt"
     if [ -e $interpreter ]
       then
         ### execute javascript with $x > $$.out
         ../../SkoolBot/interpreter $x > compare.txt
         result=$(wdiff -3 $interpreter compare.txt)
         if [ $? -eq 0 ]
            then
              echo -e "$interpreter Test case pass."
            else
              echo "$result"
              echo -e "$interpreter Test case failed."
         fi
     else
         ../../SkoolBot/interpreter $x > $interpreter
         echo "created $interpreter."
     fi
 done