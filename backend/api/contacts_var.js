module.exports = (app) => {
    
    const getContatoVarejao = async (req, res) => {
      try {
        const contacts = await app
          .db_pg("contacts")
          .select()
          .first();
  
        res.json(contacts);
      } catch (error) {
        res.status(500).send(error);
      }
    };
  
    const getById = async (req, res) => {
      app
      .db_pg("contacts")
        .select()
        .table("contacts")
        .where({ id: req.params.id })
        .first()
        .then( sim => {
          res.json(sim);
        })
        .catch((err) => res.status(500).send(err));
      };

      const save = async (req, res) => {
        try {
          const dados = { ...req.body };
          
            const inserir = await app
              .db_pg("contacts")
              .insert(dados)
              
            res.json(inserir)
        } catch (error) {
          res.status(500).send(error);
        }
      };
  
    return { getContatoVarejao, getById, save };
  };
  