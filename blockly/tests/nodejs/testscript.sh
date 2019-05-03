<<<<<<< HEAD
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
=======
# !/bin/bash

# compile the interpreter
g++ -o ../../SkoolBot/interpreter ../../SkoolBot/interpreter.cpp

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

   # bytecode generator
   generator="generatorToInterpreter_test_cases/`basename $xml .xml`.txt"
   if [ -e $generator ]
     then
       ### execute javascript with $x > $$.out
       node ../../SkoolBot/bytecode_generator.js $addTypeField > compare.json
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
     node ../../SkoolBot/bytecode_generator.js $addTypeField > $generator
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

#! for testing the interpreter
# compile
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
>>>>>>> json
