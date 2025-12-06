<?php

$handle = fopen("input.txt", "r");
$lineList = [];
$problemList = [];
$granTotal = 0;

if ($handle) {
    $lineNumber = 1;

    while (($line = fgets($handle)) !== false) {
        if (trim($line) == '') continue;
        $lineList[] = $line;
    }
    $operators = array_pop($lineList);
    // print_r($operators); 
    $problemIndex = 0;
    for ($currentCol = 0; $currentCol < strlen($lineList[0]) - 1; $currentCol++)
    {
        $number = '';
        foreach($lineList as $currentLine)
        {
            $number .= substr($currentLine, $currentCol, 1);
        }
        if(trim($number) == '') 
        {
            $problemIndex++;
        }
        else
        {
            $problemList[$problemIndex][] = $number;
        }
    }

    $operatorList = explode(' ', $operators);
    $operatorIndex = 0;
    foreach ($operatorList as $currentOperator)
    {
        if ($currentOperator == '') continue;
        $problemList[$operatorIndex][] = $currentOperator;
        $operatorIndex++;
    }

    // print_r($problemList);
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
