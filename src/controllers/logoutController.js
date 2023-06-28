import { CarritoService } from "../services/carritoService.js";
const carritoService = new CarritoService();

export const logout = async (req, res) => {
  const user = req.user.username;
  let chart = await carritoService.mostrarCarrito({ usuario: user });
  if (user) {
    if (chart){
    await carritoService.eliminarCarrito(chart.id);}
    req.session.destroy((err) => {
      if (!err) {
        res.render("logout", { user: user });
      } else res.send({ status: "Logout ERROR", body: err });
    });
  } else {
    res.redirect("/");
  }
};
