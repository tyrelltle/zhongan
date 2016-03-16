package models.dtos;

/**
 * Created by root on 3/15/16.
 */
public class Summary {
    public String projectname;
    public String contractname;
    public String debit;
    public String credit;


    public Summary(String projectname, String contractname, String debt, String credit) {
        this.projectname = projectname;
        this.contractname = contractname;
        this.debit = debt;
        this.credit = credit;
    }
}


