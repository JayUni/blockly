#!/bin/bash
for x in tests/*.xml
do
    y="tests/`basename $x .xml`.json"
    echo "run $x"
    ### execute javascript with $x > $$.out
    if ! cmp $$.out $y
    then
       echo "Test case failed."
    fi
done
