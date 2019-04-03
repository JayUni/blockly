#!/bin/bash
for x in test_cases/*.xml
do
    y="test_jsons/`basename $x .xml`.json"

    if [ -e $y ]
      then
        ### execute javascript with $x > $$.out
        node main.js $x > compare.json
        result=$(wdiff -3 $y compare.json)
        if [ $? -eq 0 ]
           then
             echo -e "$y Test case pass.\n"
           else
             echo "$result"
             echo -e "$y Test case failed.\n"
        fi
    else
      node main.js $x > $y
      echo "created $y"
    fi
done
