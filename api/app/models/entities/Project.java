package models.entities;

import javax.persistence.*;

@Entity
public class Project extends  com.avaje.ebean.Model{

  @Id
  @GeneratedValue
  public Long id;

  @Column(unique=true) public String name;

  @Column public String contract;

  @Column public String price;

  public Project(String name, String contract, String price) {
    this.name = name;
    this.contract = contract;
    this.price = price;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }


  public static Finder<Long, Project> find = new Finder<Long,Project>(Project.class);

}
