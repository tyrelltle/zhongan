package controllers;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.SqlRow;
import com.avaje.ebean.annotation.Transactional;
import models.dtos.Summary;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;
import java.util.stream.Collectors;

public class AnalyticsController extends Controller {



    @Transactional
    public  Result summary() throws Exception {
        String query="select * from analytics_summary";
        List<SqlRow> rows=Ebean.createSqlQuery(query).findList();
        rows.stream().map(row->new Summary(row.getString("projectname"),
                                           row.getString("contractname"),
                                           row.getString("debit"),
                                           row.getString("credit")))
                     .collect(Collectors.toList());
        return ok(Json.toJson(rows));
    }



}
