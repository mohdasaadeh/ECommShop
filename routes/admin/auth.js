const express = require("express");
const router = express.Router();

const UsersRepository = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const signoutTemplate = require("../../views/admin/auth/signout");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireExistEmail,
  requireCorrectUserPassword,
} = require("../validators");
const { getOne } = require("../../repositories/users");
const { errorsHandler } = require("../middlewares");

//signup
router.get("/signup", (req, res) => {
  res.send(signupTemplate({}));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  errorsHandler(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;

    const attrs = await UsersRepository.create({ email, password });
    req.session.userID = attrs.id;

    res.redirect("/signin");
  }
);

//signout
router.get("/signout", (req, res) => {
  if (req.session.userID) {
    res.send(signoutTemplate({ req }));
  } else {
    res.redirect("/signin");
  }
});

router.post("/signout", (req, res) => {
  req.session = null;
  res.redirect("/signin");
});

//signin
router.get("/signin", (req, res) => {
  if (!req.session.userID) {
    res.send(signinTemplate({}));
  } else {
    res.redirect("/admin/products");
  }
});

router.post(
  "/signin",
  [requireExistEmail, requireCorrectUserPassword],
  errorsHandler(signinTemplate),
  async (req, res) => {
    const { email } = req.body;
    const foundRecord = await UsersRepository.getOne({ email });

    req.session.userID = foundRecord.id;

    res.redirect("/admin/products");
  }
);

module.exports = router;
