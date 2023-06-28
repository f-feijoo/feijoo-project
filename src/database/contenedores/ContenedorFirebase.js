import admin from "firebase-admin";
import config from "../../config.js";
import log4js from "../../utils/loggers/config.js";

const loggerFiles = log4js.getLogger("errorLogs");
const loggerConsole = log4js.getLogger();

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

loggerConsole.info("Firebase conectado");

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async mostrar(id) {
    try {
      const documento = this.coleccion.doc(id).get();
      if (!documento.exists) {
        throw new Error("Error al listar por id: no encontrado");
      } else {
        const data = documento.data();
        return { ...data, id };
      }
    } catch (error) {
      loggerFiles.error(error);
    }
  }

  async mostrarTodos() {
    try {
      const snapshot = await this.coleccion.get();
      const resp = [];
      snapshot.forEach((doc) => {
        resp.push({ id: doc.id, ...doc.data() });
      });
      return resp;
    } catch (error) {
      loggerFiles.error(error);
    }
  }

  async guardar(obj) {
    try {
      let doc = this.coleccion.doc(`${Math.random()}`);
      await doc.create(obj);
      return { ...obj, id: doc.id };
    } catch (error) {
      loggerFiles.error(error);
    }
  }

  async actualizar(elem) {
    try {
      const actualizado = await this.coleccion.doc(elem.id).update(elem);
      return actualizado;
    } catch (error) {
      loggerFiles.error(error);
    }
  }

  async borrar(id) {
    try {
      const borrado = await this.coleccion.doc(id).delete();
      return borrado;
    } catch (error) {
      loggerFiles.error(error);
    }
  }

  async borrarTodo() {
    try {
      const docs = await this.mostrarTodos();
      const ids = docs.map((d) => d.id);
      const promesas = ids.map((id) => this.borrar(id));
      const resultados = await Promise.allSettled(promesas);
    } catch (error) {
      loggerFiles.error(error);
    }
  }
}

export default ContenedorFirebase;
