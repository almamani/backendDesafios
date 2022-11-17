import { Router } from "express";
const homeRouter = new Router();
import path from "path";

homeRouter.get("/", (req, res) => {
  const name = req.session?.name;
  if (name) {
    res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
      name: req.session.name,
    });
  } else {
    res.redirect("/login");
  }
});

homeRouter.get("/login", (req, res) => {
  const name = req.session?.name;
  if (name) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "/views/pages/login.ejs"));
  }
});

homeRouter.get("/logout", (req, res) => {
  const name = req.session?.name;
  if (name) {
    req.session.destroy((err) => {
      if (!err) {
        res.render("pages/logout.ejs", { name });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

homeRouter.post("/login", (req, res) => {
  req.session.name = req.body.name;
  res.redirect("/");
});

export default homeRouter;
