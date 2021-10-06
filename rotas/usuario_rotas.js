const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario_controller')
const jwt = require('jsonwebtoken')

router.get('/', verifyJWT, usuarioController.listar)
router.get('/search',verifyJWT, usuarioController.buscarUsuario)
router.get('/:id', verifyJWT, usuarioController.buscarPorId)
router.post('/', verifyJWT,usuarioController.inserir)
router.post('/login', usuarioController.validaUsuario)
router.put('/:id', verifyJWT,usuarioController.atualizar)
router.delete('/:id', verifyJWT, usuarioController.deletar)

function verifyJWT(req, res, next){
    const token = req.headers['token'];
    if (!token) return res.status(401).json({erro: 'O token não foi provido.' });
    
    jwt.verify(token, 'Sen@crs', function(err, decoded) {
      if (err) return res.status(500).json({erro: 'Falha ao autenticar com o token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }


module.exports = router;