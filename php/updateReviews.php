<?php
/**
 * Get Score from the data base

 */

        
include "connect.php";

try{
$objId = filter_input(INPUT_GET, "location_id",FILTER_SANITIZE_NUMBER_INT);
$rating = filter_input(INPUT_GET, "rating",FILTER_SANITIZE_NUMBER_INT);
$locationName = filter_input(INPUT_GET, "location_name",FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$locationAddress = filter_input(INPUT_GET, "location_address",FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$userEmail = filter_input(INPUT_GET, "user_email",FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$review = filter_input(INPUT_GET, "review",FILTER_SANITIZE_FULL_SPECIAL_CHARS);
}catch(Exception $e){
    echo json_encode(-1);
    die();
}

// Prepare and execute the DB query
$command = "SELECT location_id, user_email FROM reviews WHERE location_id=? ";
$params = [$objId];
$stmt = $dbh->prepare($command);
$success = $stmt->execute($params);

$isFaulty=false;
if($objId===null||$objId===""){

}else if($rating===null||$rating===0){
    $isFaulty=true;
}else if($locationName===null||$locationName===""||$locationAddress===null||$locationAddress===""||$review===null||$review===""||$userEmail===null||$userEmail===""){
    $isFaulty=true;
}else{}

if($isFaulty){
    echo json_encode(-1);
    die();
}

$isExist=false;
while ($row = $stmt->fetch()) {
    
    if(strtolower($userEmail)===strtolower($row["user_email"])){
        $isExist=true;
    }
    
}

// updating rankings

$command = "SELECT OBJECTID FROM rankings ";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();
$inRankings=false;

while ($row = $stmt->fetch()) {
    
    if($objId===$row["OBJECTID"]){
        $inRankings=true;
    }
    
}

if($inRankings){
    $command = "SELECT rating FROM reviews WHERE location_id=? ";
    $stmt = $dbh->prepare($command);
    $params = [$objId];
    $success = $stmt->execute($params);

    $sum=0;
    $count=0;
    while ($row = $stmt->fetch()) {
    
      $sum=$sum+$row["rating"];
      $count++;
        
    }
    $count++;
    $sum=$sum+$rating;
    $avg=$sum/$count;

    $command = "UPDATE rankings SET review_count=? , rating=? WHERE OBJECTID=? " ;
    $params = [$count,$avg,$objId];
    $stmt = $dbh->prepare($command);
    $success = $stmt->execute($params);




}else{

    $command = "INSERT INTO rankings (OBJECTID,location_name,location_address,rating,review_count) VALUES(?,?,?,?,?) ";
    $params = [$objId,$locationName,$locationAddress,$rating,1];
    $stmt = $dbh->prepare($command);
    $success = $stmt->execute($params);

}





// updating reviews

if($isExist){
    $command = "UPDATE reviews SET review=? , rating=? WHERE location_id=? AND user_email=?" ;
    $params = [$review,$rating,$objId,strtolower($userEmail)];
    $stmt = $dbh->prepare($command);
    $success = $stmt->execute($params);
    echo json_encode(0);

}else{

    $command = "INSERT INTO reviews (location_name,location_address,location_id,user_email,review,rating) VALUES(?,?,?,?,?,?) ";
    $params = [$locationName,$locationAddress,$objId,$userEmail,$review,$rating];
    $stmt = $dbh->prepare($command);
    $success = $stmt->execute($params);
    echo json_encode(1);
}








   