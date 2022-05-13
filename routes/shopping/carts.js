const express = require("express");

const ProductsRepository = require("../../repositories/products");
const CartsRepository = require("../../repositories/carts");
const userCartsListTemplate = require("../../views/shopping/carts/show");

const router = express.Router();

router.post("/cart", async (req, res) => {
  const { productID } = req.body;
  const cartID = req.session.cartID;

  let cart;
  if (cartID) {
    cart = await CartsRepository.getOne({ id: cartID });
  } else {
    cart = await CartsRepository.create({ items: [] });
    req.session.cartID = cart.id;
  }

  const foundCartProduct = cart.items.find((item) => item.id === productID);
  if (foundCartProduct) {
    foundCartProduct.quantity++;
  } else {
    cart.items.push({ id: productID, quantity: 1 });
  }

  await CartsRepository.update(req.session.cartID, { items: cart.items });

  res.redirect("/cart");
});

router.get("/cart", async (req, res) => {
  const cartID = req.session.cartID;
  const cart = await CartsRepository.getOne({ id: cartID });

  if (!cartID || !cart) {
    return res.redirect("/");
  }

  await Promise.all(
    cart.items.map(async (item) => {
      const product = await ProductsRepository.getOne({ id: item.id });
      item.product = product;
      return item;
    })
  );

  res.send(userCartsListTemplate({ items: cart.items }));
});

router.post("/cart/item/delete", async (req, res) => {
  const { itemID } = req.body;
  const cartID = req.session.cartID;
  const cart = await CartsRepository.getOne({ id: cartID });

  const filteredCart = cart.items.filter((item) => {
    return item.id !== itemID;
  });

  console.log(filteredCart);

  await CartsRepository.update(cartID, { items: filteredCart });

  res.redirect("/cart");
});

module.exports = router;
