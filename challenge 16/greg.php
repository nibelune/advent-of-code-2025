<?php

$handle = fopen("input.txt", "r");
const MAX_WIRE = 1000;
$junctionBoxList = [];
$distanceList = [];
$connectedBoxList = [];
$circuitList = [];
$result = 0;

if ($handle) {
    $boxIndex = 1;
    while (($line = fgets($handle)) !== false) {
        // print_r($beamPositions);
        $line = trim($line);
        if (strlen($line) === 0) continue;
        $box = explode(',', $line);
        foreach ($junctionBoxList as $currentIndex => $currentBox)
        {
            $distance = getDistance($currentBox, $box);
            $distanceList[$currentIndex . '-' . $boxIndex] = $distance;
        }
        $junctionBoxList[$boxIndex] = $box;
        $circuitList[$boxIndex] = [$boxIndex];

        $boxIndex++;
    }
}
asort($distanceList);
// print_r($distanceList);

$counter = 1;
foreach($distanceList as $boxIndexes => $distance)
{
    
    // $counter++;
    // if($counter > MAX_WIRE) break;
    // print_r($boxIndexes);
    $indexArray = explode('-', $boxIndexes);

    $boxId1 = intval($indexArray[0]);
    $boxId2 = intval($indexArray[1]);

    $circuitId1 = null;
    $circuitId2 = null;
    foreach ($circuitList as $currentCircuitId => $currentCircuit)
    {
        if (in_array($boxId1, $currentCircuit) !== false) $circuitId1 = $currentCircuitId;
        if (in_array($boxId2, $currentCircuit) !== false) $circuitId2 = $currentCircuitId;
        if (! is_null($circuitId1) && ! is_null($circuitId2)) break;
    }
    // echo '>>>>>>>>>>>>>><' . PHP_EOL;
    // print_r([$circuitId1,$circuitId2]);
    // aucune box trouvée => créer un nouveau circuit
    if (is_null($circuitId1) && is_null($circuitId2))
    {
        $circuitList[] = [$boxId1, $boxId2];
    }
    // si un est dans un circuit => ajouter la box au circuit
    elseif(! is_null($circuitId1) && is_null($circuitId2))
    {
        $circuitList[$circuitId1][] = $boxId2;
    }
    elseif(! is_null($circuitId2) && is_null($circuitId1))
    {
        $circuitList[$circuitId2][] = $boxId1;
    }
    else 
    {
        // vérifier si les deux sont dans le meme circuit => continue
        if($circuitId1 == $circuitId2) continue;
        // vérifier si les deux sont dans des circuits différents => merge les circuits
        $circuitList[$circuitId1] = array_merge($circuitList[$circuitId1], $circuitList[$circuitId2]);
        unset($circuitList[$circuitId2]);
    }
    
    // var_dump(sizeof($circuitList));
    if (sizeof($circuitList) == 1)
    {
        var_dump($junctionBoxList[$boxId1]);
        var_dump($junctionBoxList[$boxId2]);
        $result = intval($junctionBoxList[$boxId1][0], 10) * intval($junctionBoxList[$boxId2][0], 10);
        break;
    }
}
// var_dump($circuitList);
echo $result;

function getDistance(array $a, array $b)
{
    return sqrt(pow($a[0] - $b[0], 2) +pow($a[1] - $b[1], 2) +pow($a[2] - $b[2], 2));
}

// uasort($circuitList, function($c1, $c2){ return sizeof($c2) - sizeof($c1);});

// $result = 1;
// $count = 3;
// foreach ($circuitList as $currentCircuit)
// {
//     print_r($currentCircuit);
//     $result *= sizeof($currentCircuit);
//     $count--;
//     if ($count <= 0) break;
// }

// echo '#############' . PHP_EOL;
// print_r($circuitList);