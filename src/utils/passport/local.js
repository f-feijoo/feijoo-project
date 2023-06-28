import passport from "passport";
import { Strategy } from "passport-local";
import {UsuarioService} from "../../services/usuarioService.js";
import sendMail from "../nodemailer/mailRegistro.js";
import { CarritoService } from "../../services/carritoService.js";

const usuarioService = new UsuarioService();
const carritoService = new CarritoService();

const LocalStrategy = Strategy;

passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let file = req.file;
      if (!file) {
        return res.status(400).send({ message: "Error al cargar imagen" });
      }
      let user = { username: username };
      const usuarioBD = await usuarioService.mostrarUsuario(user);
      if (usuarioBD) {
        return done(null, false);
      }
      if(password !== req.body.password2){
        return res.status(400).send({ message: "Las contraseñas no coinciden" })
      }
      const usuarioNuevo = await usuarioService.guardarUsuario({
        username: username,
        password: await usuarioService.encriptarContraseña(password),
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono,
        avatar: "uploads/" + file.filename,
      });
      await sendMail(usuarioNuevo);
      done(null, usuarioNuevo);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user = { username: username };
      const usuarioBD = await usuarioService.mostrarUsuario(user);
      if (!usuarioBD) {
        return done(null, false);
      }
      if (!usuarioService.compararContraseña(usuarioBD.password, password)) {
        return done(null, false);
      }
      let obj = {
        timestamp: Date.now(),
        productos: [],
        usuario: usuarioBD.username,
        direccion: usuarioBD.direccion,
      };
      let cheqCarrito = await carritoService.mostrarCarrito(usuarioBD.username)
      if(!cheqCarrito){
      await carritoService.crearCarrito(obj)}
      return done(null, usuarioBD);
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await usuarioService.mostrarUsuario({ _id: id });
  done(null, usuario);
});
