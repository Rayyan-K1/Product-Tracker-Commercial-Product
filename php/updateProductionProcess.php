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
$ProductionID = isset($_POST['ProductionID']) ? $_POST['ProductionID'] : null;
$ProductionProcessName = isset($_POST['ProductionProcessName']) ? $_POST['ProductionProcessName'] : null;
$Stages = isset($_POST['Stages']) ? $_POST['Stages'] : null;
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
$sqlQuery = "{call dbo.UPDATEProductionProcess(?, ?, ?)}";
$params = array();
$params['ProductionID'] = $ProductionID;
$params['ProductionProcessName'] = $ProductionProcessName;
$params['Stages'] = $Stages;
$sqlQueryParams = array(
    array(&$params['ProductionID'], SQLSRV_PARAM_IN),
    array(&$params['ProductionProcessName'], SQLSRV_PARAM_IN),
    array(&$params['Stages'], SQLSRV_PARAM_IN),
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
    echo "Production Process Added";
}
