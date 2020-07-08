import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://admin:admin@cluster0-c56tb.gcp.mongodb.net/Jequiti", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  });

mongoose.connection.on('connected', function () {
 console.log('=====Conexão estabelecida com sucesso=====');
});
mongoose.connection.on('error', function (err) {
 console.log('=====Ocorreu um erro: ' + err);
});

mongoose.connection.on('disconnected', function () {
 console.log('=====Conexão finalizada=====');
}); 


export const Perguntas = mongoose.model('Pergunta', {
  id: Number,
  pergunta: String,
  resposta1: String,
  resposta2: String,
  resposta3: String,
  resposta4: String,
  respostacerta: Number,
  level: Number
}, 'Perguntas')

export const Usuarios = mongoose.model('usuario', {
    name: String,
    password: String,
    coins: Number,
    powerup1: Number,
    powerup2: Number,
    powerup3: Number
}, 'Users')

export const PowerUps = mongoose.model('PowerUp', {
  id: Number,
  power: String,
  description: String,
  valor: Number
}, 'Powerup')