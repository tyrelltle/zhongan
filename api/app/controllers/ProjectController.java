package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.entities.Project;
import com.avaje.ebean.annotation.Transactional;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;

public class ProjectController extends Controller {

    @Transactional
    @BodyParser.Of(BodyParser.Json.class)
    public  Result update() throws Exception {
        JsonNode json = request().body().asJson();
        String id=json.findPath("id").textValue();
        String name = json.findPath("name").textValue();
        String contract=json.findPath("contract").textValue();
        String price=json.findPath("price").textValue();
        Project p=Project.find.byId(Long.valueOf(id));
        if(p==null)
            throw new Exception("project not found");

        p.name=name;
        p.contract=contract;
        p.price=price;
        p.update();
        return ok();
    }

    @Transactional
    public Result remove(long id) throws Exception {
        Project p=Project.find.byId(id);
        if(p==null)
            throw new Exception("project not found");
        p.delete();
        return ok("succ");
    }

    @Transactional
    public Result list() {
        return ok(Json.toJson(models.entities.Project.find.all()));
    }

    @Transactional
    @BodyParser.Of(BodyParser.Json.class)
    public Result add(){
        //JPA.em().createQuery("SET NAMES utf8");

        JsonNode json = request().body().asJson();
        String name = json.findPath("name").textValue();
        String contract=json.findPath("contract").textValue();
        String price=json.findPath("price").textValue();
        if(name == null) {
            return badRequest("Missing parameter [name]");
        }

        if(contract == null) {
            return badRequest("Missing parameter [contract]");
        }

        if(price == null) {
            return badRequest("Missing parameter [price]");
        }

        Project project=new Project(name,contract,price);
        project.save();
        return ok(Json.toJson(project));

    }

}
