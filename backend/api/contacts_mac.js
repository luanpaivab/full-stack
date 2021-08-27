module.exports = (app) => {
    
    const getContatoMacapa = async (req, res) => {
      try {
        const contacts = await app
          .db_my("contacts")
          .select();
  
        res.json(contacts);
      } catch (error) {
        res.status(500).send(error);
      }
    };
  
    const getById = async (req, res) => {
      app
      .db_my("contacts")
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

          //Formatar Nome
          const nomeMaiusculo = dados.nome.toUpperCase()

          //Formatar número 5541996941919
          const pais = dados.celular.substring(0, 2)
          const ddd = dados.celular.substring(2, 4)
          const num1 = dados.celular.substring(4, 9)
          const num2 = dados.celular.substring(9, 13)

          const celularFomatado = `+${pais} (${ddd}) ${num1}-${num2}`

          // console.log(`celular: +${pais} (${ddd}) ${num1}-${num2}`)
          
            const inserir = await app
              .db_my("contacts")
              .insert({...dados, nome: nomeMaiusculo, celular: celularFomatado})
              
            res.json(inserir)
        } catch (error) {
          res.status(500).send(error);
        }
      };
  
    return { getContatoMacapa, getById, save };
  };
  