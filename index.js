const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const AdminProductsRouter = require("./routes/admin/products");
const userProductsRouter = require("./routes/shopping/products");
const userCartsRouter = require("./routes/shopping/carts");
const path = require("path");

//*************** */
//Middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["asdfghjkl"] }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(authRouter);
app.use(AdminProductsRouter);
app.use(userProductsRouter);
app.use(userCartsRouter);

//*************** */
//Port Listening
app.listen(3000, () => {
  console.log("Listening to port 3000...");
});
