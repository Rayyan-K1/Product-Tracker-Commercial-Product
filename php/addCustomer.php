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
$Name = isset($_POST['Title']) ? $_POST['Title'] : null;
$Name = isset($_POST['FirstName']) ? $_POST['FirstName'] : null;
$Name = isset($_POST['Surname']) ? $_POST['Surname'] : null;
$Features = isset($_POST['Telephone']) ? $_POST['Telephone'] : null;
$Price = isset($_POST['EmailAddress']) ? $_POST['EmailAddress'] : null;
$Quantity = isset($_POST['Notes']) ? $_POST['Notes'] : null;
$OrderNumber = isset($_POST['Tags']) ? $_POST['Tags'] : null;
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
$sqlQuery = "{call dbo.ADDCustomer(?, ?, ?, ?, ?, ?, ?, ?)}";
$params = array();
$params['ID'] = $ID;
$params['Title'] = $Name;
$params['FirstName'] = $Features;
$params['Surname'] = $Price;
$params['Telephone'] = $Quantity;
$params['EmailAddress'] = $OrderNumber;
$params['Notes'] = $Description;
$params['Tags'] = $Completed;
$sqlQueryParams = array(
    array(&$params['ID'], SQLSRV_PARAM_IN),
    array(&$params['Title'], SQLSRV_PARAM_IN),
    array(&$params['FirstName'], SQLSRV_PARAM_IN),
    array(&$params['Surname'], SQLSRV_PARAM_IN),
    array(&$params['Telephone'], SQLSRV_PARAM_IN),
    array(&$params['EmailAddress'], SQLSRV_PARAM_IN),
    array(&$params['Notes'], SQLSRV_PARAM_IN),
    array(&$params['Tags'], SQLSRV_PARAM_IN),
);
// Connect to the Database with the stored procedure to be executed
$queryResult = sqlsrv_query($link, $sqlQuery, $sqlQueryParams);
// If the execution fails
if ($queryResult === false) {
    echo "Query failed";
    echo json_encode($sqlQueryParams);
    echo ($sqlQuery);
    echo ($link);
} else {
    echo "Order Added";
}
