CREATE TABLE users (
       `id` int(11) NOT NULL AUTO_INCREMENT,
       `fullname` varchar(50) NOT NULL,
       `password` varchar(255) NOT NULL,
       `email` varchar(100) NOT NULL,
       PRIMARY KEY (`id`)
);
