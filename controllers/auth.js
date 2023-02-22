const { response } = require('express');
const Usuario = require('..//models/Usuario');
const bcrytp = require('bcryptjs')
const {generarJWT}=require('../helpers/jwt')



const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    
    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false, 
                msg:'El correo ya esta registrado'
            })
        }
        usuario = new Usuario(req.body);
        
        
        //encriptar contraseña
        const salt = bcrytp.genSaltSync();
        usuario.password = bcrytp.hashSync(password, salt)
        
        await usuario.save();
        //generar token
        const token = await generarJWT(usuario.id, usuario.name);
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
            error:error.message
        })
    }
};

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

  try {
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
      };
  } catch (error) {
      res.status(500).json({
          ok: false,
          msg: 'Por favor hable con el administrador',
          error: error.message
      });
    };
    
    //confirmar los password

    const validPassword = bcrytp.compareSync(password, usuario.password);

    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Password incorrecto'
        });
    };

    //generar nuestro jwt
    const token = await  generarJWT(usuario.id, usuario.name);

    res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name, 
        token
    });
    
};

const revalidarToken = async (req, res = response) => {
    const { uid, name } = req;

    //generar un nuevo JWT y retornanrlo en esta peticion
    const token = await  generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};