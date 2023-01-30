import { Router } from "express";

import path, { dirname, extname, join } from "path";
import bcrypt from "bcrypt";
import multer from "multer";
import passport from "passport";
import { Strategy } from "passport-local";
import { fileURLToPath } from "url";

import { Users } from "../config/configMongoDb.js";
import { transporter } from "../config/configNodemailer.js";

import * as dotenv from "dotenv";
dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;
const email_admin = process.env.EMAIL_ADMIN;

const homeRouter = new Router();

//MULTER ----------------------------
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ["image/jpg", "image/png"];

const storage = multer.diskStorage({
  destination: join(CURRENT_DIR, "../public/images"),
  filename: (req, file, cb) => {
    const fileExtension = extname(file.originalname);
    const fileName = file.originalname.split(fileExtension)[0];
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Solo permitidos los archivos ${MIMETYPES.join(" ")}`));
  },
  limits: {
    fieldSize: 10000000,
  },
});

const upload = multer({ storage });

// ESTRATEGIAS -------------
passport.use(
  "signup",
  new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
    const { name } = req.body;
    const { address } = req.body;
    const { age } = req.body;
    const { code } = req.body;
    const { number } = req.body;
    const { filename } = req.file;
    const phone = `${code}${number}`;
    const imgUrl = `${host}:${port}/images/${filename}`;
    Users.findOne({ username }, (err, user) => {
      if (user) return done(null, false);
      Users.create(
        {
          username,
          password: hasPassword(password),
          name,
          address,
          age,
          phone,
          imgUrl,
        },
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

//RUTAS ------------------------------

// Mostrar home
homeRouter.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const name = req.user.name;
    res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
      name: name,
    });
  } else {
    res.redirect("/login");
  }
});

// Mostrar formulario login
homeRouter.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "/views/pages/login.ejs"));
  }
});

// Mostrar formulario registro
homeRouter.get("/signup", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/register.ejs"), {
    okRegister: " ",
  });
});

// Registar Usuario
homeRouter.post(
  "/signup",
  upload.single("myFile"),
  passport.authenticate("signup", { failureRedirect: "/errorRegister" }),
  async (req, res, next) => {
    res.render(path.join(process.cwd(), "/views/pages/register.ejs"), {
      okRegister: "¡Usuario registrado con éxito! Puede iniciar sesión",
    });
    // Envío Email
    const name = req.user.name;
    const direccion = req.user.address;
    const edad = req.user.age;
    const email = req.user.username;
    const telefono = req.user.phone;
    try {
      await transporter.sendMail({
        from: "colleen.kozey@ethereal.email",
        to: email_admin,
        subject: "Nuevo Registro",
        html: `<h4>Datos del Usuario</h4>
      <ul>
        <li>Nombre: ${name}</li>
        <li>Dirección: ${direccion}</li>
        <li>Edad: ${edad}</li>
        <li>Email: ${email}</li>
        <li>Telefono: ${telefono}</li>
                                                  </ul>`,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// Loguear Usuario
homeRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/errorLogin" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Traer Info del Usuario
homeRouter.get("/datos", authMw, (req, res) => {
  res.send({ data: req.user });
});

// Mostrar Carrito de Usuario Logueado
homeRouter.get("/carrito", authMw, (req, res) => {
  const name = req.user.name;
  res.render("pages/carrito.ejs", { name: name });
});

// Mostrar Datos de Usuario Logueado
homeRouter.get("/cuenta", (req, res) => {
  const name = req.user.name;
  const imagen = req.user.imgUrl;
  const direccion = req.user.address;
  const edad = req.user.age;
  const email = req.user.username;
  const telefono = req.user.phone;

  res.render("pages/cuenta.ejs", {
    name,
    imagen,
    nombre: name,
    direccion,
    edad,
    email,
    telefono,
  });
});

// Traer Usuario Logueado
homeRouter.get("/idUsuario", (req, res) => {
  const idUsuario = req.user._id;
  res.send(idUsuario);
});

// Vista Logout Usuario
homeRouter.get("/logout", (req, res) => {
  const name = req.user.name;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render("pages/logout.ejs", { name: name });
  });
});

// Vista Error Login
homeRouter.get("/errorLogin", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/errorLogin.ejs"));
});

// Vista Error Registro
homeRouter.get("/errorRegister", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/errorRegister.ejs"));
});

export default homeRouter;
