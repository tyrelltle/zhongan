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
        String id=json.findPath("id").textValue();
        String name = json.findPath("name").textValue();
        String contract=json.findPath("contract").textValue();
        String price=json.findPath("price").textValue();
        Credit p=Credit.find.byId(Long.valueOf(id));
        if(p==null)
            throw new Exception("credit not found");

        p.notes=json.findPath("notes").textValue();
        p.paydate=Date.valueOf(json.findPath("paydate").textValue());
        p.recieptdate =Date.valueOf(json.findPath("recieptdate").textValue());
        p.notes=json.findPath("notes").textValue();
        p.payprice=json.findPath("payprice").textValue();
        p.recieptprice=json.findPath("recieptprice").textValue();
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

    @Transactional
    @BodyParser.Of(BodyParser.Json.class)
    public Result add() throws Exception {
        JsonNode json = request().body().asJson();

        Credit credit=new Credit();
        Project p=Project.find.byId(json.findPath("project_id").asLong());
        if(p==null)
            throw new Exception("no project found with id "+json.findPath("project_id").longValue());
        credit.project=p;
        credit.notes=json.findPath("notes").textValue();
        credit.paydate=Date.valueOf(json.findPath("paydate").textValue());
        credit.recieptdate =Date.valueOf(json.findPath("recieptdate").textValue());
        credit.notes=json.findPath("notes").textValue();
        credit.payprice=json.findPath("payprice").textValue();
        credit.recieptprice=json.findPath("recieptprice").textValue();
        credit.save();
        return ok(Json.toJson(credit));

    }

}
