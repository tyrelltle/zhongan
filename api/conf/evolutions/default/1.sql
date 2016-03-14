# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table credit (
  id                        bigint auto_increment not null,
  projectid                 bigint,
  recieptdate               date,
  recieptprice              varchar(255),
  paydate                   date,
  payprice                  varchar(255),
  notes                     varchar(255),
  constraint pk_credit primary key (id))
;

create table project (
  id                        bigint auto_increment not null,
  name                      varchar(255),
  contract                  varchar(255),
  price                     varchar(255),
  constraint uq_project_name unique (name),
  constraint pk_project primary key (id))
;

alter table credit add constraint fk_credit_project_1 foreign key (projectid) references project (id) on delete restrict on update restrict;
create index ix_credit_project_1 on credit (projectid);



# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table credit;

drop table project;

SET FOREIGN_KEY_CHECKS=1;

