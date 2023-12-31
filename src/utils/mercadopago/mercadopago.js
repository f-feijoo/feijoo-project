import { ProductoService } from "../../services/productoService.js";
import mercadopago from "mercadopago";

const productoService = new ProductoService();

export const configuracionMercadoPago = (carrito) => {
  const productosMP = carrito.productos.map((elem) => {
    return {
      title: elem.nombre,
      unit_price: elem.precio,
      quantity: elem.cantidad,
    };
  });
  // Agrega credenciales
  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
  });

  // Crea un objeto de preferencia
  let preference = {
    items: productosMP,
    back_urls: {
      success: "https://feijoo-project.onrender.com/api/carritos/" + carrito.id + "/productos/finalizar",
      failure: "https://feijoo-project.onrender.com/api/carritos/"+ carrito.id + "/productos/",
      pending: "https://feijoo-project.onrender.com/",
    },
    auto_return: "approved",
  };

  let id = mercadopago.preferences
    .create(preference)
    .then(function (response) {
      return response.body.id;
    })
    .catch(function (error) {
      console.log(error);
    });
    return id
};
