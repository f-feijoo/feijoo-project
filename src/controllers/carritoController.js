import { CarritoService } from "../services/carritoService.js";
import { ProductoService } from "../services/productoService.js";
import { UsuarioService } from "../services/usuarioService.js";
import { OrdenesService } from "../services/ordenesService.js";
import mailCompraAdmin from "../utils/nodemailer/mailCompra.js";
import mensajeCliente from "../utils/twilio/mensajeCompra.js";
import mensajeCompraAdmin from "../utils/twilio/whatsappCompra.js";
import moment from "moment/moment.js";

const carritoService = new CarritoService();
const productoService = new ProductoService();
const usuarioService = new UsuarioService();
const ordenesService = new OrdenesService();

export const mostrarCarrito = async (req, res) => {
  let chart = await carritoService.mostrarCarrito({ _id: req.params.id });
  let precioTotal = 0;
  for (const prod of chart.productos) {
    precioTotal += prod.precio * prod.cantidad;
  }
  res.render("carrito", {
    data: chart,
    nroC: "/api/carritos/" + req.params.id + "/productos",
    idCarrito: req.params.id,
    user: await usuarioService.mostrarUsuario({ username: req.user.username }),
    precioTotal: precioTotal,
  });
};

export const agregarProducto = async (req, res) => {
  const carrito = await carritoService.mostrarCarrito({ _id: req.params.id });
  const producto = await productoService.mostrarProducto({ _id: req.body.id });
  const indexProducto = carrito.productos.findIndex(
    (elem) => elem.id === producto.id
  );
  if (indexProducto >= 0) {
    carrito.productos[indexProducto].cantidad += 1;
    await carritoService.actualizarCarrito(carrito);
  } else {
    const productoNuevo = { ...producto, cantidad: 1 };
    await carritoService.agregarProducto(carrito, productoNuevo);
  }
  res.send({ message: `Producto agregado` });
};

export const finalizarCarrito = async (req, res) => {
  const carrito = await carritoService.mostrarCarrito({ _id: req.params.id });
  await carritoService.eliminarCarrito(req.params.id);
  const ordenesNumero = await ordenesService.mostrarOrden()
  const orden = {
    productos: carrito.productos,
    numero: ordenesNumero.length,
    timestamp: moment().format("DD/MM/YYYY HH:mm:ss"),
    usuario: req.user.username,
    estado: "generada",
  };
  await ordenesService.crearOrden(orden);
  await mailCompraAdmin(req.user, orden);
  await mensajeCliente(req.user);
  await mensajeCompraAdmin(orden);
  let precioTotal = 0;
  for (const prod of carrito.productos) {
    precioTotal += prod.precio * prod.cantidad;
  }
  res.render("comprado", {
    data: orden,
    nroC: "/api/carritos/" + req.params.id + "/productos",
    idCarrito: req.params.id,
    user: req.user,
    precioTotal : precioTotal
  });
};

export const crearCarrito = async (req, res) => {
  let usuario = await usuarioService.mostrarUsuario({
    username: req.user.username,
  });

  const carrito = await carritoService.mostrarCarrito({ usuario: usuario.username });

  if(!carrito){
    let obj = {
      timestamp: Date.now(),
      productos: [],
      usuario: usuario.username,
      direccion: usuario.direccion,
    };
    await carritoService.crearCarrito(obj);
  }

  res.json({ message: "Ya puede agregar productos al carrito." });
};

export const eliminarCarrito = async (req, res) => {
  let id = req.params.id;
  await carritoService.eliminarCarrito(id);
  res.json({ message: "Carrito eliminado" });
};

export const eliminarProducto = async (req, res) => {
  const carrito = await carritoService.mostrarCarrito({ _id: req.params.id });
  const index = carrito.productos.findIndex((p) => p.id == req.params.id_prod);
  if (index != -1) {
    await carritoService.eliminarProducto(carrito, index);
  }
  res.send({ message: `Producto eliminado.` });
};
