module.exports = (app) => {
  app.post("/signup-macapa", app.api.cliente.create_macapa);
  app.post("/signup-varejao", app.api.cliente.create_varejao);
  app.post("/signin-macapa", app.api.auth.signin_macapa);
  app.post("/signin-varejao", app.api.auth.signin_varejao);
  app.post("/validateToken", app.api.auth.validateToken);

  app
    .route("/contacts-macapa")
    .all(app.config.passport.authenticate())
    .post(app.api.contacts_mac.save)
    .get(app.api.contacts_mac.getContatoMacapa);

  app
    .route("/contacts-macapa/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.contacts_mac.getById);
  
  app
    .route("/contacts-varejao")
    .all(app.config.passport.authenticate())
    .post(app.api.contacts_var.save)
    .get(app.api.contacts_var.getContatoVarejao);

  app
    .route("/contacts-varejao/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.contacts_var.getById);

};
