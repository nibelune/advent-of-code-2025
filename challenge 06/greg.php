<?php

$totalJoltage = 0;

$handle = fopen("input.txt", "r");
if ($handle) {
    $lineNumber = 1;
    while (($line = fgets($handle)) !== false) {
        $line = trim($line);
        $lineJoltage = getFromLine($line, 12);
        $totalJoltage += $lineJoltage;
        $lineNumber++;
    }
    echo $totalJoltage;
}

function getFromLine(string $line, int $limit)
{
    $maxNumber = '';
    $limit--;
    $offset = 0;
    while ($limit >= 0)
    {
        list($offset, $digit) = getMaxFromChar($line, $limit, $offset);
        $maxNumber .= $digit;
        $offset++;
        $limit--;
    }
    return $maxNumber;
}

function getMaxFromChar($line, $limit, $offset = 0)
{
    $firstIndex = 0;
    $maxDigit = 0;
    $limit =  strlen($line) - $limit;
    for ($i = $offset; $i < $limit; $i++)
    {
        $currentNumber = $line[$i];
        if ($currentNumber > $maxDigit)
        {
            $firstIndex = $i;
            $maxDigit = $currentNumber;
        }
        if ($currentNumber === '9') break;
    }
    return [ $firstIndex, $maxDigit];
}
