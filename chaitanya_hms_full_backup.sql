-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: chaitanya_hms
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `department` varchar(50) NOT NULL,
  `doctor_name` varchar(100) DEFAULT NULL,
  `booking_date` date NOT NULL,
  `status` enum('Pending','Checked In','Completed','Cancelled') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'Rajesh Patil','rajesh@example.com','cardiology','Dr. Sarah Johnson','2026-06-20','Pending','2026-06-19 16:15:42'),(2,'Neha Deshmukh','neha@example.com','pediatrics','Dr. Emily Davis','2026-06-21','Checked In','2026-06-19 16:15:42');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `batch_number` varchar(50) DEFAULT NULL,
  `category` varchar(50) NOT NULL,
  `qty` int(11) NOT NULL,
  `min_threshold` int(11) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `purchase_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `supplier_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'Paracetamol 500mg','B12345','Medicines',1500,200,'Tablets','2026-01-10','2028-01-10','PharmaCorp'),(2,'IV Drip Set','IV0012','Consumables',300,50,'Pcs','2026-03-05','2029-03-05','MediSupply'),(3,'Disprin 350mg','DIS456','Medicines',800,100,'Tablets','2026-04-01','2029-04-01','Reckitt Benckiser'),(4,'Pantoprazole 40mg','PAN900','Medicines',500,100,'Tablets','2026-05-10','2028-05-10','Alkem Labs'),(5,'N95 Respirator Masks','MSK-N95','Consumables',1200,300,'Pcs','2026-06-01','2031-06-01','3M India'),(6,'Dolo 650mg','DL8833','Medicines',2000,500,'Tablets','2026-06-10','2029-06-10','Micro Labs'),(7,'IV Cannula 20G','CAN-20G','Consumables',600,150,'Pcs','2026-05-20','2029-05-20','Becton Dickinson'),(8,'Crocin 650mg','CR9922','Medicines',1000,200,'Tablets','2026-06-01','2029-06-01','GlaxoSmithKline'),(9,'Betadine Ointment 20g','BT3344','Medicines',150,40,'Tubes','2026-05-15','2028-05-15','Win-Medicare'),(10,'ORS Powder','ORS772','Medicines',500,100,'Sachets','2026-06-10','2028-06-10','FDC Limited'),(11,'Surgical Mask 3-Ply','MSK-3P','Consumables',3000,500,'Pcs','2026-06-05','2031-06-05','CareGlove Inc'),(12,'Syringe with Needle 5ml','SYR-5ML','Consumables',1800,300,'Pcs','2026-05-25','2031-05-25','Hindustan Syringes');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `ward` varchar(50) NOT NULL,
  `bed` varchar(20) NOT NULL,
  `admission_date` date NOT NULL,
  `doctor` varchar(100) NOT NULL,
  `status` enum('Stable','Critical','Post-Op','Discharge') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES 
