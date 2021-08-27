const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const dotenv = require("dotenv");

dotenv.config();
// console.log('TEXTO DE TESTE - ENV: ', process.env.NODE_ENV)

module.exports = (app) => {
  const signin_macapa = async (req, res) => {
    if (!req.body.nome || !req.body.password) {
      return res.status(400).send("Informe usuário e senha!");
    }

    const cliente = await app.db_my("cliente").where({ nome: req.body.nome }).first();

    if (!cliente) return res.status(400).send("Usuário não encontrado!");

    const isMatch = bcrypt.compareSync(req.body.password, cliente.password);
    // const isMatch = true
    if (!isMatch) return res.status(401).send("Senha inválida!");

    const now = Math.floor(Date.now() / 1000);
    const oitoHrs = 60 * 60 * 8;

    const payload = {
      id: cliente.id,
      nome: cliente.nome,
      iat: now,
      exp: now + oitoHrs, //8 horas logado
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret),
    });
  };

  const signin_varejao = async (req, res) => {
    if (!req.body.nome || !req.body.password) {
      return res.status(400).send("Informe usuário e senha!");
    }

    const cliente = await app.db_pg("cliente").where({ nome: req.body.nome }).first();

    if (!cliente) return res.status(400).send("Usuário não encontrado!");

    const isMatch = bcrypt.compareSync(req.body.password, cliente.password);
    // const isMatch = true
    if (!isMatch) return res.status(401).send("Senha inválida!");

    const now = Math.floor(Date.now() / 1000);
    const oitoHrs = 60 * 60 * 8;

    const payload = {
      id: cliente.id,
      nome: cliente.nome,
      iat: now,
      exp: now + oitoHrs, //8 horas logado
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret),
    });
  };

  const validateToken = async (req, res) => {
    const userData = req.body || null;
    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (e) {
      // problema com o token
    }

    res.send(false);
  };

  return { signin_macapa, signin_varejao, validateToken };
};
