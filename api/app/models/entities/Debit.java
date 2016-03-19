package models.entities;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Debit extends  com.avaje.ebean.Model{

  @Id
  @GeneratedValue
  public Long id;

  @ManyToOne(fetch=FetchType.EAGER)
  @JoinColumn(name="projectid")
  public Project project;

  @Column public Date date;

  @Column public String recieptnumber;

  @Column public String price;

  @Column public String paidorg;

  @Column public String recieptstatus;

  @Column public String payee;

  @Column public String notes;


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Project getProject() {
    return project;
  }

  public void setProject(Project project) {
    this.project = project;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public String getRecieptnumber() {
    return recieptnumber;
  }

  public void setRecieptnumber(String recieptnumber) {
    this.recieptnumber = recieptnumber;
  }

  public String getPrice() {
    return price;
  }

  public void setPrice(String price) {
    this.price = price;
  }

  public String getPaidorg() {
    return paidorg;
  }

  public void setPaidorg(String paidorg) {
    this.paidorg = paidorg;
  }

  public String getRecieptstatus() {
    return recieptstatus;
  }

  public void setRecieptstatus(String recieptstatus) {
    this.recieptstatus = recieptstatus;
  }

  public String getPayee() {
    return payee;
  }

  public void setPayee(String payee) {
    this.payee = payee;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public static Finder<Long, Debit> getFind() {
    return find;
  }

  public static void setFind(Finder<Long, Debit> find) {
    Debit.find = find;
  }

  public static Finder<Long, Debit> find = new Finder<Long,Debit>(Debit.class);

}
