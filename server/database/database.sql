/*
Navicat MySQL Data Transfer

Source Server         : Localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : news

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-11-01 00:45:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `category_id` int(11) DEFAULT NULL,
  `type` enum('category','static') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'category',
  `title` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `order` int(11) DEFAULT '0',
  `image` text COLLATE utf8_unicode_ci,
  `feature` tinyint(4) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1', '1', '1', 'category', 'Halloween t-shirts you can make at home', 'sp1', 'Throw together a frighteningly cool Halloween outfit using an old t-shirt.', '0', 'http://www.menucool.com/slider/jsImgSlider/images/image-slider-2.jpg', '0', '2016-10-31 23:42:45', null, null);
INSERT INTO `articles` VALUES ('2', '1', '1', 'category', 'Win 1 of 5 £100 Tesco vouchers', 'sp2', 'Complete our quick survey for a chance to win a £100 Tesco gift card.', '0', 'http://www.menucool.com/slider/jsImgSlider/images/image-slider-2.jpg', '0', '2016-10-31 23:42:43', null, null);
INSERT INTO `articles` VALUES ('3', '1', '1', 'category', 'New ways to decorate your pumpkin this Halloween', 'sp3', 'This year, there’s so many ways to make the most of your pumpkins – and there’s not a knife in sight, making it safer and more fun for kids to join in.', '0', 'http://www.menucool.com/slider/jsImgSlider/images/image-slider-2.jpg', '0', '2016-10-31 23:42:39', null, null);
INSERT INTO `articles` VALUES ('4', '1', '1', 'category', '7 easy DIY lighting ideas', 'sp4', 'Transform a cold room into a cosy haven with these simple but effective lighting hacks.', '0', 'http://www.menucool.com/slider/jsImgSlider/images/image-slider-2.jpg', '0', '2016-10-31 23:42:34', null, null);
INSERT INTO `articles` VALUES ('5', '1', '1', 'category', 'How to make an ice dye cushion cover', 'sp5', 'Try this amazing ice-dyeing technique to create a stylish one-of-a-kind cushion cover.', '0', 'http://www.menucool.com/slider/jsImgSlider/images/image-slider-2.jpg', '0', '2016-10-31 23:42:28', null, null);
INSERT INTO `articles` VALUES ('6', '1', '1', 'category', 'How to make a cereal box puppet theatre', 'sp6', 'Keep the kids entertained for hours with a magical DIY puppet show using a cereal box.', '0', 'http://www.menucool.com/slider/jsImgSlider/images/image-slider-2.jpg', '1', '2016-10-31 23:42:23', null, null);
INSERT INTO `articles` VALUES ('7', '1', '1', 'category', 'Easy cardboard craft ideas for kids', 'sp7', 'Keep the kids entertained with these simple, fun cardboard craft ideas.', '0', 'http://www.menucool.com/slider/jsImgSlider/images/image-slider-2.jpg', '1', '2016-10-31 23:42:19', null, null);
INSERT INTO `articles` VALUES ('8', '1', '1', 'category', '8 clever ways to save money on heating bills', 'sp8', 'Blogger Miss Thrifty gives us some ideas on how to reduce those dreaded heating bills.', '0', 'http://www.menucool.com/slider/jsImgSlider/images/image-slider-2.jpg', '1', '2016-10-31 23:42:14', null, null);
INSERT INTO `articles` VALUES ('9', '1', '1', 'category', 'Easy DIY desk tidy', 'sp9', 'Try this ingenious space-saving storage idea using recycled tin cans.', '0', 'http://www.menucool.com/slider/jsImgSlider/images/image-slider-2.jpg', '1', '2016-10-31 23:42:09', null, null);

-- ----------------------------
-- Table structure for `categories`
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `title` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `order` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', '1', 'Điện thoại', 'dien-thoai', 'Điện thoại', '1', '2016-10-31 11:58:42', null, null);
INSERT INTO `categories` VALUES ('2', '1', 'Máy tính', 'may-tinh', 'Máy tính', '2', '2016-10-31 11:59:25', null, null);
INSERT INTO `categories` VALUES ('3', '1', 'Máy ảnh', 'may-anh', 'Máy ảnh', '3', '2016-10-31 11:59:52', null, null);
INSERT INTO `categories` VALUES ('4', '1', 'Đồng hồ', 'dong-ho', 'Đồng hồ', '4', '2016-10-31 12:01:26', null, null);
INSERT INTO `categories` VALUES ('5', '1', 'Phụ kiện', 'phu-kien', 'Phụ kiện', '5', '2016-10-31 12:02:31', null, null);

-- ----------------------------
-- Table structure for `roles`
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', 'admin', 'Quản trị viên', '2016-06-24 19:34:54', '2016-06-24 19:34:54', null);
INSERT INTO `roles` VALUES ('2', 'user', 'Người dùng', '2016-10-28 11:05:29', '2016-06-24 19:34:58', null);

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `card` varchar(32) DEFAULT NULL,
  `telephone` varchar(32) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `name` varchar(512) DEFAULT NULL,
  `address` text,
  `birthday` timestamp NULL DEFAULT NULL,
  `gender` enum('other','female','male') DEFAULT 'other',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `lat_long` text,
  `remember_token` text,
  `provider` enum('google','facebook','web') NOT NULL DEFAULT 'web',
  `confirmed` tinyint(4) NOT NULL DEFAULT '0',
  `confirmation_code` varchar(255) NOT NULL,
  `bank_name` varchar(512) DEFAULT NULL,
  `bank_account_name` varchar(512) DEFAULT NULL,
  `bank_branch` varchar(512) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '1', 'admin', '$2y$10$WbxWsMFrakBhLXa4u3YKSOJWp9EIywDWB5w7AZ7sZjj7vbdY2fe2G', 'huonglm@qsoftvietnam.com', '123456789', '0979650659', null, null, 'Lê Minh Hưởng', 'HN', '2016-06-28 12:11:17', 'male', '1', null, 'FtCIs45sv7WCxu0U6dcUtGCBEnPHHKamS8njrSqCDiDxFnY6r9bHAfCts5xP', 'web', '1', 'VdYbuA', null, null, null, '2016-10-28 11:05:51', '2016-07-06 04:32:45', null);
