const express = require("express");

const ProductsRepository = require("../../repositories/products");
const userProductsListTemplate = require("../../views/shopping/products/index");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await ProductsRepository.getAll();
  res.send(userProductsListTemplate({ products }));
});

module.exports = router;
