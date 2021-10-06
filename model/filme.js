const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// OU const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const FilmeSchema = new Schema({
    nome: String,
    preco: Number
}, 
{
    versionKey: false    
});

module.exports = mongoose.model("Filme", FilmeSchema);