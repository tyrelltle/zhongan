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

  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getContract() {
    return contract;
  }

  public void setContract(String contract) {
    this.contract = contract;
  }

  public String getPrice() {
    return price;
  }

  public void setPrice(String price) {
    this.price = price;
  }

  public static Finder<Long, Project> getFind() {
    return find;
  }

  public static void setFind(Finder<Long, Project> find) {
    Project.find = find;
  }

  public static Finder<Long, Project> find = new Finder<Long,Project>(Project.class);

}
