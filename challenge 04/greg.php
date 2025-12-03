<?php

$content = file_get_contents('./input.txt');
$rangeList = explode(",", $content);
$result = 0;

/*
foreach($rangeList as $currentRange)
{
    // echo __LINE__ . ' : ' . $currentRange . PHP_EOL;
    $minMax = explode("-", $currentRange);
    for ($currentId = $minMax[0]; $currentId <= $minMax[1]; $currentId++)
    {
        for($i = strlen($currentId); $i > 1; $i--)
        {
            if(! isValid($currentId, $i))
            {
                $result += $currentId;
                break;  
            } 
        }
        // echo ' >>>> ' . $currentId . PHP_EOL;
    }
}
echo __LINE__ . ' : ' . $result;

function isValid(string $id, int $parts)
{
    // un nombre impair de digit
    if (strlen($id) % $parts != 0 ) return true;

    $part1 = substr($id, 0, strlen($id) / $parts);

    $invalidIdArray = array_fill(0, $parts, $part1);

    $invalidId = implode('', $invalidIdArray);

    if ($invalidId == $id) return false;

    return true;
}
/*/

foreach($rangeList as $currentRange)
{
    // echo __LINE__ . ' : ' . $currentRange . PHP_EOL;
    $minMax = explode("-", $currentRange);
    for ($currentId = $minMax[0]; $currentId <= $minMax[1]; $currentId++)
    {
        // if(preg_match('/^(\d*)\1$/', $currentId) === 1) // pour le challenge 03
        if(preg_match('/^(\d*)\1{1,}$/', $currentId) === 1)
        {
            $result += $currentId;
        } 
        // echo ' >>>> ' . $currentId . PHP_EOL;
    }
}
echo __LINE__ . ' : ' . $result;

//*/