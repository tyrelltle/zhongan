package controllers;

import com.avaje.ebean.annotation.Transactional;
import com.fasterxml.jackson.databind.JsonNode;
import models.entities.Debit;
import models.entities.Project;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;

import java.sql.Date;

public class DebitController extends Controller {



    @Transactional
    @BodyParser.Of(BodyParser.Json.class)
    public  Result update() throws Exception {
        JsonNode json = request().body().asJson();
        Long id=json.findPath("id").asLong();
        Debit d=Debit.find.byId(id);
        if(d==null)
            throw new Exception("debit not found");

        Project p=Project.find.byId(json.findPath("project_id").asLong());
        if(p!=null)
            d.setProject(p);
        d.setDate(Date.valueOf(json.findPath("date").textValue()));
        d.setRecieptnumber(json.findPath("recieptnumber").textValue());
        d.setPrice(json.findPath("price").textValue());
        d.setPaidorg(json.findPath("paidorg").textValue());
        d.setRecieptstatus(json.findPath("recieptstatus").textValue());
        d.setPayee(json.findPath("payee").textValue());
        d.setNotes(json.findPath("notes").textValue());

        d.update();
        return ok();
    }

    @Transactional
    public Result remove(long id) throws Exception {
        Debit p=Debit.find.byId(id);
        if(p==null)
            throw new Exception("Credit not found");
        p.delete();
        return ok("succ");
    }

    @Transactional
    public Result list() {
        return ok(Json.toJson(Debit.find.all()));
    }

    public Result listForProject(long projectid) {
        return ok(Json.toJson(Debit.find.where().like("project.id",String.valueOf(projectid)).findList()));
    }

    @Transactional
    @BodyParser.Of(BodyParser.Json.class)
    public Result add() throws Exception {
        JsonNode json = request().body().asJson();

        Debit d=new Debit();
        Project p=Project.find.byId(json.findPath("project_id").asLong());
        if(p==null)
            throw new Exception("no project found with id "+json.findPath("project_id").longValue());
        d.project=p;
        d.setDate(Date.valueOf(json.findPath("date").textValue()));
        d.setRecieptnumber(json.findPath("recieptnumber").textValue());
        d.setPrice(json.findPath("price").textValue());
        d.setPaidorg(json.findPath("paidorg").textValue());
        d.setRecieptstatus(json.findPath("recieptstatus").textValue());
        d.setPayee(json.findPath("payee").textValue());
        d.setNotes(json.findPath("notes").textValue());
        d.save();
        return ok(Json.toJson(d));

    }

}
