#!/bin/bash
# for x in test_cases/*.xml
# do
#     y="test_jsons/`basename $x .xml`.json"
#     addTypeField="test_typeField/`basename $x .xml`.json"
#     if [ -e $y ]
#       then
#         ### execute javascript with $x > $$.out
#         node main.js $x > compare.json
#         result=$(wdiff -3 $y compare.json)
#         if [ $? -eq 0 ]
#            then
#              echo -e "$y Test case pass."
#            else
#              echo "$result"
#              echo -e "$y Test case failed."
#         fi
#     else
#         node main.js $x > $y
#         echo "created $y."
#     fi
#
#     if [ -e $addTypeField ]
#     then
#         node main.js $x true > compare.json
#         result=$(wdiff -3 $addTypeField compare.json)
#         if [ $? -eq 0 ]
#            then
#              echo -e "$addTypeField Test case pass."
#            else
#              echo "$result"
#              echo -e "$addTypeField Test case failed."
#         fi
#    else
#       node main.js $x true > $addTypeField
#       echo "created $addTypeField."
#    fi
#    rm compare.json
#    echo -e ""
# done

#! for testing the interpreter
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
