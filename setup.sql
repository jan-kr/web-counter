CREATE USER 'counteruser'@'%' IDENTIFIED BY 'Test2022';

DROP DATABASE IF EXISTS `counter`;
CREATE DATABASE `counter`;
USE `counter`;

DROP TABLE IF EXISTS `count`;
CREATE TABLE `count` (
  `session_id` varchar(50) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`session_id`)
);

GRANT SELECT, UPDATE, INSERT ON `counter`.* TO 'counteruser'@'%';