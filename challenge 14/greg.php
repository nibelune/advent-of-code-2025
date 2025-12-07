<?php

$handle = fopen("input.txt", "r");
$beamPositions = [];
$splitCount = 0;
$maxCol = 0;

if ($handle) {

    while (($line = fgets($handle)) !== false) {
        // print_r($beamPositions);
        $line = trim($line);
        if(sizeof($beamPositions) == 0)
        {
            $startPosition = strpos($line,'S');
            $beamPositions[$startPosition] = 1;
            $maxCol = strlen($line) - 1;
            continue;
        }
        $offset = 0;
        foreach($beamPositions as $currentPosition => $beamCount)
        {
            if (substr($line, $currentPosition, 1) === '^')
            {
                $splitCount++;
                unset($beamPositions[$currentPosition]);
                if ($currentPosition > 0) {
                    if (! isset($beamPositions[$currentPosition - 1])) $beamPositions[$currentPosition - 1] = 0;
                    $beamPositions[$currentPosition - 1] += $beamCount;
                }
                if ($currentPosition < $maxCol) 
                {
                    if (! isset($beamPositions[$currentPosition + 1])) $beamPositions[$currentPosition + 1] = 0;
                    $beamPositions[$currentPosition + 1] += $beamCount;
                }
            }
        }
    }
}

$totalPath = 0;
foreach ($beamPositions as $currentPathCount)
{
    $totalPath += $currentPathCount;
}

echo $splitCount . PHP_EOL;
echo $totalPath . PHP_EOL;