#!/bin/bash

# compile the interpreter
# -std=c++11 -Wall -Werror=format-security
g++ ../../SkoolBot/interpreter_binary.cpp -o ../../SkoolBot/interpreter
# for gen in bin_generator_outputs/*.bin
# do
    gen="bin_generator_outputs/if_if_elseif_else_3.bin"
    interpreter="interpreter_final_outputs/`basename $gen .bin`.txt"

   if [ -e $interpreter ]
     then
       ../../SkoolBot/interpreter $gen $1 > compare.txt
       result=$(wdiff -3 $interpreter compare.txt)
       if [ $? -eq 0 ]
          then
            echo "$interpreter Test case pass."
          else
            echo "$result"
            echo "$interpreter Test case failed."
            # rm compare.txt
            # continue
       fi
       # rm compare.txt
   else
       ../../SkoolBot/interpreter $gen > $interpreter
       echo "created $interpreter."
   fi
   echo ""
# done

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
