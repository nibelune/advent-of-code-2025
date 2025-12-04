<?php

$result = 0;
$map = [];
const MAX_ADJACENT = 4;
$handle = fopen("input.txt", "r");

if ($handle) {
    $lineNumber = 1;
    while (($line = fgets($handle)) !== false) {
        $line = trim($line);
        $map[] = str_split($line);
    }

    do{
        $removedItems = [];
        foreach ($map as $currentRow => $currentLine)
        {
            foreach ($currentLine as $currentCol => $currentChar)
            {
                if ($currentChar != '@') continue;
                if (countAdjacent($map, $currentRow, $currentCol) < MAX_ADJACENT)
                {
                    $removedItems[] = [$currentRow, $currentCol];
                    $result++;
                }   
            }
        }
        
        //* // a commenter pour le numéro 07
        foreach ($removedItems as $itemToRemove)
        {
            $map[$itemToRemove[0]][$itemToRemove[1]] = '.';
        }
        //*/
    } while (sizeof($removedItems) > 0);


    echo $result;
}

function countAdjacent(array $map, int $row, int $col): int
{
    $adjacent = 0;
    if ($row > 0)
    {
        if ($col > 0 &&                   $map[$row - 1][$col - 1] == '@') $adjacent++;
        if (                              $map[$row - 1][$col] == '@')     $adjacent++;
        if ($col < sizeof($map[0]) - 1 && $map[$row - 1][$col + 1] == '@') $adjacent++;
    }
    if ($row < sizeof($map) - 1)
    {
        if ($col > 0 &&                   $map[$row + 1][$col - 1] == '@') $adjacent++;
        if (                              $map[$row + 1][$col] == '@')     $adjacent++;
        if ($col < sizeof($map[0]) - 1 && $map[$row + 1][$col + 1] == '@') $adjacent++;
    }
    if ($col > 0 &&                       $map[$row][$col - 1] == '@') $adjacent++;
    if ($col < sizeof($map[0]) - 1 &&     $map[$row][$col + 1] == '@') $adjacent++;

    return $adjacent;
}
