import nodemailer from "nodemailer";
import "dotenv/config";

const mailAdministrador = "franciscofeijoot@gmail.com";

export default async (user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "Tienda Francisco Feijoo <" + process.env.MAIL_USER + ">",
    to: mailAdministrador,
    subject: "Nuevo registro",
    html: `
            <h1>Nuevo usuario registrado</h1>
            <p>Se registro el usuario ${user.nombre}</p>
            <p>Su correo es ${user.username} y su contraseña es ${user.password}(encriptada)</p>
            <p>Tiene ${user.edad} años, y vive en ${user.direccion}</p>
            <p>Su telefono es +${user.telefono}</p>
            <p>Su avatar o foto subida: </p><img src=".\\${user.avatar}"/>
            `,
  });
};
