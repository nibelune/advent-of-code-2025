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
            $beamPositions[$startPosition] = $startPosition;
            $maxCol = strlen($line) - 1;
            continue;
        }
        $offset = 0;
        foreach($beamPositions as $currentPosition)
        {
            if (substr($line, $currentPosition, 1) === '^')
            {
                $splitCount++;
                unset($beamPositions[$currentPosition]);
                if ($currentPosition > 0) $beamPositions[$currentPosition - 1] = $currentPosition - 1;
                if ($currentPosition < $maxCol) $beamPositions[$currentPosition + 1] = $currentPosition + 1;
            }
        }
    }
}

echo $splitCount;