(1,'Rahul Patil',29,'General','GEN-01','2026-06-15','Dr. Vikram Patil','Stable'),
(2,'Sunita Deshmukh',42,'General','GEN-05','2026-06-16','Dr. Suresh Mehta','Stable'),
(3,'Amit Shinde',35,'General','GEN-09','2026-06-17','Dr. Rajesh Joshi','Discharge'),
(4,'Sanjay Kumar',45,'ICU','ICU-01','2026-06-18','Dr. Sarah Johnson','Critical'),
(5,'Vijay Chavan',60,'ICU','ICU-03','2026-06-14','Dr. Michael Chen','Critical'),
(6,'Kiran More',55,'ICU','ICU-05','2026-06-19','Dr. Kavita Nair','Post-Op'),
(7,'Aarav Pawar',8,'Pediatric','PED-02','2026-06-18','Dr. Emily Davis','Stable'),
(8,'Ananya Wong',5,'Pediatric','PED-04','2026-06-19','Dr. James Wilson','Stable'),
(9,'Sai Gaikwad',11,'Pediatric','PED-07','2026-06-17','Dr. Pooja Rane','Post-Op'),
(10,'Anita Sharma',32,'Maternity','MAT-02','2026-06-19','Dr. Sneha Bhosale','Stable'),
(11,'Pooja Patil',28,'Maternity','MAT-03','2026-06-17','Dr. Sneha Bhosale','Stable'),
(12,'Snehal Rane',27,'Maternity','MAT-06','2026-06-18','Dr. Sneha Bhosale','Post-Op'),
(13,'Ramesh More',50,'Orthopedic','ORT-01','2026-06-12','Dr. Pranav Sharma','Stable'),
(14,'Sandip Jadhav',38,'Orthopedic','ORT-04','2026-06-16','Dr. Amol Jadhav','Post-Op'),
(15,'Deepak Gaikwad',62,'Orthopedic','ORT-08','2026-06-15','Dr. Pranav Sharma','Discharge');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `role` enum('Doctor','Nurse','Lab Technician','Support Staff') NOT NULL,
  `department` varchar(50) NOT NULL,
  `shift` enum('Morning','Evening','Night') NOT NULL,
  `contact` varchar(20) NOT NULL,
  `status` enum('On Duty','Off Duty','On Leave') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'Dr. Sarah Johnson','Doctor','Cardiology','Morning','+91 98765 43210','On Duty'),(2,'Dr. Michael Chen','Doctor','Neurology','Morning','+91 98765 43211','On Duty'),(3,'Dr. Emily Davis','Doctor','Pediatrics','Morning','+91 98765 43212','On Duty'),(4,'Dr. Robert Smith','Doctor','Cardiology','Evening','+91 98765 43213','On Duty'),(5,'Dr. Lisa Wong','Doctor','Neurology','Evening','+91 98765 43214','On Duty'),(6,'Dr. James Wilson','Doctor','Pediatrics','Evening','+91 98765 43215','On Duty'),(7,'Dr. Pranav Sharma','Doctor','Orthopedics','Morning','+91 98234 56701','On Duty'),(8,'Dr. Anjali Deshmukh','Doctor','Ophthalmology','Morning','+91 98234 56702','On Duty'),(9,'Dr. Vikram Patil','Doctor','General Medicine','Morning','+91 98234 56703','On Duty'),(10,'Dr. Neha Kulkarni','Doctor','Dermatology','Morning','+91 98234 56704','On Duty'),(11,'Dr. Rajesh Joshi','Doctor','ENT','Evening','+91 98234 56705','On Duty'),(12,'Dr. Sneha Bhosale','Doctor','Gynecology','Morning','+91 98234 56706','On Leave'),(13,'Dr. Amol Jadhav','Doctor','Orthopedics','Night','+91 98234 56707','On Duty'),(14,'Dr. Pooja Rane','Doctor','Pediatrics','Night','+91 98234 56708','On Duty'),(15,'Dr. Suresh Mehta','Doctor','General Medicine','Evening','+91 98234 56709','On Duty'),(16,'Dr. Kavita Nair','Doctor','Cardiology','Night','+91 98234 56710','On Duty'),(17,'Dr. Arun Shinde','Doctor','Neurology','Night','+91 98234 56711','Off Duty'),(18,'Dr. Manisha Gaikwad','Doctor','Dentistry','Morning','+91 98234 56712','On Duty'),(19,'Priya Pawar','Nurse','Cardiology','Morning','+91 97654 32101','On Duty'),(20,'Snehal More','Nurse','Cardiology','Evening','+91 97654 32102','On Duty'),(21,'Rupali Kale','Nurse','Neurology','Morning','+91 97654 32103','On Duty'),(22,'Anita Chavan','Nurse','Neurology','Evening','+91 97654 32104','On Duty'),(23,'Meera Deshpande','Nurse','Pediatrics','Morning','+91 97654 32105','On Duty'),(24,'Sonal Shirke','Nurse','Pediatrics','Evening','+91 97654 32106','On Duty'),(25,'Kavita Mane','Nurse','Orthopedics','Morning','+91 97654 32107','On Duty'),(26,'Rekha Sawant','Nurse','Orthopedics','Night','+91 97654 32108','On Duty'),(27,'Sunita Ghodke','Nurse','ICU','Morning','+91 97654 32109','On Duty'),(28,'Lata Nikam','Nurse','ICU','Evening','+91 97654 32110','On Duty'),(29,'Vaishali Thakur','Nurse','ICU','Night','+91 97654 32111','On Duty'),(30,'Jyoti Wagh','Nurse','General Medicine','Morning','+91 97654 32112','On Duty'),(31,'Asha Salunkhe','Nurse','General Medicine','Evening','+91 97654 32113','On Duty'),(32,'Swati Kadam','Nurse','Gynecology','Morning','+91 97654 32114','On Duty'),(33,'Pallavi Shete','Nurse','Gynecology','Night','+91 97654 32115','On Duty'),(34,'Dipali Bhagat','Nurse','Ophthalmology','Morning','+91 97654 32116','On Duty'),(35,'Rashmi Phadke','Nurse','Dermatology','Morning','+91 97654 32117','On Duty'),(36,'Mansi Kulkarni','Nurse','ENT','Evening','+91 97654 32118','On Duty'),(37,'Nilam Patole','Nurse','Dentistry','Morning','+91 97654 32119','On Duty'),(38,'Pooja Gaikwad','Nurse','ICU','Morning','+91 97654 32120','On Leave'),(39,'Shruti Avhad','Nurse','Cardiology','Night','+91 97654 32121','On Duty'),(40,'Rani Dhage','Nurse','Neurology','Night','+91 97654 32122','On Duty'),(41,'Bhagyashree Sable','Nurse','Pediatrics','Night','+91 97654 32123','Off Duty'),(42,'Tejal Borse','Nurse','General Medicine','Night','+91 97654 32124','On Duty'),(43,'Rahul Kamble','Lab Technician','Pathology','Morning','+91 96543 21001','On Duty'),(44,'Sachin Gawade','Lab Technician','Pathology','Evening','+91 96543 21002','On Duty'),(45,'Akash Pimpale','Lab Technician','Radiology','Morning','+91 96543 21003','On Duty'),(46,'Nilesh Thorat','Lab Technician','Radiology','Evening','+91 96543 21004','On Duty'),(47,'Yogesh Bhandari','Lab Technician','Biochemistry','Morning','+91 96543 21005','On Leave'),(48,'Santosh Dolas','Lab Technician','Microbiology','Night','+91 96543 21006','On Duty'),(49,'Ramesh Shinde','Support Staff','Housekeeping','Morning','+91 95432 10001','On Duty'),(50,'Sunil Waghmare','Support Staff','Housekeeping','Evening','+91 95432 10002','On Duty'),(51,'Ganesh Pawar','Support Staff','Housekeeping','Night','+91 95432 10003','On Duty'),(52,'Manoj Londhe','Support Staff','Security','Morning','+91 95432 10004','On Duty'),(53,'Deepak Gade','Support Staff','Security','Evening','+91 95432 10005','On Duty'),(54,'Vishal Jagtap','Support Staff','Security','Night','+91 95432 10006','On Duty'),(55,'Prakash Thombare','Support Staff','Maintenance','Morning','+91 95432 10007','On Duty'),(56,'Sandip Khedekar','Support Staff','Maintenance','Evening','+91 95432 10008','On Duty'),(57,'Ajay Bhosale','Support Staff','Ambulance','Morning','+91 95432 10009','On Duty'),(58,'Sagar Nimbalkar','Support Staff','Ambulance','Night','+91 95432 10010','On Duty'),(59,'Ravi Ghorpade','Support Staff','Reception','Morning','+91 95432 10011','On Duty'),(60,'Anil Mhaske','Support Staff','Reception','Evening','+91 95432 10012','On Duty'),(61,'Kishor Devkar','Support Staff','Pharmacy','Morning','+91 95432 10013','On Leave'),(62,'Balu Sonawane','Support Staff','Pharmacy','Evening','+91 95432 10014','On Duty');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waste_logs`
--

DROP TABLE IF EXISTS `waste_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waste_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `type` enum('Biomedical','Sharps','General') NOT NULL,
  `department` varchar(50) NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `status` enum('Disposed','Pending') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste_logs`
--

LOCK TABLES `waste_logs` WRITE;
/*!40000 ALTER TABLE `waste_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `waste_logs` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `stock_orders`
--

DROP TABLE IF EXISTS `stock_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `supplier_name` varchar(100) NOT NULL,
  `order_date` date NOT NULL,
  `status` enum('Pending','Received') DEFAULT 'Pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_orders`
--

LOCK TABLES `stock_orders` WRITE;
/*!40000 ALTER TABLE `stock_orders` DISABLE KEYS */;
INSERT INTO `stock_orders` VALUES (1,'Crocin 650mg',500,'Tablets','GlaxoSmithKline','2026-06-18','Pending'),(2,'Surgical Gloves (M)',100,'Pairs','CareGlove Inc','2026-06-19','Pending'),(3,'Amoxicillin 250mg',300,'Capsules','HealthMed Ltd','2026-06-15','Received');
/*!40000 ALTER TABLE `stock_orders` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-19 21:54:12
