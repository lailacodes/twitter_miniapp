CREATE USER 'twitter_admin'@'localhost' IDENTIFIED BY 'comp621_423';
GRANT ALL PRIVILEGES ON twitter_miniapp.* TO 'twitter_admin'@'localhost' WITH GRANT OPTION;
