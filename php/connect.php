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
        "mysql:host=us-cdbr-east-03.cleardb.com;dbname=heroku_e45a942403ea8ca",
        "b28b6aeb91be3b",
        "bc56ac25"// for unix root= 000819787, password=dob
    );
} catch (Exception $e)  {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
