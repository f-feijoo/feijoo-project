import usuariosDao from "../database/daos/usuarios/UsuariosDao.js"

export class UsuarioService {
    constructor() {
      this.usuario = usuariosDao;
    }
    async mostrarUsuario(obj) {
        return await this.usuario.mostrar(obj);
    }

    async guardarUsuario(obj) {
      return await this.usuario.guardar(obj);
  }

  async compararContraseña(encriptada, contraseña) {
    return await this.usuario.comparar(encriptada, contraseña);
  }

  async encriptarContraseña(contraseña) {
    return await this.usuario.encriptar(contraseña)
  }
  }