const express = require('express');
const router = express.Router();
const filmeController = require('../controller/filme_controller')
const jwt = require('jsonwebtoken')

router.get('/', verifyJWT, filmeController.listar)
router.get('/search', verifyJWT, filmeController.procurar)
router.get('/:id', verifyJWT, filmeController.buscarPorId)
router.post('/', verifyJWT, filmeController.inserir)
router.put('/:id', verifyJWT, filmeController.atualizar)
router.delete('/:id', verifyJWT, filmeController.deletar)


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