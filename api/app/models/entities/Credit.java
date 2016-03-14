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



  public static Finder<Long, Credit> find = new Finder<Long,Credit>(Credit.class);

}
