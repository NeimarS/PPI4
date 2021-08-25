const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
  res.send('requisição GET')
})

app.post('/', function (req, res) {
  res.send('requisição POST')
})

app.put('/user', function (req, res) {
  res.send('requisição PUT em /user')
})

app.delete('/user', function (req, res) {
  res.send('requisição DELETE em /user')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})