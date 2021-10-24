import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const User = new mongoose.Schema({
  _id: { 
    type: String,
    default: uuidv4
  },
  token: {
    type: String,
  },
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefones: {
    type: [{}],
    required: true,
  },
  data_criacao: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  ultimo_login: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

export default mongoose.model('User', User);
