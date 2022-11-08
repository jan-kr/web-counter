<?php
header('Content-Type: application/json');
require_once('../db/db.php');

$todo = "";

if(!empty($_GET['todo']) && !empty($_GET['session'])) {
	$todo = $_GET['todo'];
	$session = $_GET['session'];
	
	switch($todo) {
		case 'add':
			updateCount($session, 1);
			echo json_encode([sessionCount($session)]);
			break;
		case 'del':
			updateCount($session, -1);
			echo json_encode([sessionCount($session)]);
			break;
		case 'session':
			echo json_encode([$session]);
			break;
		case 'connect':
			createSessionCount($session);
			break;
		default:
			echo json_encode([sessionCount($session)]);
	}
} 


?>