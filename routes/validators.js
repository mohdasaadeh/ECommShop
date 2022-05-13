const { check } = require("express-validator");
const UsersRepository = require("../repositories/users");

module.exports = {
  requireTitle: check("title")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid Title"),
  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Invalid Price"),
  requireEmail: check("email")
    .trim()
    .isEmail()
    .withMessage("The Email is Invalid")
    .custom(async (email) => {
      const foundRecord = await UsersRepository.getOne({ email });
      if (foundRecord) {
        throw new Error("The Email is in use");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),
  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Password Mismatch!");
      } else {
        return true;
      }
    }),
  requireExistEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await UsersRepository.getOne({ email });
      if (!user) {
        throw new Error("Email not found!");
      }
    }),
  requireCorrectUserPassword: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await UsersRepository.getOne({ email: req.body.email });

      if (!user) {
        throw new Error("Invalid Password");
      }

      const correctPassword = await UsersRepository.comparePassword(
        user.password,
        password
      );
      if (!correctPassword) {
        throw new Error("Incorrect password");
      }
    }),
};
