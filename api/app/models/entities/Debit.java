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






  public static Finder<Long, Debit> find = new Finder<Long,Debit>(Debit.class);

}
