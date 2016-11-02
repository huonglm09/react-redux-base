/*
Navicat MySQL Data Transfer

Source Server         : Localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : news

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-11-02 11:58:07
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1', '1', '1', 'category', 'Halloween t-shirts you can make at home', 'sp1', 'Throw together a frighteningly cool Halloween outfit using an old t-shirt.', '0', 'http://static.nghenhinvietnam.vn/w670/uploaded/vanphong/2016_03_04/lenovo/img_2480_odku.jpg', '0', '2016-11-01 14:17:09', null, null);
INSERT INTO `articles` VALUES ('2', '1', '1', 'category', 'Win 1 of 5 £100 Tesco vouchers', 'sp2', 'Complete our quick survey for a chance to win a £100 Tesco gift card.', '0', 'http://stcv4.hnammobile.com//fileext//dien-thoai-lenovo-a7010-su-dung-voi-kinh-thuc-te-ao%20(3).jpg', '0', '2016-11-01 14:16:56', null, null);
INSERT INTO `articles` VALUES ('3', '1', '1', 'category', 'New ways to decorate your pumpkin this Halloween', 'sp3', 'This year, there’s so many ways to make the most of your pumpkins – and there’s not a knife in sight, making it safer and more fun for kids to join in.', '0', 'https://cdn2.tgdd.vn/Files/2016/10/15/900352/header.jpg', '0', '2016-11-01 14:15:56', null, null);
INSERT INTO `articles` VALUES ('4', '1', '1', 'category', '7 easy DIY lighting ideas', 'sp4', 'Transform a cold room into a cosy haven with these simple but effective lighting hacks.', '0', 'https://cdn.tgdd.vn/Files/2016/10/09/897484/sony-xperia-m5-1.jpg', '0', '2016-11-01 14:15:54', null, null);
INSERT INTO `articles` VALUES ('5', '1', '1', 'category', 'How to make an ice dye cushion cover', 'sp5', 'Try this amazing ice-dyeing technique to create a stylish one-of-a-kind cushion cover.', '0', 'https://cdn3.tgdd.vn/Files/2015/05/17/643788/sony-xperia-z3-compact-1.jpg', '0', '2016-11-01 14:15:48', null, null);
INSERT INTO `articles` VALUES ('6', '1', '1', 'category', 'How to make a cereal box puppet theatre', 'sp6', 'Keep the kids entertained for hours with a magical DIY puppet show using a cereal box.', '0', 'https://cdn.tgdd.vn/Files/2016/10/23/903963/s.jpg', '1', '2016-11-01 14:15:37', null, null);
INSERT INTO `articles` VALUES ('7', '1', '1', 'category', 'Easy cardboard craft ideas for kids', 'sp7', 'Keep the kids entertained with these simple, fun cardboard craft ideas.', '0', 'https://cdn.tgdd.vn/Files/2016/10/15/900352/fa.jpg', '1', '2016-11-01 14:15:35', null, null);
INSERT INTO `articles` VALUES ('8', '1', '1', 'category', '8 clever ways to save money on heating bills', 'sp8', 'Blogger Miss Thrifty gives us some ideas on how to reduce those dreaded heating bills.', '0', 'https://cdn1.tgdd.vn/Files/2016/10/15/900352/951116959217fc1fbfdacd226ab7062b1.jpg', '1', '2016-11-01 14:15:25', null, null);
INSERT INTO `articles` VALUES ('9', '1', '1', 'category', 'Easy DIY desk tidy', 'sp9', 'Try this ingenious space-saving storage idea using recycled tin cans.', '0', 'https://cdn.tgdd.vn/Files/2016/10/31/907338/fa_800x451.jpg', '1', '2016-11-01 14:15:13', null, null);
INSERT INTO `articles` VALUES ('10', '1', '2', 'category', 'Halloween t-shirts you can make at home', 'sp1', 'Throw together a frighteningly cool Halloween outfit using an old t-shirt.', '0', 'https://cdn.tgdd.vn/Files/2016/02/17/788609/woman-laptop.jpg', '0', '2016-11-01 14:22:26', null, null);
INSERT INTO `articles` VALUES ('11', '1', '2', 'category', 'Win 1 of 5 £100 Tesco vouchers', 'sp2', 'Complete our quick survey for a chance to win a £100 Tesco gift card.', '0', 'http://tiki.vn/tu-van/wp-content/uploads/2016/06/3-cac-cong-nghe-man-hinh-laptop.jpg', '0', '2016-11-01 14:22:54', null, null);
INSERT INTO `articles` VALUES ('12', '1', '2', 'category', 'New ways to decorate your pumpkin this Halloween', 'sp3', 'This year, there’s so many ways to make the most of your pumpkins – and there’s not a knife in sight, making it safer and more fun for kids to join in.', '0', 'https://photo.tinhte.vn/store/2015/06/3051456_NVIDIA_G_Sync_Mobile.png', '0', '2016-11-01 14:23:05', null, null);
INSERT INTO `articles` VALUES ('13', '1', '2', 'category', '7 easy DIY lighting ideas', 'sp4', 'Transform a cold room into a cosy haven with these simple but effective lighting hacks.', '0', 'http://www.maytinhviettrung.com/1_html/img/product_img/thum/1292406449_skin%20laptop,%20%C4%91%E1%BB%93%20ch%C6%A1i%20%C4%91%E1%BA%BF%20t%E1%BA%A3n%20nhi%E1%BB%87t%20cho%20laptop.jpg', '0', '2016-11-01 14:23:21', null, null);
INSERT INTO `articles` VALUES ('14', '1', '2', 'category', 'How to make an ice dye cushion cover', 'sp5', 'Try this amazing ice-dyeing technique to create a stylish one-of-a-kind cushion cover.', '0', 'https://static.nguyenkimmall.com/images/companies/1/ASUS%20ROG%20GX700/1.jpg', '0', '2016-11-01 14:23:45', null, null);
INSERT INTO `articles` VALUES ('15', '1', '2', 'category', 'How to make a cereal box puppet theatre', 'sp6', 'Keep the kids entertained for hours with a magical DIY puppet show using a cereal box.', '0', 'https://phucanh.vn/media/news/2855_xiaomi_mi_book_04.jpg', '1', '2016-11-01 14:21:57', null, null);
INSERT INTO `articles` VALUES ('16', '1', '2', 'category', 'Easy cardboard craft ideas for kids', 'sp7', 'Keep the kids entertained with these simple, fun cardboard craft ideas.', '0', 'https://cdn.tgdd.vn/Files/2016/05/02/823709/apple-laptop.jpg', '1', '2016-11-01 14:21:55', null, null);
INSERT INTO `articles` VALUES ('17', '1', '2', 'category', '8 clever ways to save money on heating bills', 'sp8', 'Blogger Miss Thrifty gives us some ideas on how to reduce those dreaded heating bills.', '0', 'https://cdn.tgdd.vn/Files/2016/09/04/883424/samsung-galaxy-tabpro-s.jpg', '1', '2016-11-01 14:21:51', null, null);
INSERT INTO `articles` VALUES ('18', '1', '2', 'category', 'Easy DIY desk tidy', 'sp9', 'Try this ingenious space-saving storage idea using recycled tin cans.', '0', 'http://www.hdvietnam.com/diendan/attachment.php?attachmentid=190190&d=1429258659', '1', '2016-11-01 14:21:46', null, null);
INSERT INTO `articles` VALUES ('19', '1', '3', 'category', 'Halloween t-shirts you can make at home', 'sp1', 'Throw together a frighteningly cool Halloween outfit using an old t-shirt.', '0', 'http://tintuc.vatgia.com/pictures/vnmedia/111001154731-138-396.jpg', '0', '2016-11-01 14:28:25', null, null);
INSERT INTO `articles` VALUES ('20', '1', '3', 'category', 'Win 1 of 5 £100 Tesco vouchers', 'sp2', 'Complete our quick survey for a chance to win a £100 Tesco gift card.', '0', 'https://cdn1.tgdd.vn/Files/2014/03/05/536466/ImageAttach/hotgirl-camera4-201435223948.jpg', '0', '2016-11-01 14:28:12', null, null);
INSERT INTO `articles` VALUES ('21', '1', '3', 'category', 'New ways to decorate your pumpkin this Halloween', 'sp3', 'This year, there’s so many ways to make the most of your pumpkins – and there’s not a knife in sight, making it safer and more fun for kids to join in.', '0', 'http://library.chimkudopro.com/wp-content/uploads/basic-series-bai-33-702x315.jpg', '0', '2016-11-01 14:28:11', null, null);
INSERT INTO `articles` VALUES ('22', '1', '3', 'category', '7 easy DIY lighting ideas', 'sp4', 'Transform a cold room into a cosy haven with these simple but effective lighting hacks.', '0', 'https://cdn.tgdd.vn/Files/2014/03/05/536466/ImageAttach/hotgirl-camera3-201435223936.jpg', '0', '2016-11-01 14:28:03', null, null);
INSERT INTO `articles` VALUES ('23', '1', '3', 'category', 'How to make an ice dye cushion cover', 'sp5', 'Try this amazing ice-dyeing technique to create a stylish one-of-a-kind cushion cover.', '0', 'http://giupban.com.vn/lib/tinymce/plugins/imagemanager/files/giupban/9-bi-quyet-chup-anh-dang-tien-cho-nguoi-moi-12014-02-27-14-58-24.jpg', '0', '2016-11-01 14:27:56', null, null);
INSERT INTO `articles` VALUES ('24', '1', '3', 'category', 'How to make a cereal box puppet theatre', 'sp6', 'Keep the kids entertained for hours with a magical DIY puppet show using a cereal box.', '0', 'https://zshop.vn/blogs/wp-content/uploads/2016/06/may-anh-nikon-d5200-gia-re-zshop.jpg', '1', '2016-11-01 14:26:53', null, null);
INSERT INTO `articles` VALUES ('25', '1', '3', 'category', 'Easy cardboard craft ideas for kids', 'sp7', 'Keep the kids entertained with these simple, fun cardboard craft ideas.', '0', 'https://cdn2.tgdd.vn/Files/2016/05/23/832282/photo2.jpg', '1', '2016-11-01 14:26:52', null, null);
INSERT INTO `articles` VALUES ('26', '1', '3', 'category', '8 clever ways to save money on heating bills', 'sp8', 'Blogger Miss Thrifty gives us some ideas on how to reduce those dreaded heating bills.', '0', 'http://topgia.vn/nch/images/2016/5/top-may-anh-chup-dep-anh-chat-luong-1.jpg', '1', '2016-11-01 14:26:47', null, null);
INSERT INTO `articles` VALUES ('27', '1', '3', 'category', 'Easy DIY desk tidy', 'sp9', 'Try this ingenious space-saving storage idea using recycled tin cans.', '0', 'https://cdn.tgdd.vn/Files/2016/05/28/834362/dsc-qx100.jpg', '1', '2016-11-01 14:26:43', null, null);
INSERT INTO `articles` VALUES ('28', '1', '4', 'category', 'Halloween t-shirts you can make at home', 'sp1', 'Throw together a frighteningly cool Halloween outfit using an old t-shirt.', '0', 'http://review.websosanh.net/Images/Uploaded/Share/2015/11/23/kinh%20nghi%E1%BB%87m%20b%E1%BB%8F%20t%C3%BAi%20khi%20mua%20%C4%91%E1%BB%93ng%20h%E1%BB%93%20%C4%91eo%20tay%201.jpg', '0', '2016-11-01 14:33:14', null, null);
INSERT INTO `articles` VALUES ('29', '1', '4', 'category', 'Win 1 of 5 £100 Tesco vouchers', 'sp2', 'Complete our quick survey for a chance to win a £100 Tesco gift card.', '0', 'http://dantri4.vcmedia.vn/hBru1dLDczzwdZ6qEvP0/Image/2012/04/2/moto2041210_a4bcd.jpg', '0', '2016-11-01 14:33:12', null, null);
INSERT INTO `articles` VALUES ('30', '1', '4', 'category', 'New ways to decorate your pumpkin this Halloween', 'sp3', 'This year, there’s so many ways to make the most of your pumpkins – and there’s not a knife in sight, making it safer and more fun for kids to join in.', '0', 'http://cdn-img-v1.webbnc.net/upload/web/51/511153/product/2016/02/27/02/48/145654132118.jpg', '0', '2016-11-01 14:33:08', null, null);
INSERT INTO `articles` VALUES ('31', '1', '4', 'category', '7 easy DIY lighting ideas', 'sp4', 'Transform a cold room into a cosy haven with these simple but effective lighting hacks.', '0', 'http://trevang.vn/wp-content/uploads/2015/06/bao-quan-dong-ho-deo-tay.jpg', '0', '2016-11-01 14:33:02', null, null);
INSERT INTO `articles` VALUES ('32', '1', '4', 'category', 'How to make an ice dye cushion cover', 'sp5', 'Try this amazing ice-dyeing technique to create a stylish one-of-a-kind cushion cover.', '0', 'http://dantri4.vcmedia.vn/hBru1dLDczzwdZ6qEvP0/Image/2012/04/2/moto2041211_0dae6.jpg', '0', '2016-11-01 14:32:57', null, null);
INSERT INTO `articles` VALUES ('33', '1', '4', 'category', 'How to make a cereal box puppet theatre', 'sp6', 'Keep the kids entertained for hours with a magical DIY puppet show using a cereal box.', '0', 'https://s-media-cache-ak0.pinimg.com/originals/d6/e1/7c/d6e17c7453e10433b5242d1918a70921.jpg', '1', '2016-11-01 14:31:36', null, null);
INSERT INTO `articles` VALUES ('34', '1', '4', 'category', 'Easy cardboard craft ideas for kids', 'sp7', 'Keep the kids entertained with these simple, fun cardboard craft ideas.', '0', 'http://www.xomco.vn/sites/default/files/styles/one-click-upload/public/images/2382/2012/12/03/20120312151707.jpg', '1', '2016-11-01 14:31:32', null, null);
INSERT INTO `articles` VALUES ('35', '1', '4', 'category', '8 clever ways to save money on heating bills', 'sp8', 'Blogger Miss Thrifty gives us some ideas on how to reduce those dreaded heating bills.', '0', 'http://i01.i.aliimg.com/wsphoto/v0/32313140023_1/2015-font-b-Top-b-font-font-b-Rated-b-font--Fashion-Colorful-Bracelet-Watch.jpg', '1', '2016-11-01 14:31:26', null, null);
INSERT INTO `articles` VALUES ('36', '1', '4', 'category', 'Easy DIY desk tidy', 'sp9', 'Try this ingenious space-saving storage idea using recycled tin cans.', '0', 'http://donghohieu.org/wp-content/uploads/mua-dong-ho-nhat-06-800x450.jpg', '1', '2016-11-01 14:31:21', null, null);
INSERT INTO `articles` VALUES ('37', '1', '5', 'category', 'Halloween t-shirts you can make at home', 'sp1', 'Throw together a frighteningly cool Halloween outfit using an old t-shirt.', '0', 'https://cdn.tgdd.vn/Files/2013/12/29/524489/ImageAttach/Hotgirl-Logitech-PowerShell-iPhone1-20131229201815.jpg', '0', '2016-11-01 14:01:06', null, null);
INSERT INTO `articles` VALUES ('38', '1', '5', 'category', 'Win 1 of 5 £100 Tesco vouchers', 'sp2', 'Complete our quick survey for a chance to win a £100 Tesco gift card.', '0', 'http://oec.com.vn/wp-content/uploads/2016/04/phu-kien-cong-nghe-850x500.jpg', '0', '2016-11-01 14:01:22', null, null);
INSERT INTO `articles` VALUES ('39', '1', '5', 'category', 'New ways to decorate your pumpkin this Halloween', 'sp3', 'This year, there’s so many ways to make the most of your pumpkins – and there’s not a knife in sight, making it safer and more fun for kids to join in.', '0', 'https://lh5.googleusercontent.com/LjJk0OIFiZbnIki3HiqE-P2RvicLBV-7EuHA6bpuHKR8rDT4lMv8gGxrd6iEX3wm3pyRo2MuJdGNzz638Zm3fQHpDS8jaLM5_rBfKu0j-LkkKZOE6zThcITJMhu-5VNAyDpCXCfmBCseRzgDtA', '0', '2016-11-01 14:09:29', null, null);
INSERT INTO `articles` VALUES ('40', '1', '5', 'category', '7 easy DIY lighting ideas', 'sp4', 'Transform a cold room into a cosy haven with these simple but effective lighting hacks.', '0', 'https://cdn.tgdd.vn/Files/2013/11/05/522960/ImageAttach/phu-kien-joy-iphone51-2013115211456.jpg', '0', '2016-11-01 14:02:51', null, null);
INSERT INTO `articles` VALUES ('41', '1', '5', 'category', 'How to make an ice dye cushion cover', 'sp5', 'Try this amazing ice-dyeing technique to create a stylish one-of-a-kind cushion cover.', '0', 'http://ttvnol.vcmedia.vn/images/2015/12/12/220337_bb18b895e6c0ab884bd08a7fd307a72f.jpg', '0', '2016-11-01 14:01:45', null, null);
INSERT INTO `articles` VALUES ('42', '1', '5', 'category', 'How to make a cereal box puppet theatre', 'sp6', 'Keep the kids entertained for hours with a magical DIY puppet show using a cereal box.', '0', 'http://www.techrum.vn/chevereto/images/2016/05/25/Mkvkq.jpg', '1', '2016-11-01 14:07:49', null, null);
INSERT INTO `articles` VALUES ('43', '1', '5', 'category', 'Easy cardboard craft ideas for kids', 'sp7', 'Keep the kids entertained with these simple, fun cardboard craft ideas.', '0', 'https://lh6.googleusercontent.com/J9W0zENmU4ToBGqCm65TmePkS0T4c8-vwVMNDkkkWh10Uk8l1v1nlZPU4CjrChMCffTtODSGs7zYG0Q6b9c4vL75mmyvUEDAbol1LRdoFBmJjhn1RdeCl6oSLyThstcb-C7fhyZLZGqKZ0kUog', '1', '2016-11-01 14:08:47', null, null);
INSERT INTO `articles` VALUES ('44', '1', '5', 'category', '8 clever ways to save money on heating bills', 'sp8', 'Blogger Miss Thrifty gives us some ideas on how to reduce those dreaded heating bills.', '0', 'https://lh5.googleusercontent.com/7tbTm_OvgAHiugpldJi0KM8ceqkL2ddT35CtKD6_urCvisNDPXrwXZDlRK8oZF3cuyACh7BRCDHFR8rwyN-nh4U7_fK_ourrJfLFUv9BCyunCyN7Bqzj1gGCeEXczVHFPCM809TjBDSN9kE0vw', '1', '2016-11-01 14:08:01', null, null);
INSERT INTO `articles` VALUES ('45', '1', '5', 'category', 'Easy DIY desk tidy', 'sp9', 'Try this ingenious space-saving storage idea using recycled tin cans.', '0', 'https://lh5.googleusercontent.com/CgPq7WPGEB4Tj_zuM4zhodepySNZ-9VTJtwmiJx0LMZLUYshxF7_AHMy2kq74R0UI-89v4mDomgXG8TyoparjFeL2HE1mFd5_cZ2BzYtA6EZP6aBh-6PlRGgnARQ6L-r5vclyDGafMS1AmFDmQ', '1', '2016-11-01 14:08:04', null, null);

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
