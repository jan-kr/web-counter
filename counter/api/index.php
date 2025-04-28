<?php
header('Content-Type: application/json');
require_once('../db/db.php');

$counter = new Counter();

if(!empty($_GET['action']) && !empty($_GET['session'])) {
    $action = trim(htmlspecialchars($_GET['action']));
    $session = trim(htmlspecialchars($_GET['session']));

    switch($action) {
        case 'up':
            $counter->increment($session);
            echo json_encode($counter->getCount($session));
            exit;
        case 'down':
            $counter->decrement($session);
            echo json_encode($counter->getCount($session));
            exit;
        case 'session':
            echo json_encode($counter->getSession($session));
            exit;
        case 'connect':
            $counter->addSession($session, 0);
            echo json_encode($counter->getCount($session));
            exit;
        default:
            echo json_encode([$counter->getCount($session)]);
            exit;
    }
}