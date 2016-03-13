# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table project (
  id                        bigint auto_increment not null,
  name                      varchar(255),
  contract                  varchar(255),
  price                     varchar(255),
  constraint uq_project_name unique (name),
  constraint pk_project primary key (id))
;




# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table project;

SET FOREIGN_KEY_CHECKS=1;

