const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// OU const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const FornecedorSchema = new Schema({
    nome: String,
    endereco: String,
    telefone: String
}, 
{
    versionKey: false    
});

module.exports = mongoose.model("Fornecedor", FornecedorSchema);