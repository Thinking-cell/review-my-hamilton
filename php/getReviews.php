<?php
/**
 * Get Score from the data base

 */

        
include "connect.php";

$id = filter_input(INPUT_GET, "objid",FILTER_SANITIZE_NUMBER_INT);
// Prepare and execute the DB query
$command = "SELECT review, rating,location_id,user_email FROM reviews  WHERE location_id=? ORDER BY rating";
$params = [$id];
$stmt = $dbh->prepare($command);
$success = $stmt->execute($params);

// Fill an array with User objects based on the results.
$result = [];
while ($row = $stmt->fetch()) {
    $review = [
        
        "OBJECTID" => $row["location_id"],
        "review" => $row["review"],
        "user_email" => $row["user_email"],
        "rating" => (int)$row["rating"]
    ];
    
    array_push($result, $review);
}


    // Write the json encoded array to the HTTP Response
echo json_encode($result);


// Fill an array with User objects based on the results.