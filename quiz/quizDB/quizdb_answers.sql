-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: quizdb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `question_id` int DEFAULT NULL,
  `answer_text` varchar(255) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,1,'JavaScript/TypeScript',0),(2,1,'PHP',0),(3,1,'JSP',0),(4,1,'CSS',1),(5,2,'umożliwia jednoznaczne określenie oraz identyfikację zasobu',0),(6,2,'umożliwia jednoznaczne określenie lokalizacji zasobu',1),(7,2,'umożliwia jednoznaczne określenie nazwy dla danego zasobu',0),(8,2,'ciąg znaków bez narzuconej z góry struktury',0),(9,3,'HEAD',0),(10,3,'GET',0),(11,3,'DUPLICATE',1),(12,3,'POST',0),(13,4,'Wersja szyfrowana protokołu HTTP oparta o protokół szyfrujący SSL',0),(14,4,'Wymiana danych w tym protokole zapobiega przechwyceniu oraz zmianie danych w trakcie komunikacji klient-serwer',0),(15,4,'SSL działa warstwę niżej w modelu OSI od samego HTTPS ',1),(16,4,'Domyślnym portem na których serwer nasłuchuje żądań HTTPS to 443',0),(17,5,'jednocyfrowej',0),(18,5,'dwucyfrowej',0),(19,5,'trzycyfrowej',1),(20,5,'czterocyfrowej',0),(21,6,'wewnętrzny błąd serwera',0),(22,6,'konflikt',0),(23,6,'Nie znaleziono',1),(24,6,'niepoprawne zapytanie',0),(25,7,'użytkownik nie posiadający wiedzy na temat struktury strony nie jest w stanie zmienić zawartości strony',0),(26,7,'zawiera w kodzie dane, które są wyświetlane w przeglądarce',0),(27,7,'zawartość strony może zmienić się pod wpływem interakcji z użytkownikiem',1),(28,7,'każda zmiana danych wymaga ingerencji programisty w kod strony',0),(29,8,'front-end',0),(30,8,'back-end',1),(31,9,'tekst umieszczony pomiędzy znakiem większości i znakiem mniejszości',0),(32,9,'odnosi się do klasyfikowania informacji',0),(33,9,'klasyfikacja polega na umieszczeniu tekstu pomiędzy znacznikiem otwierającym i znacznikiem zamykającym',0),(34,9,'tekst umieszczony pomiędzy znakami #',1),(35,10,'<head>',0),(36,10,'<a>',0),(37,10,'<site>',1),(38,10,'<div>',0);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-03 20:59:02
