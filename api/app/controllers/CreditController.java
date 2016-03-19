package controllers;

import com.avaje.ebean.annotation.Transactional;
import com.fasterxml.jackson.databind.JsonNode;
import models.entities.Credit;
import models.entities.Project;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;

import java.sql.Date;

public class CreditController extends Controller {



    @Transactional
    @BodyParser.Of(BodyParser.Json.class)
    public  Result update() throws Exception {
        JsonNode json = request().body().asJson();
        Long id=json.findPath("id").asLong();
        Credit p=Credit.find.byId(id);
        if(p==null)
            throw new Exception("credit not found");
        Project proj=Project.find.byId(json.findPath("project_id").asLong());
        if(proj!=null)
            p.setProject(proj);
        p.setNotes(json.findPath("notes").textValue());
        p.setPaydate(Date.valueOf(json.findPath("paydate").textValue()));
        p.setRecieptdate(Date.valueOf(json.findPath("recieptdate").textValue()));
        p.setPayprice(json.findPath("payprice").textValue());
        p.setRecieptprice(json.findPath("recieptprice").textValue());
        p.update();
        return ok();
    }

    @Transactional
    public Result remove(long id) throws Exception {
        Credit p=Credit.find.byId(id);
        if(p==null)
            throw new Exception("Credit not found");
        p.delete();
        return ok("succ");
    }

    @Transactional
    public Result list() {
        return ok(Json.toJson(Credit.find.all()));
    }

    public Result listForProject(long projectid) {
        return ok(Json.toJson(Credit.find.where().like("project.id",String.valueOf(projectid)).findList()));
    }

    @Transactional
    @BodyParser.Of(BodyParser.Json.class)
    public Result add() throws Exception {
        JsonNode json = request().body().asJson();

        Credit credit=new Credit();
        Project p=Project.find.byId(json.findPath("project_id").asLong());
        if(p==null)
            throw new Exception("no project found with id "+json.findPath("project_id").longValue());
        credit.project=p;
        credit.setNotes(json.findPath("notes").textValue());
        credit.setPaydate(Date.valueOf(json.findPath("paydate").textValue()));
        credit.setRecieptdate(Date.valueOf(json.findPath("recieptdate").textValue()));
        credit.setPayprice(json.findPath("payprice").textValue());
        credit.setRecieptprice(json.findPath("recieptprice").textValue());
        credit.save();
        return ok(Json.toJson(credit));

    }

}
