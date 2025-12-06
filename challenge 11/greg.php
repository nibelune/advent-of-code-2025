<?php

$handle = fopen("input.txt", "r");
$problemList = [];
$granTotal = 0;

if ($handle) {
    $lineNumber = 1;

    while (($line = fgets($handle)) !== false) {
        $line = trim($line);
        if (strlen($line) === 0) break;
        preg_match_all('/([^ ]*)/', $line, $problemValues);
        $problemKey = 0;
        foreach ($problemValues[0] as $value)
        {
            if (trim($value) === '') continue;
            $problemList[$problemKey][] = $value;
            $problemKey++;
        }
    }

    foreach ($problemList as $currentProblemData)
    {
        $problemResult = getResultFromProblem($currentProblemData);
        $granTotal += $problemResult;
        // echo '$problemResult : ' . $problemResult . PHP_EOL;
    }

    echo 'resultat : ' . $granTotal . PHP_EOL;
}

function getResultFromProblem($problemData)
{
    $problemNumbers = array_slice($problemData, 0, sizeof($problemData) - 1);
    $operator = $problemData[sizeof($problemData) - 1];
    
    $result = array_shift($problemNumbers);

    foreach($problemNumbers as $currentNumber)
    {
        if ($operator == '*') $result *= $currentNumber;
        elseif ($operator == '+') $result += $currentNumber;
    }
    return $result;

}
