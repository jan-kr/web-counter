<?php

require_once "../config.php";

class Counter
{
    private $pdo;

    public function __construct()
    {
        global $db;
        $dsn = "sqlite:$db";
        $this->pdo = new PDO($dsn);

        $statements = [
            'CREATE TABLE IF NOT EXISTS count (
            session_id varchar(50) NOT NULL,
            count int(11) NOT NULL,
            PRIMARY KEY (session_id)
        )',
        ];
        foreach ($statements as $statement) {
            $this->pdo->exec($statement);
        }
    }

    function getSession(string $session_id): array
    {
        try {
            $statement = $this->pdo->prepare("SELECT * FROM count WHERE session_id = :session_id");
            $statement->execute(['session_id' => $session_id]);
            return $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return [];
        }
    }

    function getCount(string $session_id): int
    {
        try {
            $statement = $this->pdo->prepare("SELECT count FROM count WHERE session_id = :session_id");
            $statement->execute(['session_id' => $session_id]);
            return $statement->fetchColumn();
        } catch (\PDOException $e) {
            return -1;
        }
    }

    function dropSession(string $session_id): bool
    {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM count WHERE session_id = :session_id");
            $stmt->execute(['session_id' => $session_id]);
            return true;
        } catch (\PDOException $e) {
            return false;
        }
    }

    function addSession(string $session_id, int $initial_count)
    {
        try {
            $this->pdo->beginTransaction();
            if (count($this->getSession($session_id))) {
                //$this->dropSession($session_id);
                return false;
            }

            $query = "INSERT INTO count(session_id, count) VALUES(:session_id, :count)";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindValue(':session_id', $session_id);
            $stmt->bindValue(':count', $initial_count);
            $stmt->execute();
            $this->pdo->commit();

            return true;
        } catch (\PDOException $e) {
            $this->pdo->rollBack();
            return false;
        }
    }

    function increment(string $session_id): int
    {
        $count = $this->getCount($session_id);
        if (++$count >= PHP_INT_MAX) {
            $count = PHP_INT_MAX;
        }
        try {
            $this->pdo->beginTransaction();
            $stmt = $this->pdo->prepare('UPDATE count SET count=:count WHERE session_id=:session_id');
            $stmt->execute(['session_id' => $session_id, 'count' => $count]);
            $this->pdo->commit();
            return $count;
        } catch (\PDOException $e) {
            $this->pdo->rollBack();
            return -1;
        }
    }

    function decrement(string $session_id): int
    {
        $count = $this->getCount($session_id) - 1;
        if ($count < 0) {
            $count = 0;
        }
        try {
            $this->pdo->beginTransaction();
            $stmt = $this->pdo->prepare('UPDATE count SET count=:count WHERE session_id=:session_id');
            $stmt->execute(['session_id' => $session_id, 'count' => $count]);
            $this->pdo->commit();
            return $count;
        } catch (\PDOException $e) {
            $this->pdo->rollBack();
            return -1;
        }
    }

}