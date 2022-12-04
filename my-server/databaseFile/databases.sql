-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: library_management_system
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ev_admin`
--

DROP TABLE IF EXISTS `ev_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL COMMENT '管理员账号',
  `password` varchar(45) NOT NULL,
  `addTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='管理员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_admin`
--

LOCK TABLES `ev_admin` WRITE;
/*!40000 ALTER TABLE `ev_admin` DISABLE KEYS */;
INSERT INTO `ev_admin` VALUES (1,'admin','123456','2022-04-21 00:00:00');
/*!40000 ALTER TABLE `ev_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_books`
--

DROP TABLE IF EXISTS `ev_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_books` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `bookName` varchar(255) NOT NULL COMMENT '书名',
  `author` varchar(255) NOT NULL COMMENT '作者',
  `press` varchar(255) NOT NULL COMMENT '出版社',
  `pressTime` varchar(255) NOT NULL COMMENT '出版时间',
  `language` varchar(255) NOT NULL COMMENT '语言',
  `price` varchar(255) NOT NULL COMMENT '价格',
  `inventory` int NOT NULL COMMENT '库存',
  `introduction` varchar(255) DEFAULT NULL COMMENT '介绍',
  `createTime` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `classify` varchar(255) NOT NULL COMMENT '图书类别',
  PRIMARY KEY (`bookId`),
  UNIQUE KEY `bookId_UNIQUE` (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='图书列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_books`
--

LOCK TABLES `ev_books` WRITE;
/*!40000 ALTER TABLE `ev_books` DISABLE KEYS */;
INSERT INTO `ev_books` VALUES (2,'JavaScript高级程序设计','[美]Nicholas C.Zakas','中国邮电出版社','2012.03','中文','99.00',20,'一本很好的提升前端技术的书','2022-06-29','计算机类'),(4,'万历十五年','[美] 黄仁宇','生活·读书·新知三联书店','1997-5','中文','18.00',24,'万历十五年，亦即公元1587年，在西欧历史上为西班牙舰队全部出动征英的前一年；而在中国，这平平淡淡的一年中，发生了若干为历史学家所易于忽视的事件。这些事件，...','2022-06-29 17:29:73','历史类'),(5,'世界是如何思考的 : 一部哲学全球通史','[英] 朱利安·巴吉尼','民主与建设出版社','2022-5','中文','70.00',10,'一部风格全新的世界哲学通史，一幅视野宽广的人类思想地图。','2022-06-29 17:29:24','哲学类'),(6,'卓有成效的管理者','彼得·德鲁克','机械工业出版社','2005-6','中文','28.00',12,'对组织负有责任，能影响组织经营成果的人，就是管理者。','2022-06-29 17:29:94','管理类'),(7,'中国美术五千年','杨琪','中信出版社','2022-3-25','中文','168.00',24,'读懂中国美术，就是读懂中国人审美语言。24个朝代，50位名家，300幅传世画作，构筑上下5000年的风雅传承。','2022-06-29 17:29:39','艺术类'),(8,'祭牲与成神 : 初民社会的秩序',' 勒内•基拉尔','生活·读书·新知三联书店','2022-5','中文','98.00',9,'这是一部跨学科研究的典范，涉及人类学、考古学、心理学、法学等诸多领域。基于对列维-斯特劳斯，罗杰•凯卢瓦等人有关人类早期祭祀活动的调查，本书对广泛存在于初民社会中的“活人祭神”行为的逻辑和功能提出了独树一帜的见解。作者认为人类族群中普遍存在一种“替罪羊”机制，杀死“替罪羊”可以将对内的暴力隐患释放到族群之外，从而保全族群内部的和平稳定。','2022-06-29 17:29:70','宗教类');
/*!40000 ALTER TABLE `ev_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_borrow`
--

DROP TABLE IF EXISTS `ev_borrow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_borrow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(45) NOT NULL,
  `borrowTime` varchar(45) NOT NULL,
  `planReturnTime` varchar(45) NOT NULL,
  `returnTime` varchar(45) DEFAULT NULL,
  `bookName` varchar(255) NOT NULL,
  `borrowStatus` int DEFAULT '1' COMMENT '0 已还借阅  1 待还借阅  2 逾期借阅',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='所有借阅';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_borrow`
--

LOCK TABLES `ev_borrow` WRITE;
/*!40000 ALTER TABLE `ev_borrow` DISABLE KEYS */;
INSERT INTO `ev_borrow` VALUES (1,'张三','2022-04-01','2022-04-15','2022-04-15','js高级程序设计',0),(2,'李四','2022-04-01','2022-04-16','2022-04-27','三毛流浪记',0),(3,'王五','2022-04-02','2022-04-17',NULL,'唐诗三百首',2),(5,'王五','2022-4-5','2022-4-9',NULL,'三体',0),(6,'王五','2022-4-5','2022-4-9',NULL,'三体',0),(7,'赵六','2022-04-25T16:00:00.000Z','2022-05-04T16:00:00.000Z',NULL,'中华上下五千年',1),(8,'赵六','2022-04-25T16:00:00.000Z','2022-04-29T16:00:00.000Z',NULL,'我和我的祖国',1),(9,'张三','2022-04-26T16:00:00.000Z','2022-04-28T16:00:00.000Z',NULL,'道德经',1),(10,'张三','2022-04-26T16:00:00.000Z','2022-04-29T16:00:00.000Z',NULL,'三字经',1),(11,'李四','2022-04-26T16:00:00.000Z','2022-04-29T16:00:00.000Z',NULL,'红楼梦',1),(12,'王五','2022-04-26T16:00:00.000Z','2022-04-29T16:00:00.000Z',NULL,'水浒传',1),(13,'张三','2022-00-27','2022-00-30',NULL,'三国演义',1),(14,'正确测试','2022-04-27','2022-04-30','2022-06-29','elementUI',0),(15,'me','2022-10-13','2022-10-14','2022-10-13','万历十五年',0),(16,'me','2022-10-13','2022-10-14','2022-10-13','万历十五年',0),(17,'me','2022-10-13','2022-10-14','2022-10-13','万历十五年',0);
/*!40000 ALTER TABLE `ev_borrow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_classify`
--

DROP TABLE IF EXISTS `ev_classify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_classify` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '图书分类编号',
  `className` varchar(45) NOT NULL COMMENT '图书分类名称',
  `note` varchar(255) DEFAULT NULL COMMENT '备注',
  `createTime` varchar(255) NOT NULL COMMENT '创建时间',
  `updateTime` varchar(255) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`className`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='图书分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_classify`
--

LOCK TABLES `ev_classify` WRITE;
/*!40000 ALTER TABLE `ev_classify` DISABLE KEYS */;
INSERT INTO `ev_classify` VALUES (2,'计算机类','计算机类书籍','2022-06-29 11:22:30',''),(3,'心理学类','心理学书籍','2022-06-29 12:29:61','2022-06-29 12:29:61'),(5,'哲学类','','2022-06-29 17:29:74',''),(6,'宗教类','','2022-06-29 17:29:13',''),(7,'伦理类','','2022-06-29 17:29:09',''),(8,'逻辑类','','2022-06-29 17:29:17',''),(9,'美学类','','2022-06-29 17:29:61',''),(10,'语言类','','2022-06-29 17:29:69',''),(11,'艺术类','','2022-06-29 17:29:94',''),(12,'管理类','','2022-06-29 17:29:49',''),(13,'历史类','','2022-06-29 17:29:47',''),(16,'测试分类','测试11111','2022-10-13 12:13:18','2022-10-13 12:13:83');
/*!40000 ALTER TABLE `ev_classify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_users`
--

DROP TABLE IF EXISTS `ev_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `account` varchar(45) NOT NULL COMMENT '账号',
  `userName` varchar(45) NOT NULL COMMENT '用户名',
  `status` int NOT NULL DEFAULT '0' COMMENT '状态值：启用 1  禁用  0',
  `email` varchar(45) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(45) DEFAULT NULL COMMENT '手机号',
  `sex` varchar(45) DEFAULT NULL COMMENT '性别',
  `role` int NOT NULL DEFAULT '1' COMMENT '角色 超级管理员 0  普通读者 1',
  `remark` varchar(45) DEFAULT NULL COMMENT '备注',
  `password` varchar(45) NOT NULL,
  `createTime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  UNIQUE KEY `account_UNIQUE` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_users`
--

LOCK TABLES `ev_users` WRITE;
/*!40000 ALTER TABLE `ev_users` DISABLE KEYS */;
INSERT INTO `ev_users` VALUES (2,'admin','超级管理员',1,'123456789@qq.com','17128282828','男',0,'超级管理员','123456','2022-06-29'),(6,'lisi','李四',1,'23424232','1142342342','女',1,'','123456','2022-06-29 16:29:27');
/*!40000 ALTER TABLE `ev_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'library_management_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-17  9:41:14
