package models.entities;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Credit extends  com.avaje.ebean.Model{

  @Id
  @GeneratedValue
  public Long id;

  @ManyToOne(fetch=FetchType.EAGER)
  @JoinColumn(name="projectid")
  public Project project;

  @Column public Date recieptdate;

  @Column public String recieptprice;

  @Column public Date paydate;

  @Column public String payprice;

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

  public Date getRecieptdate() {
    return recieptdate;
  }

  public void setRecieptdate(Date recieptdate) {
    this.recieptdate = recieptdate;
  }

  public String getRecieptprice() {
    return recieptprice;
  }

  public void setRecieptprice(String recieptprice) {
    this.recieptprice = recieptprice;
  }

  public Date getPaydate() {
    return paydate;
  }

  public void setPaydate(Date paydate) {
    this.paydate = paydate;
  }

  public String getPayprice() {
    return payprice;
  }

  public void setPayprice(String payprice) {
    this.payprice = payprice;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public static Finder<Long, Credit> getFind() {
    return find;
  }

  public static void setFind(Finder<Long, Credit> find) {
    Credit.find = find;
  }

  public static Finder<Long, Credit> find = new Finder<Long,Credit>(Credit.class);

}
