-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: flashcard_app
-- ------------------------------------------------------
-- Server version	9.6.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '7e972f8d-316f-11f1-9ca2-3ad1699ccf3d:1-192';

--
-- Table structure for table `flashcards`
--

DROP TABLE IF EXISTS `flashcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashcards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashcards`
--

LOCK TABLES `flashcards` WRITE;
/*!40000 ALTER TABLE `flashcards` DISABLE KEYS */;
INSERT INTO `flashcards` VALUES (48,'hi','bye','2026-05-18 18:02:56',NULL),(49,'yes','no','2026-05-18 18:10:20',NULL),(50,'over','under','2026-05-18 18:13:03',NULL),(51,'big','small','2026-05-18 18:43:48',NULL),(55,'1+1 =','2','2026-05-19 09:29:40',NULL),(61,'1+1 =','2','2026-05-19 18:31:27',1),(62,'capital of Australia','Canberra','2026-05-19 18:31:52',1),(63,'hello','bye1','2026-05-19 18:32:10',1),(64,'yes','no','2026-05-19 18:32:17',1),(65,'over','under','2026-05-19 18:32:27',1),(67,'care','careful','2026-05-20 12:45:02',3),(68,'3 +3 +1 =','7','2026-05-20 13:06:42',4),(69,'4+4+1 =','9','2026-05-20 13:10:26',5),(70,'capital of australia','canberra','2026-05-20 13:11:06',5),(71,'hello','bye','2026-05-20 13:11:14',5),(72,'3 +7  +1=','11','2026-05-20 13:15:31',6),(73,'hello','bye','2026-05-20 13:16:14',6),(74,'gym','running','2026-05-20 13:16:21',6),(75,'hi','hi','2026-05-20 13:16:28',6),(77,'','','2026-05-20 13:23:03',7),(78,'','','2026-05-20 13:23:04',7),(79,'','','2026-05-20 13:23:06',7),(80,'','','2026-05-20 13:23:07',7),(82,'1','2','2026-05-20 13:26:13',8),(83,'hi','bye','2026-05-20 13:26:19',8),(84,'here','there','2026-05-20 13:26:25',8),(85,'lol','lol','2026-05-20 13:26:31',8),(87,'w','w','2026-05-20 13:37:01',9),(88,'wer','eryw','2026-05-20 13:37:05',9),(89,'1234','234','2026-05-20 13:37:09',9);
/*!40000 ALTER TABLE `flashcards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sam','samv@gmail.com','$2b$12$ePXCCDiCf2ZjvV2fsOc35O9tqd52KuOmhB2la6AKxMHFbZTZh0VFG',1,'2026-05-19 18:19:53'),(2,'samnang ','samnang@gmail.com','$2b$12$/FjKfdCWQRS/UgCFSmylV.oVfWplVqwh7.a9Pqwv1KmiVaLmIRwVu',0,'2026-05-19 18:49:17'),(3,'sam2','sam1@gmail.com','$2b$12$Nns.G0a5A6taTLqDgRwo9.WBP.tDPzceIj7QYt5wmO8xuPy..0v8O',0,'2026-05-19 19:00:30'),(4,'sam3','sam3@gmail.com','$2b$12$f2MqbfWUUxX5ULbjJTBoNOQSbnBqErpYKuvqXcmMETiGxkYogme1K',0,'2026-05-20 13:05:47'),(5,'sam5','sam5@gmail.com','$2b$12$uHnN5VW/fzrXAch2FTIMtOfjSI0Dhrz5UG4mqQ1RZyNb59CqwOSAe',0,'2026-05-20 13:09:48'),(6,'sam7','sam7@gmail.com','$2b$12$.Lcpv4Hk8rXplNBkZQLhBOSzQMsxV/w5MWeooRJpvutteU0iR5due',0,'2026-05-20 13:14:44'),(7,'sam8','sam8@gmail.com','$2b$12$R/P9R6rO3og2f3fHOgQnjucGjEBhkiheJBkZyh4WumURe0Sk6ZCn2',0,'2026-05-20 13:21:46'),(8,'sam9','sam9@gmail.com','$2b$12$uhzsQJSS2hQ1DUKEeP0yDeB57RgR1ExwLjMJu052dptxJq2gpyp2.',0,'2026-05-20 13:25:02'),(9,'sam97','sam97@gamil.com','$2b$12$BvSEMAMct7/mk7kFCaojyuvrUjwGINySRcYqAf63nKNKkrhdMv/3e',0,'2026-05-20 13:35:32');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `view_history`
--

DROP TABLE IF EXISTS `view_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `view_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `flashcard_id` int NOT NULL,
  `viewed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `flashcard_id` (`flashcard_id`),
  CONSTRAINT `view_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `view_history_ibfk_2` FOREIGN KEY (`flashcard_id`) REFERENCES `flashcards` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `view_history`
--

LOCK TABLES `view_history` WRITE;
/*!40000 ALTER TABLE `view_history` DISABLE KEYS */;
INSERT INTO `view_history` VALUES (7,1,63,'2026-05-19 18:46:10'),(8,4,68,'2026-05-20 13:06:46'),(9,5,69,'2026-05-20 13:10:29'),(10,5,69,'2026-05-20 13:10:31'),(11,5,69,'2026-05-20 13:10:43'),(12,5,69,'2026-05-20 13:11:18'),(13,6,72,'2026-05-20 13:15:32');
/*!40000 ALTER TABLE `view_history` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-20 23:58:14
