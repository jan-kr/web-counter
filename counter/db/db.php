<?php
	session_start();
	
	$session = session_id();
	//$session = '2k377bij9cm2t0pspj4ed81n82';
	
	define('DATABASE_SERVER', 'mariadb'); 
	define('DATABASE', 'counter');
	define('DATABASE_USER', 'counteruser');
	define('DATABASE_PASSWORD', 'Test2022');
	
	/* Attempt to connect to MySQL database */
	$mysqli = new mysqli(DATABASE_SERVER, DATABASE_USER, DATABASE_PASSWORD, DATABASE);
	
	// Check connection
	if($mysqli == false) {
		die("ERROR: Could not connect. " . $mysqli->connect_error);
	}
	
	// Returns all apps in the database
	function sessionCount($session) {
		global $mysqli;
		$sql = "SELECT * from count WHERE session_id = '$session'";
		$result = $mysqli->query($sql);
		$ergebnis=$result->fetch_array();
		$result->close();
		return $ergebnis['count'];
	}
	
	function createSessionCount($session) {
		global $mysqli;
		$sql = "SELECT * from count WHERE session_id = '$session'";
		$result = $mysqli->query($sql);
		if($result->num_rows === 0) {
			$sql = "INSERT INTO count (session_id, count) VALUES ('$session', 0)";
			$mysqli->query($sql);
			$result->close();
		}
	}
	
	function updateCount($session, $alteration) {
		global $mysqli;
		$newcount = sessionCount($session);
		$newcount += $alteration;
		if($newcount < 0) {
			$newcount = 0;
		}
		$sql = "UPDATE count SET count=$newcount WHERE session_id='$session'";
		$result = $mysqli->query($sql);

		return $result;
	}
?>