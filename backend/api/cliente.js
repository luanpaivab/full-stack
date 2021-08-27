const bcrypt = require("bcrypt-nodejs");
module.exports = (app) => {
  
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const create_macapa = async (req, res) => {
    try {
      
      const dados = { ...req.body };
      
      password = encryptPassword(dados.password)
        // delete user.confirmPassword
    

      const inserir = await app.db_my("cliente").insert({...dados, password: password});

      res.json({dados: inserir});
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const create_varejao = async (req, res) => {
    try {
    const dados = { ...req.body };
    
    password = encryptPassword(dados.password)
    
      const inserir = await app.db_pg("cliente").insert({...dados, password: password});

      res.send('Cliente cadastrado!');
    } catch (error) {
      res.status(500).send(error);
    }
  };

  return { create_macapa, create_varejao };
};
