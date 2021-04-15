<?php
/**
 * Include this to connect. Change the dbname to match your database,
 * and make sure your login information is correct after you upload 
 * to csunix or your app will stop working.
 * 
 * 
 */
try {
    $dbh = new PDO(
        "mysql:host=localhost;dbname=review_city_hamilton",
        "root",
        ""// for unix root= 000819787, password=dob
    );
} catch (Exception $e)  {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
