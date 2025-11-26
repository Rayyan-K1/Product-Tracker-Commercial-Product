<?php
ini_set('max_execution_time', '600');
ini_set('memory_limit', '256M');
/* This page is dynamically created (and has changable content), so make sure
it isn't cached.
 */
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
/* We allow cross domain access.
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
// Variable pulls the parameters from the URL
$ID = isset($_POST['ID']) ? $_POST['ID'] : null;
$Name = isset($_POST['Name']) ? $_POST['Name'] : null;
$Description = isset($_POST['Description']) ? $_POST['Description'] : null;
$Progress = isset($_POST['Progress']) ? $_POST['Progress'] : null;
$Price = isset($_POST['Price']) ? $_POST['Price'] : null;
$OrderNumber = isset($_POST['OrderNumber']) ? $_POST['OrderNumber'] : null;
$Category = isset($_POST['Category']) ? $_POST['Category'] : null;
$Features = isset($_POST['Features']) ? $_POST['Features'] : null;
// $telephone = isset($_POST['ImageRef']) ? $_POST['ImageRef'] : null;
// Server connection details
$server = "db";
// Database entry details
$connectionInfo = array("Database" => "ProductTracker",
    "UID" => "user",
    "PWD" => "pw",
    "ReturnDatesAsStrings" => true);
// Actually connecting to the database
$link = sqlsrv_connect($server, $connectionInfo);
// If the connection fails
if ($link === false) {
    // End everything and print the error
    die(print_r(sqlsrv_errors(), true));
}
// Call the Stored Procedure
$sqlQuery = "{call dbo.ADDProduct(?, ?, ?, ?, ?, ?, ?, ?)}";
$params = array();
$params['ID'] = $ID;
$params['Name'] = $Name;
$params['Description'] = $Description;
$params['Progress'] = $Progress;
$params['Price'] = $Price;
$params['OrderNumber'] = $OrderNumber;
$params['Category'] = $Category;
$params['Features'] = $Features;
$sqlQueryParams = array(
    array(&$params['ID'], SQLSRV_PARAM_IN),
    array(&$params['Name'], SQLSRV_PARAM_IN),
    array(&$params['Description'], SQLSRV_PARAM_IN),
    array(&$params['Progress'], SQLSRV_PARAM_IN),
    array(&$params['Price'], SQLSRV_PARAM_IN),
    array(&$params['OrderNumber'], SQLSRV_PARAM_IN),
    array(&$params['Category'], SQLSRV_PARAM_IN),
    array(&$params['Features'], SQLSRV_PARAM_IN),
);
// Connect to the Database with the stored procedure to be executed
$queryResult = sqlsrv_query($link, $sqlQuery, $sqlQueryParams);
// If the execution fails
if ($queryResult === false) {
    echo "Query failed";
    echo json_encode($sqlQueryParams);
} else {
    echo "Product Added";
}
