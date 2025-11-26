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
$Features = isset($_POST['Features']) ? $_POST['Features'] : null;
$Price = isset($_POST['Price']) ? $_POST['Price'] : null;
$Quantity = isset($_POST['Quantity']) ? $_POST['Quantity'] : null;
$OrderNumber = isset($_POST['OrderNumber']) ? $_POST['OrderNumber'] : null;
$Description = isset($_POST['Description']) ? $_POST['Description'] : null;
$Completed = isset($_POST['Completed']) ? $_POST['Completed'] : null;
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
$sqlQuery = "{call dbo.ADDOrder(?, ?, ?, ?, ?, ?, ?, ?)}";
$params = array();
$params['ID'] = $ID;
$params['Name'] = $Name;
$params['Features'] = $Features;
$params['Price'] = $Price;
$params['Quantity'] = $Quantity;
$params['OrderNumber'] = $OrderNumber;
$params['Description'] = $Description;
$params['Completed'] = $Completed;
$sqlQueryParams = array(
    array(&$params['ID'], SQLSRV_PARAM_IN),
    array(&$params['Name'], SQLSRV_PARAM_IN),
    array(&$params['Features'], SQLSRV_PARAM_IN),
    array(&$params['Price'], SQLSRV_PARAM_IN),
    array(&$params['Quantity'], SQLSRV_PARAM_IN),
    array(&$params['OrderNumber'], SQLSRV_PARAM_IN),
    array(&$params['Description'], SQLSRV_PARAM_IN),
    array(&$params['Completed'], SQLSRV_PARAM_IN),
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
