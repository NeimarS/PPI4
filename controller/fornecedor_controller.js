const Fornecedor = require("../model/fornecedor")
const { json } = require("express");

exports.listar = (req, res) => {
  Fornecedor.find({}, (err, fornecedores) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(fornecedores);
  })
}

exports.buscarPorId = (req, res) => {
  const id = req.params.id;
  Fornecedor.findById(id, (err, fornecedor) => {
    if (err) {
      res.status(500).send(err);
    }
    if (fornecedor) {
      res.json(fornecedor);
    }
    else {
      res.status(404).json({ erro: "Fornecedor nao encontrado" });
    }
  })
}

exports.inserir = (req, res) => {

  if (req.body && req.body.nome) {
    const paramNome = req.body.nome;
    Fornecedor.findOne({ nome: paramNome }, (err, fornecedor) => {
      if (err) {
        res.status(500).send(err);
      }
      if (fornecedor) {
        res.json({ erro: "Fornecedor já cadastrado!" });
      }
      else {
        let novoFornecedor = new Fornecedor(req.body);
        novoFornecedor.save((err, fornecedor) => {
          if (err) {
            res.send(err);
          }
          res.status(201).json(novoFornecedor);
        })

      }
    })
  }
  else {
    res.status(400).send({ erro: "Faltou o parametro nome" });
  }
}

exports.atualizar = (req, res) => {

  if (req.body && req.body.nome) {
    const paramNome = req.body.nome;
    //qty: { $ne: 20 }
    Fornecedor.findOne({ nome: paramNome }, (err, fornecedor) => {
      if (err) {
        res.status(500).send(err);
      }
      if (fornecedor) {
        res.json({ erro: "Fornecedor já cadastrado!" });
      }
      else {

        const id = req.params.id;
        const fornecedorAtualizar = req.body;

        Fornecedor.findByIdAndUpdate(id, fornecedorAtualizar, { new: true },
          (err, fornecedorAtualizado) => {
            if (err) {
              res.status(500).send(err);
            }
            if (fornecedorAtualizado) {
              res.json(fornecedorAtualizado);
            }
            else {
              res.status(404).json({ erro: "Fornecedor nao encontrado" });
            }
          })


      }//fim else
    })
  }
  else {
    res.status(400).send({ erro: "Faltou o parametro nome" });
  }
}

exports.deletar = (req, res) => {
  const id = req.params.id;
  Fornecedor.findByIdAndDelete(id, (err, fornecedorDeletado) => {
    if (err) {
      res.status(500).send(err);
    }
    if (fornecedorDeletado) {
      res.json(fornecedorDeletado);
    }
    else {
      res.status(404).json({ erro: "Fornecedor nao encontrado" });
    }
  });
}

exports.procurar = (req, res) => {
  if (req.query && req.query.nome) {
    const paramNome = req.query.nome;
    Fornecedor.find({ nome: paramNome }, (err, fornecedores) => {
      if (err) {
        res.status(500).send(err);
      }
      if (fornecedores && fornecedores.length > 0) {
        res.json(fornecedores);
      }
      else {
        res.status(404).json({ erro: "Fornecedor nao encontrado" });
      }
    })
  }
  else {
    res.status(400).send({ erro: "Faltou o parametro nome" });
  }
}