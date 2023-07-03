import nodemailer from "nodemailer";
import "dotenv/config";

const mailAdministrador = "franciscofeijoot@gmail.com";

export default async (user, carrito) => {
    let html = carrito.productos
    .map((x) => {
      return `
        <tr>
        <th scope="row">${x.nombre}</th>
        <td>${x.desc}</td>
        <td>$${x.precio}</td>
        <td>x${x.cantidad}</td>
        <td><img src=${x.img} width="20"
            height="20" alt="..."></td>
        </tr>
        `;
    })
    .join(" ");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "Tienda Francisco Feijoo",
    to: user.username,
    subject: 'Tienda Francisco Feijoo',
    html: `<h1>Nuevo pedido de ${user.nombre}</h1>
            ` + html
  });
};
