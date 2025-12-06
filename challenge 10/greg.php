<?php

$handle = fopen("input.txt", "r");
$validRangeList = [];
$validIdCount = 0;
$result = 0;

if ($handle) {
    $lineNumber = 1;

    while (($line = fgets($handle)) !== false) {
        $line = trim($line);
        if (strlen($line) === 0) break;
        $rangeIDMinMax = explode('-', $line);
        $validRangeList[] = [(int)$rangeIDMinMax[0], (int)$rangeIDMinMax[1]];
        if ($rangeIDMinMax[1] > $maxId) $maxId = $rangeIDMinMax[1];
        if ($rangeIDMinMax[0] < $minId) $minId = $rangeIDMinMax[0];
    }

    usort($validRangeList, function($rangeA, $rangeB) {
        return $rangeA[0] - $rangeB[0];
    });

    while (($line = fgets($handle)) !== false) {
        $currentId = trim($line);
        foreach ($validRangeList as $currentRange)
        {
            if ($currentId >= $currentRange[0] && $currentId <= $currentRange[1])
            {
                $result++;
                break;
            }
        }
    }

    //etape 2
    $maxId = 0;
    foreach ($validRangeList as $currentRange)
    {
        if ($currentRange[1] < $maxId) continue;
        $validIdCount += ($currentRange[1] - max($currentRange[0], $maxId)  + 1);

        
        $maxId = $currentRange[1] + 1;
    }

    echo 'resultat : ' . $result . PHP_EOL;
    echo 'nombre id valid : ' . $validIdCount . PHP_EOL;
}
