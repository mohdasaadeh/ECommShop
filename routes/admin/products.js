const express = require("express");
const multer = require("multer");

const ProductsRepository = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const adminProductsListTemplate = require("../../views/admin/products/index");
const productsEditTemplate = require("../../views/admin/products/edit");
const { errorsHandler, requireAuth } = require("../middlewares");
const { requireTitle, requirePrice } = require("../validators");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Products List

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await ProductsRepository.getAll();
  res.send(adminProductsListTemplate({ products }));
});

// New Product

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  errorsHandler(productsNewTemplate),
  async (req, res) => {
    const { title, price } = req.body;
    let image;
    if (req.file) {
      image = req.file.buffer.toString("base64");
    } else {
      image = "";
    }

    const product = await ProductsRepository.create({ title, price, image });

    res.redirect("/admin/products");
  }
);

// Edit Product

router.get("/admin/products/:id/edit", async (req, res) => {
  const product = await ProductsRepository.getOne({ id: req.params.id });

  if (!product) {
    return res.send("Product not found");
  }

  res.send(productsEditTemplate({ product }));
});

router.post(
  "/admin/products/:id/edit",
  requireAuth,
  upload.single("image"),
  [requireTitle, requirePrice],
  errorsHandler(productsEditTemplate, async (req) => {
    return await ProductsRepository.getOne({ id: req.params.id });
  }),
  async (req, res) => {
    const id = req.params.id;
    const { title, price } = req.body;
    let image;
    if (req.file) {
      image = req.file.buffer.toString("base64");
    } else {
      image = "";
    }

    try {
      await ProductsRepository.update(id, { title, price, image });
    } catch (err) {
      return res.send("Could not find item");
    }

    res.redirect("/admin/products");
  }
);

// Delete Product

router.post("/admin/products/:id/delete", requireAuth, async (req, res) => {
  await ProductsRepository.delete(req.params.id);

  res.redirect("/admin/products");
});

module.exports = router;
