#Mysql not doing UTF-8 good?
http://outofcontrol.ca/blog/comments/change-mysql-5.5-default-character-set-to-utf8

under /etc/mysql/my.cnf,
[mysqld]
init_connect='SET collation_connection = utf8_unicode_ci'
init_connect='SET NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake




#docker meteor
http://krishamoud.me/deploying-meteor-to-aws-ecs/