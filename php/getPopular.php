<?php
/**
 * Get Score from the data base

 */

        
include "connect.php";


// Prepare and execute the DB query
$command = "SELECT OBJECTID FROM rankings ORDER BY rating DESC, review_count DESC LIMIT 10 ";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();

// Fill an array with User objects based on the results.
$result = [];
while ($row = $stmt->fetch()) {
    
    
    array_push($result, (int)$row["OBJECTID"]);
}


    // Write the json encoded array to the HTTP Response
echo json_encode($result);




    


