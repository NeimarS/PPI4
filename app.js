const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

//Importar as rotas
const rotaFilme = require('./rotas/filme_rotas');
const rotaUsuario = require('./rotas/usuario_rotas');
const rotaFornecedor = require('./rotas/fornecedor_rotas');


//teste 2

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Configuração do Mongoose
mongoose.connect('mongodb://localhost:27017/app_produtos')
  .then(() => { 
    console.log('BD conectado')
  }).catch((error) => {
    console.log('Erro ao conectar ao BD')
  });

  /*
app.use((req, res, next) => {
  console.log(`Request Time: ${Date.now()}`);
  console.log(`Request Method: ${req.method}`);
  next();
})
*/

//Uso das rotas
app.use('/api/filmes', rotaFilme);
app.use('/api/usuarios', rotaUsuario);
app.use('/api/fornecedores', rotaFornecedor);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})