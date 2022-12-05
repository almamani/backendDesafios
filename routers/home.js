import { Router } from "express";
import path from "path";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import { Users } from "../config/configMongoDb.js";

const homeRouter = new Router();

// ESTRATEGIAS -------------
passport.use(
  "signup",
  new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
    const { email } = req.body;
    Users.findOne({ username }, (err, user) => {
      if (user) return done(null, false);
      Users.create(
        { username, password: hasPassword(password), email },
        (err, user) => {
          if (err) return done(err);
          return done(null, user);
        }
      );
    });
  })
);

passport.use(
  "login",
  new Strategy({}, (username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!validatePass(password, user.password)) return done(null, false);
      return done(null, user);
    });
  })
);

passport.serializeUser((userObj, done) => {
  done(null, userObj._id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, done);
});

// ENCRIPTACIÓN ----------------
const hasPassword = (pass) => {
  // ocultar
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
};

const validatePass = (pass, hashedPass) => {
  // validar
  return bcrypt.compareSync(pass, hashedPass);
};

//AUTENTICACIÓN ------------------
const authMw = (req, res, next) => {
  req.isAuthenticated() ? next() : res.send({ error: "sin session" });
};

//RUTAS ------------------------

homeRouter.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.username;
    const email = req.user.email;
    res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
      username: username,
      email: email,
    });
  } else {
    res.redirect("/login");
  }
});

homeRouter.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "/views/pages/login.ejs"));
  }
});

homeRouter.get("/signup", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/register.ejs"), {
    okRegister: " ",
  });
});

homeRouter.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/errorRegister" }),
  (req, res) => {
    res.render(path.join(process.cwd(), "/views/pages/register.ejs"), {
      okRegister: "¡Usuario registrado con éxito! Puede iniciar sesión",
    });
  }
);

homeRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/errorLogin" }),
  (req, res) => {
    res.redirect("/");
  }
);

homeRouter.get("/datos", authMw, (req, res) => {
  res.send({ data: req.user });
});

homeRouter.get("/logout", (req, res) => {
  const username = req.user.username;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render("pages/logout.ejs", { username: username });
  });
});

homeRouter.get("/errorLogin", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/errorLogin.ejs"));
});

homeRouter.get("/errorRegister", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/errorRegister.ejs"));
});

export default homeRouter;
