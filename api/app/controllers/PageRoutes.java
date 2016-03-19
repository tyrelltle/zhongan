package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.dashboard;
import views.html.index;

public class PageRoutes extends Controller {

    public Result index() {
        return ok(index.render());
    }

    public Result dashboard(){
        return ok(dashboard.render());
    }

}
