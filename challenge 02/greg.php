<?php

$lockNumber = 50;
$password = 0;

$handle = fopen("input.txt", "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {
        // process the line read.
        $direction = $line[0];
        $count = substr($line, 1);

        if ($direction == 'L')
        {
            for($i = $count; $i > 0; $i--)
            {
                $lockNumber--;
                if ($lockNumber == 0) $password++;
                elseif ($lockNumber == -1) $lockNumber = 99;
            }
        }
        if ($direction == 'R')
        {
            for($i = $count; $i > 0; $i--)
            {
                $lockNumber++;
                if ($lockNumber == 100 ) 
                {
                    $lockNumber = 0;
                    $password++;
                }
            }
        }
    }
    fclose($handle);
}

echo $password;