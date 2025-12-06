<?php

$handle = fopen("input.txt", "r");
$validRangeList = [];
$validIdCount = 0;
$maxId = 0;
$minId = PHP_INT_MAX;

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
    // $mergedRangeList = [];
    /*
    foreach ($validRangeList as $originalRange) // A - B
    {
        // var_dump(__LINE__);
        $A = $originalRange[0];
        $B = $originalRange[1];
        foreach ($mergedRangeList as &$currentMerged) // c - d
        {
            $c = $currentMerged[0];
            $d = $currentMerged[1];
            if ($A < $c) // A - c
            {
                // A - cd - B => AB
                if ($B > $d)
                {
                    $currentMerged[0] = $A;
                    $currentMerged[1] = $B;
                }
                // A - c - B - d => Ad
                elseif ($B >= $c - 1)
                {
                    $currentMerged[0] = $A;
                }
                // AB cd
                elseif ($B < $c)
                {
                    array_unshift($mergedRangeList, $originalRange);
                }
                continue 2;
            }
            elseif ($A < $d)
            {
                // c - A - d - B => cB
                if ($B > $d)
                {
                    $currentMerged[1] = $B;
                }
                continue 2;
            }
        }
        array_push($mergedRangeList, $originalRange);
    }
    */
    // echo __LINE__ . ' / ' . count($mergedRangeList) . PHP_EOL;
    // print_r($mergedRangeList);

    // foreach ($mergedRangeList as $currentMerged)
    // {
    //     echo $currentMerged[0] . ' - ' . $currentMerged[1]  . PHP_EOL;
    //     $validIdCount += ($currentMerged[1] - $currentMerged[0] + 1);
    // }

    // $finalRangeList = $validRangeList;
    // do {
    //     $tempList = $finalRangeList;
    //     $finalRangeList = mergeRangeList($tempList);

    // } while(count($finalRangeList) != count($tempList));

    // echo '--------------' . PHP_EOL;
    // foreach ($finalRangeList as $key => $currentMerged)
    // {
    //     echo $currentMerged[0] . ' - ' . $currentMerged[1]  . PHP_EOL;
    //     $validIdCount += ($currentMerged[1] - $currentMerged[0] + 1);

    //     // if ($key > 10) break;
    // }

    echo 'resultat : ' . $result . PHP_EOL;
    echo 'nombre id valid : ' . $validIdCount . PHP_EOL;
}

// function mergeRangeList($rangeList)
// {
//     $tempMergedList = [];
//     for ($i = 0; $i < count($rangeList) - 1; $i++)
//     {
//         $currentRange = $rangeList[$i];
//         $nextRange = $rangeList[$i+1];

//         if ($currentRange[1] >= $nextRange[1])
//         {
//             $tempMergedList[] = $currentRange;
//             $i++;
//         }
//         elseif ($currentRange[1] >= $nextRange[0] - 1)
//         {
//             $tempMergedList[] = [$currentRange[0], $nextRange[1]];
//             $i++;
//         }
//         else
//         {
//             $tempMergedList[] = $currentRange;
//         }
//     }
//     return $tempMergedList;
// }