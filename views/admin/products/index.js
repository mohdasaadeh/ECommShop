const layout = require("../layout");

module.exports = ({ products }) => {
  const productsList = products
    .map((product) => {
      return `
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>
          <img src="data:image/png;base64, ${product.image}"/>
        </td>
        <td>
          <a href="/admin/products/${product.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
          <form method="post" action="/admin/products/${product.id}/delete">
            <button class="button is-danger" href="">Delete</button>
          </form>
        </td>
      </tr>
    `;
    })
    .join("");
  return layout({
    content: `
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="control">
                        <div class="container navbar-container">
                        
                            <h1 class="subtitle">Products</h1>
                            <a href="/admin/products/new" class="button is-primary">New Product</a>
                        </div>
                    </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${productsList}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    `,
  });
};
