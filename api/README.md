#Mysql not doing UTF-8 good?
http://outofcontrol.ca/blog/comments/change-mysql-5.5-default-character-set-to-utf8

under /etc/mysql/my.cnf,
[mysqld]
init_connect='SET collation_connection = utf8_unicode_ci'
init_connect='SET NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake

then  service mysql restart


#meteor
-----dockerize, within intellij cmd
sbt docker:publishLocal
docker rmi tyrelltle/zhongan
docker tag 209ee083f343 tyrelltle/zhongan
docker push tyrelltle/zhongan


-----pull and run
docker pull tyrelltle/zhongan
docker run --name play -p 80:9000 -e "JDBC_URL=jdbc:mysql://172.17.0.2/test?useUnicode=true&characterEncoding=utf8" tyrelltle/zhongan


--proper authentication: https://github.com/yesnault/PlayStartApp/blob/master/app/controllers/Application.java