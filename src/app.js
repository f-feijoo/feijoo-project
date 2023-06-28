import("./utils/passport/local.js");
import compression from "compression";
import MongoStore from "connect-mongo";
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import productosRouter from "./routes/productos.js";
import carritoRouter from "./routes/carrito.js";
import index from "./routes/index.js";
import login from "./routes/login.js";
import registro from "./routes/registro.js";
import logout from "./routes/logout.js";
import errors from "./routes/error.js";
import micuenta from "./routes/cuenta.js";

import session from "express-session";
import passport from "passport";

const app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(compression());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOPASS,
      mongoOptions: advancedOptions,
    }),
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Number.parseInt(process.env.SESSION_TIME),
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/productos", productosRouter);
app.use("/api/carritos", carritoRouter);
app.use("/", index);
app.use("/login", login);
app.use("/logout", logout);
app.use("/registro", registro);
app.use("/micuenta", micuenta);
app.use("/", errors);

export default app;
