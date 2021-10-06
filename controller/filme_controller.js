const Filme = require("../model/filme")

exports.listar = (req, res) => {
  Filme.find({}, (err, filmes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(filmes);
  })
}

exports.buscarPorId = (req, res) => {
  const id = req.params.id;
  Filme.findById(id, (err, filme) => {
    if (err) {
      res.status(500).send(err);
    }
    if (filme) {
      res.json(filme);
    }
    else {
      res.status(404).json({ erro: "Filme nao encontrado" });
    }
  })
}

exports.inserir = (req, res) => {

  if (req.body && req.body.nome) {
    const paramNome = req.body.nome;
    Filme.findOne({ nome: paramNome }, (err, filme) => {
      if (err) {
        res.status(500).send(err);
      }
      if (filme) {
        res.json({ erro: "Filme já cadastrado!" });
      }
      else {
        let novoFilme = new Filme(req.body);
        novoFilme.save((err, filme) => {
          if (err) {
            res.send(err);
          }
          res.status(201).json(novoFilme);
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
    Filme.findOne({ nome: paramNome }, (err, filme) => {
      if (err) {
        res.status(500).send(err);
      }
      if (filme) {
        res.json({ erro: "Filme já cadastrado!" });
      }
      else {

        const id = req.params.id;
        const filmeAtualizar = req.body;

        Filme.findByIdAndUpdate(id, filmeAtualizar, { new: true },
          (err, filmeAtualizado) => {
            if (err) {
              res.status(500).send(err);
            }
            if (filmeAtualizado) {
              res.json(filmeAtualizado);
            }
            else {
              res.status(404).json({ erro: "Filme nao encontrado" });
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
  Filme.findByIdAndDelete(id, (err, filmeDeletado) => {
    if (err) {
      res.status(500).send(err);
    }
    if (filmeDeletado) {
      res.json(filmeDeletado);
    }
    else {
      res.status(404).json({ erro: "Filme nao encontrado" });
    }
  });
}

exports.procurar = (req, res) => {
  if (req.query && req.query.nome) {
    const paramNome = req.query.nome;
    Filme.find({ nome: paramNome }, (err, filmes) => {
      if (err) {
        res.status(500).send(err);
      }
      if (filmes && filmes.length > 0) {
        res.json(filmes);
      }
      else {
        res.status(404).json({ erro: "Filme nao encontrado" });
      }
    })
  }
  else {
    res.status(400).send({ erro: "Faltou o parametro nome" });
  }
}