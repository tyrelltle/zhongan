package controllers;

import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.dashboard;
import views.html.index;

import static play.data.Form.form;


public class PageRoutes extends Controller {

    public static class Login {

        public String email;
        public String password;
        public String validate() throws Exception {
            /**if (User.authenticate(email, password) == null) {
                return "Invalid user or password";
            }
            return null;**/
            if(!email.equals("za-3@163.com")||!password.equals("139010"))
                return "Invalid user or password";
            return null;
        }
    }
    public Result index() {
        return ok(index.render( form(Login.class)));
    }

    public Result authenticate() {
        Form<Login> loginForm = form(Login.class).bindFromRequest();

        if (loginForm.hasErrors()) {
            return badRequest(index.render(form(Login.class)));
        } else {
            session("email", loginForm.get().email);
            return redirect(
                    routes.PageRoutes.dashboard()
            );
        }
    }

    @Security.Authenticated(Secured.class)
    public Result dashboard(){
        return ok(dashboard.render());
    }

    public Result logout() {
        session().clear();
        return redirect(
                routes.PageRoutes.index()
        );
    }



}
