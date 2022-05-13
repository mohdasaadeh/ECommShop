const { validationResult } = require("express-validator");

module.exports = {
  errorsHandler(templateFunc, dataFunc) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        let product = {};
        if (dataFunc) {
          product = await dataFunc(req);
        }
        return res.send(templateFunc({ errors, product }));
      }

      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userID) {
      return res.redirect("/signin");
    }

    next();
  },
};
